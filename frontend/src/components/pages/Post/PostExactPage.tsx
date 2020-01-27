import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Checkbox, Comment, Container, Header, Segment} from "semantic-ui-react";
import postApi from "../../../api/post";
import commentApi from "../../../api/comment";
import CommentContainer from "../../containers/CommentContainer";
import CommentForm, {ICommentFormData} from "../../forms/CommentForm";
import {CommentDTO, PostDTO, UserDTO} from "../../../types";
import PostActionContainer from "../../containers/PostActionContainer";

interface IPostExactPageState {
    post: PostDTO | null;
    comments: CommentDTO[] | null;
    collapsed: boolean;
}

interface IPostExactPageProps {
    location: any;
    history: {
        push: Function
    };
    user: UserDTO;
}

class PostExactPage extends React.Component<IPostExactPageProps, IPostExactPageState> {
    static propTypes = {};

    constructor(props: IPostExactPageProps) {
        super(props);

        this.state = {
            post: null,
            comments: null,
            collapsed: false,
        }
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const postId = String(query.get('postId'));
        const [postResponse, commentResponse] = await Promise.all([postApi.getPost(postId), commentApi.getAllCommentsByPostId(postId)]);
        this.setState({post: postResponse.post, comments: commentResponse.comments});
    }

    submitCreateComment = async (formData: ICommentFormData): Promise<void> => {
        const {post, comments} = this.state;
        const commentResponse = await commentApi.createComment(formData, post.postId);
        comments.unshift(commentResponse.comment);
        this.setState({comments});
    };

    // @ts-ignore
    handleCheckbox = (e, checkbox) => {
        this.setState({collapsed: checkbox.checked});
    };

    onDeleteClick = async () => {
        const {post} = this.state;
        await postApi.deletePost(post.postId);
        this.props.history.push("/post");
    };

    render() {
        const {post, comments, collapsed} = this.state;
        const {user} = this.props;

        return (
            <Container>
                    {post &&
                    <PostActionContainer delete={this.onDeleteClick} post={post} user={user}/>
                    }
                    <Segment>
                        <CommentForm submit={this.submitCreateComment}/>
                    </Segment>
                    <Container>
                        <Header as='h3' dividing>
                            Comments
                        </ Header>

                        <Checkbox
                            defaultIndeterminate={false}
                            label='Collapse comments'
                            onChange={this.handleCheckbox}
                        />

                        <Comment.Group collapsed={collapsed}>
                            {comments && comments.map(comment => <CommentContainer key={`comment: ${comment.commentId}`}
                                                                                   user={user} comment={comment} displayFull={true}/>)}
                        </Comment.Group>
                    </Container>
            </Container>
        )
    }
}

PostExactPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(PostExactPage);

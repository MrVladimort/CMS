import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Container, Segment} from "semantic-ui-react";
import postApi from "../../../api/post";
import commentApi from "../../../api/comment";
import CommentContainer from "../../containers/CommentContainer";
import CommentAddForm, {ICommentAddFormData} from "../../forms/Comment/CommentAddForm";
import CommetEditForm from "../../forms/Comment/CommetEditForm";
import {CommentDTO, PostDTO, UserDTO} from "../../../types";
import PostActionContainer from "../../containers/PostActionContainer";

interface IPostExactPageState {
    post: PostDTO | null;
    comments: CommentDTO[] | null;
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
        }
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const postId = String(query.get('postId'));

        const [postResponse, commentResponse] = await Promise.all([postApi.getPost(postId), commentApi.getAllCommentsByPostId(postId)]);
        this.setState({post: postResponse.post, comments: commentResponse.comments});
    }

    submitCreateComment = async (formData: ICommentAddFormData): Promise<void> => {
        const {post, comments} = this.state;
        const commentResponse = await commentApi.createComment(formData, post.postId);
        comments.unshift(commentResponse.comment);
        this.setState({comments});
    };

    onDeleteClick = async () => {
        const {post} = this.state;
        await postApi.deletePost(post.postId);
        this.props.history.push("/post");
    };

    render() {
        const {post, comments} = this.state;
        const {user} = this.props;

        return (
            <Container>
                <Segment raised>
                    {post && <Segment>
                        <PostActionContainer delete={this.onDeleteClick} post={post} user={user}/>
                    </Segment>}
                    <Segment>
                        <CommentAddForm submit={this.submitCreateComment}/>
                        {comments && comments.map(comment => <CommentContainer key={`comment: ${comment.commentId}`}
                                                                               user={user} comment={comment}/>)}
                    </Segment>
                </Segment>
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

import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import postApi from "../../api/post";
import commentApi from "../..//api/comment";
import {Grid, Comment} from "semantic-ui-react";
import CommentContainer from "../containers/CommentContainer";
import PostContainer from "../containers/PostContainer";
import {PostDTO, CommentDTO} from "../../types";

interface IHomePageState {
    posts: PostDTO[],
    comments: any[]
}

interface IHomePageProps {
    user: any;
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    static propTypes = {};

    constructor(props: IHomePageProps) {
        super(props);

        this.state = {
            posts: [],
            comments: []
        }
    }

    async componentDidMount(): Promise<void> {
        const posts = await postApi.getAllPosts();
        const comments = posts.reduce((accumulator: CommentDTO[], currentPost: PostDTO) => accumulator.concat(...currentPost.comments), []);
        this.setState({posts, comments});
    }

    render() {
        const {posts, comments} = this.state;

        return (
            <Grid columns={2} celled="internally">
                <Grid.Column width={12}>
                    {posts.length > 0
                    && posts.map(post => <PostContainer post={post} key={`post: ${post.postId}`}/>)}
                </Grid.Column>

                <Grid.Column width={4}>
                    {comments.length > 0
                    && comments.map(comment => <Comment.Group size='large' key={`comment: ${comment.commentId}`}><CommentContainer comment={comment}/></Comment.Group>)}
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(HomePage);

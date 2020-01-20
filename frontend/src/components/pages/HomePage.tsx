import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import postApi from "../../api/post";
import commentApi from "../..//api/comment";
import {Grid, Comment, Segment, List, Image} from "semantic-ui-react";
import CommentContainer from "../containers/CommentContainer";
import PostContainer from "../containers/PostContainer";
import {PostDTO, CommentDTO, UserDTO} from "../../types";
import steamApi from "../../api/steam";

interface IHomePageState {
    posts: PostDTO[] | null,
    comments: CommentDTO[] | null,
    categories: any[],
}

interface IHomePageProps {
    user: UserDTO | null;
}

class HomePage extends Component<IHomePageProps, IHomePageState> {
    static propTypes = {};

    constructor(props: IHomePageProps) {
        super(props);

        this.state = {
            posts: null,
            comments: null,
            categories: null
        }
    }

    async componentDidMount(): Promise<void> {
        const [postsResponse, commentsResponse, categoriesResponse] = await Promise.all([postApi.getAllPosts(), commentApi.getAllComments(), steamApi.getGamesCategories()]);
        this.setState({posts: postsResponse.posts, comments: commentsResponse.comments, categories: categoriesResponse});
    }

    render() {
        const {posts, comments, categories} = this.state;
        const {user} = this.props;

        return (
            <Grid columns={3} celled="internally">
                <Grid.Column width={2}>
                    <List selection animated verticalAlign='middle' size='huge'>
                        <List.Item active>
                            <List.Content>
                                <List.Header content={"Popular"}/>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header content={"New"}/>
                            </List.Content>
                        </List.Item>
                    </List>

                    <List selection animated verticalAlign='middle'>
                        {categories && categories.map(category =>
                            <List.Item>
                                <Image avatar src={category.image.src}/>
                                <List.Content>
                                    <List.Header content={category.value}/>
                                </List.Content>
                            </List.Item>)}
                    </List>
                </Grid.Column>

                <Grid.Column width={10}>
                    {posts && posts.map(post =>
                        <Segment raised className='postSegment'>
                            <PostContainer displaySetting={{isDisplayFull: false, maxCharacters: 2000}} post={post} key={`post: ${post.postId}`}/>
                        </Segment>)}
                </Grid.Column>

                <Grid.Column width={4}>
                    {comments && comments.map(comment =>
                        <Comment.Group size='large'>
                            <CommentContainer key={`comment: ${comment.commentId}`} user={user} comment={comment} displayFull={false}/>
                        </Comment.Group>)
                    }
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(HomePage);

import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import postApi from "../../../api/post";
import {PostDTO} from "../../../types";
import {Button, Container, Segment} from "semantic-ui-react";
import PostContainer from "../../containers/PostContainer";

interface IEventPageState {
    posts: PostDTO[] | null
}

interface IEventPageProps {
    user: any;
}

class PostPage extends React.Component<IEventPageProps, IEventPageState> {
    static propTypes = {};

    constructor(props: IEventPageProps) {
        super(props);

        this.state = {
            posts: null
        }
    }

    async componentDidMount(): Promise<void> {
        const postsResponse = await postApi.getAllPosts();
        this.setState({posts: postsResponse.posts});
    }

    render() {
        const {posts} = this.state;

        return (
            <Container text>
                <Segment>
                    <Link to={`/post/add`}>
                        <Button fluid color={"green"}>Add post</Button>
                    </Link>
                    {posts && posts.map(post =>
                        <Segment raised>
                            <PostContainer post={post} key={`post:${post.postId}`}/>
                        </Segment>)}
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(PostPage);

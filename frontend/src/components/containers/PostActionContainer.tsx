import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Button, Container, Grid, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import PostContainer from "./PostContainer";
import postApi from "../../api/post";
import {PostDTO, UserDTO} from "../../types";

interface IPostProps {
    post: PostDTO,
    user: UserDTO | null,
}

class PostActionContainer extends Component<IPostProps> {
    static propTypes: any;

    render() {
        const {post, user} = this.props;

        return (
            <Segment raised>
                <Button.Group>
                    {user && user.userType === 2 && <Link to={`/event/delete?postId=${post.postId}`}>
                        <Button>Delete</Button>
                    </Link>}
                    {user && user.userType === 2 && <Link to={`/event/edit?postId=${post.postId}`}>
                        <Button>Edit</Button>
                    </Link>}
                </Button.Group>

                <PostContainer post={post}/>
            </Segment>
        )
    }
}


PostActionContainer.propTypes = {
    post: PropTypes.object.isRequired
};

export default PostActionContainer;

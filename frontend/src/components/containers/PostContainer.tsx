import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Button, Container, Grid, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {PostDTO} from "../../types";

interface IPostProps {
    post: PostDTO,
}

class PostContainer extends Component<IPostProps> {
    static propTypes: any;

    render() {
        const {post} = this.props;

        return (
            <Segment raised>
                <Grid>
                    <Grid.Column>
                        <Segment>
                            <Link to={`/post/exact?postId=${post.postId}`}>
                                <Header as={"h1"}>{post.title}</Header>
                            </Link>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}


PostContainer.propTypes = {
    post: PropTypes.object.isRequired
};


export default PostContainer;

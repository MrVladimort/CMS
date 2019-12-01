import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Button, Container, Grid, Header, Segment, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import moment from "moment";
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
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Link to={`/post/exact?postId=${post.postId}`}>
                                <Header as={"h1"}>{post.title}</Header>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Image src={post.imageLink} size='large' rounded/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Container>
                                <p>{post.text}</p>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <p>Create at: {moment(post.createAt).format("MMMM Mo")}</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}


PostContainer.propTypes = {
    post: PropTypes.object.isRequired
};


export default PostContainer;

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Button, Container, Grid, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

interface IPostProps {
    post: any,
    user: any,
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
                            <div>
                                <Segment vertical>
                                    <Header as={"h1"}>Name: {post.name}</Header>
                                </Segment>
                            </div>
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

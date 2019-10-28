import React, {Component} from 'react';
import PropTypes from 'prop-types';
import postApi from "../../../api/post";
import {Container, Header} from "semantic-ui-react";
import PostAddForm, {IPostAddFormData} from "../../forms/Post/PostAddForm";

interface IPostAddPageProps {
    history: {
        push: Function
    };
}

class PostAddPage extends Component<IPostAddPageProps> {
    static propTypes = {};

    submitAddPage = async (postData: IPostAddFormData) => postApi.createPost(postData).then((postResponse) => this.props.history.push(`/event/${postResponse.post.postId}`));

    render() {
        return (
            <div>
                <Container text textAlign='center'>
                    <Header as='h1' color='blue'>Create New Post</Header>
                </Container>
                <Container text>
                    <PostAddForm submit={this.submitAddPage}/>
                </Container>
            </div>
        )
    }
}

PostAddPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
};

export default PostAddPage;

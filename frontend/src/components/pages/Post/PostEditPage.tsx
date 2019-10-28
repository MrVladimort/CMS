import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import postApi from "../../../api/post";
import {Container, Header} from "semantic-ui-react";
import PostEditForm, {IPostEditFormData} from "../../forms/Post/PostEditForm";
import {PostDTO} from "../../../types";

interface IPostEditPageState {
    post: PostDTO | null;
}

interface IPostEditPageProps {
    history: {
        push: Function
    };
    location: any;
}

class PostEditPage extends Component<IPostEditPageProps, IPostEditPageState> {
    static propTypes = {};

    constructor(props: IPostEditPageProps) {
        super(props);

        this.state = {
            post: null,
        }
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const postId = String(query.get('postId'));
        const postResponse = await postApi.getPost(postId);
        this.setState({post: postResponse.post});
    }

    submitEditPage = async (postData: IPostEditFormData) => postApi.createPost(postData).then((postResponse) => this.props.history.push(`/post?postId=${postResponse.post.postId}`));

    render() {
        const {post} = this.state;

        return (
            <div>
                <Container text textAlign='center'>
                    <Header as='h1' color='blue'>Create New Post</Header>
                </Container>
                <Container text>
                    {post && <PostEditForm submit={this.submitEditPage} post={post}/>}
                </Container>
            </div>
        )
    }
}

PostEditPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(PostEditPage);

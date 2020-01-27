import React, {Component} from 'react';
import PropTypes from 'prop-types';
import postApi from "../../../api/post";
import categoryApi from "../../../api/category";
import {Container, Header} from "semantic-ui-react";
import PostAddForm, {IPostAddFormData} from "../../forms/Post/PostAddForm";
import {CategoryDTO, PostDTO} from "../../../types";

interface IPostAddPageState {
    categories: CategoryDTO[]
}


interface IPostAddPageProps {
    history: {
        push: Function
    };
}

class PostAddPage extends Component<IPostAddPageProps, IPostAddPageState> {
    static propTypes = {};

    constructor(props: IPostAddPageProps) {
        super(props);

        this.state = {
            categories: [],
        }
    }

    submitAddPage = async (postData: IPostAddFormData) => postApi.createPost(postData).then((postResponse) => this.props.history.push(`/post/exact?postId=${postResponse.post.postId}`));

    componentDidMount = async () => {
        const categoriesResponse = await categoryApi.getCategories();
        this.setState({categories: categoriesResponse.categories});
    };

    render() {
        return (
            <div>
                <Container text textAlign='center'>
                    <Header as='h1' color='blue'>Create New Post</Header>
                </Container>
                <Container text>
                    <PostAddForm submit={this.submitAddPage} categories={this.state.categories}/>
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

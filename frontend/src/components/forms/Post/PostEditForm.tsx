import React, {Component} from 'react';
import {Form, Container, Header, TextArea} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ErrorMessage from "../../base/ErrorMessage";
import {PostDTO} from "../../../types";

export interface IPostEditFormData {
    text: string,
    imageLink: string,
    title: string,
}

interface IPostEditFormState {
    formData: IPostEditFormData,
    errors: any,
    loading: boolean
}

interface IPostEditFormProps {
    post: PostDTO,
    submit: Function,
}

class PostEditForm extends Component<IPostEditFormProps, IPostEditFormState> {
    static propTypes: any;

    constructor(props: IPostEditFormProps) {
        super(props);

        const {post} = props;

        this.state = {
            formData: {
                text: post.text,
                imageLink: post.imageLink,
                title: post.title,
            },
            loading: false,
            errors: {}
        };
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
        formData: {
            ...this.state.formData,
            [e.target.name]: e.target.value
        }
    });

    onSubmit = () => {
        const {formData} = this.state;
        const errors = this.validate(formData);
        this.setState({errors});
        if (_.isEmpty(errors)) {
            this.setState({loading: true});
            this.props.submit(formData)
                .catch((err: any) => this.setState({errors: {global: err.response.data.error}, loading: false}));
        }
    };

    validate = (formData: IPostEditFormData) => {
        const errors = {};
        return _.filter(errors, error => error);
    };

    render() {
        const {formData, errors, loading} = this.state;
        return (
            <Container>
                {!_.isEmpty(errors) && <ErrorMessage header='Something went wrong' errors={errors}/>}
                <Form onSubmit={this.onSubmit} loading={loading}>
                    <Header as='h5' content='Title *'/>
                    <Form.Input required error={!!errors.title} type='text' id='title' name='title'
                                value={formData.title} onChange={this.onChange}/>
                    <Header as='h5' content='Image link *'/>
                    <Form.Input required error={!!errors.imageLink} type='text' id='imageLink' name='imageLink'
                                placeholder="http://link.com" value={formData.imageLink} onChange={this.onChange}/>
                    <Header as='h5' content='Text *'/>
                    <Form.Field required error={!!errors.text} type='text' id='text' name='text'
                                control={TextArea} value={formData.text} onChange={this.onChange}/>
                    <Form.Button fluid type='submit' primary content='Edit post'/>
                </Form>
            </Container>
        );
    }
}

PostEditForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default PostEditForm;

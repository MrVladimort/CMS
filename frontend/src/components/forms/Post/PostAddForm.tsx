import React, {Component, SyntheticEvent} from 'react';
import {Form, Container, Header, TextArea, Dropdown} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ErrorMessage from "../../base/ErrorMessage";
import userApi from "../../../api/user";
import steamApi from "../../../api/steam";
import {CategoryDTO} from "../../../types";

export interface IPostAddFormData {
    text: string,
    imageLink: string,
    category: number,
    title: string,
}

interface IPostAddFormState {
    formData: IPostAddFormData,
    errors: any,
    loading: boolean
}

interface IPostAddFormProps {
    submit: (formData: IPostAddFormData) => Promise<void>,
    categories: CategoryDTO[],
}

class PostAddForm extends Component<IPostAddFormProps, IPostAddFormState> {
    static propTypes: any;

    constructor(props: IPostAddFormProps) {
        super(props);

        this.state = {
            formData: {
                text: "",
                imageLink: "",
                category: 0,
                title: "",
            },
            loading: false,
            errors: {}
        };
    }

    onChange = (e: SyntheticEvent, data: any) => {
        console.log(data);

        this.setState({
            formData: {
                ...this.state.formData,
                [data.name]: data.value
            }
        });
    };

    onSubmit = () => {
        const {formData} = this.state;
        const errors = this.validate(formData);
        this.setState({errors});
        if (_.isEmpty(errors)) {
            this.setState({loading: true});
            console.log(formData);
            this.props.submit(formData)
                .catch((err: any) => this.setState({errors: {global: err.response.data.error}, loading: false}));
        }
    };

    getCategoriesOptions = () => {
        const {categories} = this.props;

        return categories.map(category => ({
            key: category.categoryId,
            text: category.name,
            value: category.categoryId,
            image: {avatar: true, src: category.imageLink}
        }));
    };

    validate = (formData: IPostAddFormData) => {
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
                    <Header as='h5' content='Category *'/>
                    <Form.Select
                        id='category' name='category'
                        placeholder='Select Game Category'
                        fluid
                        selection
                        options={this.getCategoriesOptions()}
                        value={formData.category}
                        onChange={this.onChange}
                    />
                    <Header as='h5' content='Text *'/>
                    <Form.Field required error={!!errors.text} type='text' id='text' name='text'
                                control={TextArea} value={formData.text} onChange={this.onChange}/>
                    <Form.Button fluid type='submit' primary content='Create new post'/>
                </Form>
            </Container>
        );
    }
}

PostAddForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default PostAddForm;

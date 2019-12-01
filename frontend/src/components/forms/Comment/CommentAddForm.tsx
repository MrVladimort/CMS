import React, {Component} from 'react';
import {Form, Container, Header, TextArea} from 'semantic-ui-react';
import PropTypes, {func} from 'prop-types';
import _ from 'lodash';
import ErrorMessage from "../../base/ErrorMessage";

export interface ICommentAddFormData {
    commentData: {
        text: string,
        grade: number,
    },
    postId: number,
}

interface ICommentAddFormState {
    formData: ICommentAddFormData
    errors: any,
    loading: boolean
}

interface ICommentAddFormProps {
    submit: (formData: ICommentAddFormData) => Promise<void>
}

const options = [
    { key: 1, text: '1', value: 1},
    { key: 2, text: '2', value: 2},
    { key: 3, text: '3', value: 3},
    { key: 4, text: '4', value: 4},
    { key: 5, text: '5', value: 5},
];

class CommitAddForm extends Component<ICommentAddFormProps, ICommentAddFormState> {
    static propTypes: any;

    constructor(props: ICommentAddFormProps) {
        super(props);

        this.state = {
            formData: {
                commentData: {
                    text: "",
                    grade: 0,
                },
                postId: 0,
            },
            loading: false,
            errors: {}
        };
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
        formData: {
            ...this.state.formData,
            commentData: {
                ...this.state.formData.commentData,
                [e.target.name]: e.target.value
            },
        }
    });

    onDropdownChange = (e: React.SyntheticEvent<HTMLElement>, data: any) => {
        console.log(data.name, data.value, this.state.formData.commentData);
        this.setState({
            formData: {
                ...this.state.formData,
                commentData: {
                    ...this.state.formData.commentData,
                    [data.name]: data.value
                },
            }
        });
    };

    onSubmit = () => {
        const {formData} = this.state;
        const errors = this.validate(formData);
        this.setState({errors});
        if (_.isEmpty(errors)) {
            console.log(formData);
            this.props.submit(formData)
                .catch((err: any) => this.setState({errors: {global: err.response.data.error}, loading: false}));
        }
    };

    validate = (formData: ICommentAddFormData) => {
        const errors = {};
        return _.filter(errors, error => error);
    };

    render() {
        const {formData, errors, loading} = this.state;
        return (
            <Container>
                {!_.isEmpty(errors) && <ErrorMessage header='Something went wrong' errors={errors}/>}
                <Form onSubmit={this.onSubmit} loading={loading}>
                    <Header as='h5' content='Grade *'/>
                    <Form.Select required error={!!errors.grade} id='grade' name='grade' options={options}
                                 placeholder='Grade' value={formData.commentData.grade} onChange={this.onDropdownChange}/>
                    <Header as='h5' content='Text *'/>
                    <Form.Field required error={!!errors.text} type='text' id='text' name='text'
                                control={TextArea} value={formData.commentData.text} onChange={this.onChange}/>
                    <Form.Button fluid type='submit' primary content='Create new comment'/>
                </Form>
            </Container>
        );
    }
}

CommitAddForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default CommitAddForm;

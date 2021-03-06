import React, {Component} from 'react';
import {Form, Container, Header, TextArea} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ErrorMessage from "../../base/ErrorMessage";
import {CommentDTO} from "../../../types";

export interface ICommentEditFormData {
    text: string;
    grade: number;
}

interface ICommentEditFormState {
    formData: ICommentEditFormData,
    errors: any,
    loading: boolean
}

interface ICommentEditFormProps {
    comment: CommentDTO,
    submit: Function
}

const options = [
    { key: 1, text: '1', value: 1},
    { key: 2, text: '2', value: 2},
    { key: 3, text: '3', value: 3},
    { key: 4, text: '4', value: 4},
    { key: 5, text: '5', value: 5},
];

class CommitEditForm extends Component<ICommentEditFormProps, ICommentEditFormState> {
    static propTypes: any;

    constructor(props: ICommentEditFormProps) {
        super(props);

        this.state = {
            formData: {
                text: props.comment.text,
                grade: props.comment.grade
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

    validate = (formData: ICommentEditFormData) => {
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
                                 placeholder='Grade' value={formData.grade} on={this.onChange}/>
                    <Header as='h5' content='Text *'/>
                    <Form.Field required error={!!errors.text} type='text' id='text' name='text'
                                control={TextArea} value={formData.text} onChange={this.onChange}/>
                    <Form.Button fluid type='submit' primary content='Edit comment'/>
                </Form>
            </Container>
        );
    }
}

CommitEditForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default CommitEditForm;

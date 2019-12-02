import React, {Component} from 'react';
import {Form, Container, Header, TextArea, Rating} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ErrorMessage from "../base/ErrorMessage";

export interface ICommentFormData {
    text: string,
    grade: number,
}

interface ICommentFormState {
    formData: ICommentFormData
    errors: any,
    loading: boolean
}

interface ICommentFormProps {
    submit: (formData: ICommentFormData) => Promise<void>
}

class CommitAddForm extends Component<ICommentFormProps, ICommentFormState> {
    static propTypes: any;

    constructor(props: ICommentFormProps) {
        super(props);

        this.state = {
            formData: {
                text: "",
                grade: 0,
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

    handleRate = (e: any, {rating, maxRating}: any) => {
        console.log(rating, maxRating);
        this.setState({
            formData: {
                ...this.state.formData,
                grade: rating
            }
        });
    };

    onSubmit = () => {
        const {formData} = this.state;
        const errors = this.validate(formData);
        this.setState({errors});
        if (_.isEmpty(errors)) {
            this.props.submit(formData)
                .catch((err: any) => this.setState({errors: {global: err.response.data.error}, loading: false}));
        }
    };

    validate = (formData: ICommentFormData) => {
        const errors: any = {};
        if (formData.grade === 0) {
            errors.grade = "Grade must be greater then 0"
        }
        return _.filter(errors, error => error);
    };

    render() {
        const {formData, errors, loading} = this.state;
        return (
            <Container>
                {!_.isEmpty(errors) && <ErrorMessage header='Something went wrong' errors={errors}/>}
                <Form onSubmit={this.onSubmit} loading={loading}>
                    <Header as='h5' content='Grade *'/>

                    <Form.Field error={!!errors.grade}>
                        <Rating id='grade' name='grade' rating={formData.grade} clearable
                                maxRating={5} onRate={this.handleRate}/>
                    </Form.Field>
                    <Header as='h5' content='Text *'/>
                    <Form.Field required error={!!errors.text} type='text' id='text' name='text'
                                control={TextArea} value={formData.text} onChange={this.onChange}/>
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

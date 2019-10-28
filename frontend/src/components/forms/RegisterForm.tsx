import React, {Component} from 'react';
import PropTypes from "prop-types";
import _ from "lodash";
import { Container, Form, Header } from "semantic-ui-react";
import ErrorMessage from "../base/ErrorMessage";
import InlineError from "../base/InlineError";

export interface IRegisterFormData {
  email: string,
  pass: string,
  repeatPass: string,
  name: string,
  surname: string,
}

interface IRegisterFormProps {
  submit: Function
}

interface IRegisterFormState {
  formData: IRegisterFormData,
  loading: boolean,
  errors: any,
}

class RegisterForm extends Component<IRegisterFormProps, IRegisterFormState> {
  static propTypes: any;

  constructor(props: IRegisterFormProps) {
    super(props);

    this.state = {
      formData: {
        email: "",
        pass: "",
        repeatPass: "",
        name: "",
        surname: ""
      },
      loading: false,
      errors: {}
    }
  }

  onSubmit = () => {
    const { formData } = this.state;

    const errors = this.validate(formData);
    this.setState({ errors });

    if (_.isEmpty(errors)) {
      this.setState({ loading: true });
      this.props.submit(formData).catch((err: any) => this.setState({ errors: { global: err.response.data.error }, loading: false }));
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });

  validate = (formData: IRegisterFormData) => {
    const errors = {};
    return _.filter(errors, error => error);
  };

  render() {
    const { formData, errors, loading } = this.state;

    return (
      <Container>
        {!_.isEmpty(errors) && <ErrorMessage header='Something went wrong' errors={errors}/>}
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Header as='h5' content='Surname *'/>
          {!!errors.surname && <InlineError text={errors.surname}/>}
          <Form.Input required error={!!errors.surname} id='surname' name='surname' value={formData.surname}
                      onChange={this.onChange}/>

          <Header as='h5' content="Name *"/>
          {!!errors.name && <InlineError text={errors.name}/>}
          <Form.Input required error={!!errors.name} id='name' name='name' value={formData.name}
                      onChange={this.onChange}/>

          <Header as='h5' content={"Email *"}/>
          {!!errors.LoginForm && <InlineError text={errors.email}/>}
          <Form.Input required error={!!errors.email} type='email' id='email'
                      name='email'
                      value={formData.email} placeholder='mail@mail.ua'
                      onChange={this.onChange}/>

          <Header as='h5' content='Password *'/>
          {!!errors.password && <InlineError text={errors.pass}/>}
          <Form.Input required error={!!errors.pass} type='password' id='pass' name='pass'
                      value={formData.pass}
                      onChange={this.onChange}/>

          <Header as='h5' content='Repeat password *'/>
          {!!errors.repeatPassword && <InlineError text={errors.repeatPass}/>}
          <Form.Input required error={!!errors.repeatPassword} type='password' id='repeatPass' name='repeatPass'
                      value={formData.repeatPass} onChange={this.onChange}/>

          <Form.Button fluid type='submit' primary content='Sign Up'/>
        </Form>
      </Container>
    );
  }
}

RegisterForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default RegisterForm;

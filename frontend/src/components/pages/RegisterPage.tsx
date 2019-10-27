import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Container, Header} from 'semantic-ui-react';
import RegisterForm, {IRegisterFormData} from "../forms/RegisterForm";
import authApi from "../../api/auth";

interface IRegisterPageProps {
    history: {
        push: Function
    }
}

class RegisterPage extends React.Component<IRegisterPageProps> {
    static propTypes: any;

    submit = (registerData: IRegisterFormData) => authApi.register(registerData).then(() => this.props.history.push("/confirm-email"));

    render() {
        return (
            <Container>
                <Container text textAlign='center'>
                    <Header as='h1' color='blue'>Registration</Header>
                </Container>
                <Container text>
                    <RegisterForm submit={this.submit}/>
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => ({});

RegisterPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default connect(mapStateToProps)(RegisterPage);

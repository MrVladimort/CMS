import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Header} from 'semantic-ui-react';
import {connect} from "react-redux";
import authActions from "../../redux/actions/auth";
import LoginForm, {ILoginFormData} from "../forms/LoginForm";

interface ILoginPageProps {
    loginEmailAndPass: Function
    history: {
        push: Function
    }
}

class LoginPage extends Component<ILoginPageProps> {
    static propTypes: any;

    submitLogin = async (emailAndPass: ILoginFormData) => this.props.loginEmailAndPass(emailAndPass).then(() => this.props.history.push("/user"));

    render() {
        return (
            <div>
                <Container text textAlign='center'>
                    <Header as='h1' color='blue'>Log In</Header>
                </Container>
                <Container text>
                    <LoginForm submit={this.submitLogin}/>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
    loginEmailAndPass: authActions.loginEmailAndPass
};

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    loginEmailAndPass: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

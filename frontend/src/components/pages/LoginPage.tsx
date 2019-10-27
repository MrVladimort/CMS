import * as React from 'react';
import PropTypes from 'prop-types';
import {Container, Header} from 'semantic-ui-react';
import {connect} from "react-redux";
import authActions from "../../redux/actions/auth";
import LoginForm from "../forms/LoginForm";

interface ILoginFormData {
    email: string,
    pass: string,
}

interface ILoginPageProps {
    loginEmailAndPass: Function
    history: {
        push: Function
    }
}

class LoginPage extends React.Component<ILoginPageProps> {
    static propTypes: any;

    submit = (emailAndPass: ILoginFormData) => this.props.loginEmailAndPass(emailAndPass).then(() => this.props.history.push("/user"));

    render() {
        return (
            <div>
                <Container text textAlign='center'>
                    <Header as='h1' color='blue'>Log In</Header>
                </Container>
                <Container text>
                    <LoginForm submit={this.submit}/>
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

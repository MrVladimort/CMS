import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import authActions from "../../redux/actions/auth";
import {Header} from "semantic-ui-react";

interface IConfirmEmailPageProps {
    location: any,
    history: {
        push: Function
    },
    confirmEmail: Function
}


class ConfirmEmailPage extends Component<IConfirmEmailPageProps> {
    static propTypes = {};

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token');

        if (token) {
            await this.props.confirmEmail(token);
            this.props.history.push("/user")
        }
    };

    render() {
        return (
            <div>
                <Header as='h1' color='blue'>Email confirmation was sent to your email</Header>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
    confirmEmail: authActions.confirmEmail
};

ConfirmEmailPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    confirmEmail: PropTypes.func.isRequired,
    location: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailPage);

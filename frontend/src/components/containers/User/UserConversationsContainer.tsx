import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {UserDTO} from "../../../types"
import {Container, Grid, Segment, Header} from "semantic-ui-react";

interface IUserConversationContainerProps {
    user: UserDTO
}

class UserConversationContainer extends Component<IUserConversationContainerProps> {
    static propTypes = {};

    render() {
        return (
            <Container text>

            </Container>
        );
    }
}

UserConversationContainer.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string,
        email: PropTypes.string
    })
};


export default UserConversationContainer;

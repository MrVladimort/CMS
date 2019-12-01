import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {UserDTO} from "../../../types"
import {Container, Grid, Segment, Header} from "semantic-ui-react";

interface IUserSteamContainerProps {
    user: UserDTO
}

class UserSteamContainer extends Component<IUserSteamContainerProps> {
    static propTypes = {};

    render() {
        const {name, surname, email} = this.props.user;
        return (
            <Container text>

            </Container>
        );
    }
}

UserSteamContainer.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string,
        email: PropTypes.string
    })
};


export default UserSteamContainer;

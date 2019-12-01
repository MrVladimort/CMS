import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {UserDTO} from "../../../types"
import {Container, Grid, Segment, Header} from "semantic-ui-react";

interface IUserInfoContainerProps {
    user: UserDTO
}

class UserInfoContainer extends Component<IUserInfoContainerProps> {
    static propTypes = {};

    render() {
        const {name, surname, email} = this.props.user;
        return (

            <Grid celled='internally'>
                <Grid.Row>
                    <Grid.Column>
                        <Header content={`Surname: ${surname}`}/>
                        <Header content={`Name: ${name}`}/>
                        <Header content={`Email: ${email}`}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

UserInfoContainer.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string,
        email: PropTypes.string
    })
};


export default UserInfoContainer;

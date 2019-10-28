import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {UserDTO} from "../../types";
import {Container, Grid, Segment, Header} from "semantic-ui-react";

interface IUserPageProps {
    user: UserDTO,
    location: any,
    history: {
        push: Function
    },
}

class UserPage extends Component<IUserPageProps> {
    static propTypes = {};

    render() {
        const {name, surname, email} = this.props.user;
        return (
            <Container text>
                <Segment>
                    <Grid celled='internally'>
                        <Grid.Row>
                            <Grid.Column>
                                <Header content={`Surname: ${surname}`}/>
                                <Header content={`Name: ${name}`}/>
                                <Header content={`Email: ${email}`}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        );
    }
}

UserPage.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string,
        email: PropTypes.string
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object,
};


const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(UserPage);

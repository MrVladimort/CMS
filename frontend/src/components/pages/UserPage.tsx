import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {UserDTO} from "../../types";
import {Container, Grid, Segment, Header, Menu, MenuItemProps} from "semantic-ui-react";
import UserInfoContainer from "../containers/User/UserInfoContainer";
import UserSteamContainer from "../containers/User/UserSteamContainer";
import UserConversationContainer from "../containers/User/UserConversationsContainer";

interface IUserPageProps {
    user: UserDTO,
    location: any,
    history: {
        push: Function
    },
}

interface IUserPageState {
    activeItem: string
}

class UserPage extends Component<IUserPageProps, IUserPageState> {
    static propTypes = {};

    constructor(props: IUserPageProps) {
        super(props);

        this.state = {
            activeItem: "info"
        }
    }

    handleItemClick = (event: any, { name }: MenuItemProps) => this.setState({ activeItem: name });

    getUserPageComponent = () => {
        const { activeItem } = this.state;
        const { user } = this.props;

        switch (activeItem) {
            case 'info':
                return (<UserInfoContainer user={user}/>);
            case 'steam':
                return (<UserSteamContainer user={user}/>);
            case 'conversation':
                return (<UserConversationContainer user={user}/>);
        }
    };

    render() {
        const { activeItem } = this.state;

        return (
            <div>
                <Menu pointing>
                    <Menu.Item
                        name='info'
                        active={activeItem === 'info'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='steam'
                        active={activeItem === 'steam'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='conversation'
                        active={activeItem === 'conversation'}
                        onClick={this.handleItemClick}
                    />
                </Menu>

                <Segment attached='bottom'>
                    {this.getUserPageComponent()}
                </Segment>
            </div>
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

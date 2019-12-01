import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {UserDTO} from "../../types";
import {Container, Grid, Segment, Header, Menu, MenuItemProps, Button} from "semantic-ui-react";
import UserInfoContainer from "../containers/User/UserInfoContainer";
import UserSteamContainer from "../containers/User/UserSteamContainer";
import UserConversationContainer from "../containers/User/UserConversationsContainer";
import postApi from "../../api/post";
import userApi from "../../api/user";
import SegmentLoader from "../base/SegmentLoader";

interface IUserPageProps {
    user: UserDTO,
    location: any,
    history: {
        push: Function
    },
}

interface IUserPageState {
    user: UserDTO,
    isAnotherUser: boolean,
    activeItem: string,
    loading: boolean,
}

class UserPage extends Component<IUserPageProps, IUserPageState> {
    static propTypes = {};

    constructor(props: IUserPageProps) {
        super(props);

        this.state = {
            user: null,
            isAnotherUser: false,
            activeItem: "info",
            loading: true,
        }
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const userId = parseInt(String(query.get('userId')));

        if (userId) {
            const anotherUserResponse = await userApi.getAnotherUser(userId);
            this.setState({user: anotherUserResponse.user, isAnotherUser: true});
        } else {
            this.setState({user: this.props.user});
        }

        this.setState({loading: false});
    }

    handleItemClick = (event: any, {name}: MenuItemProps) => this.setState({activeItem: name});

    getUserPageComponent = () => {
        const {activeItem, user} = this.state;

        switch (activeItem) {
            case 'info':
                return (<UserInfoContainer user={user}/>);
            case 'steam':
                return (<UserSteamContainer user={user}/>);
            case 'conversation':
                return (<UserConversationContainer user={user}/>);
        }
    };

    friendsButtonClick = async () => {
        const anotherUserResponse = await userApi.addToFriends(this.state.user.userId);
        console.log(anotherUserResponse);
    };

    render() {
        const {activeItem, isAnotherUser, loading} = this.state;

        return (
            loading ?
                <SegmentLoader/> :
                <div>
                    {isAnotherUser &&
                        <Button color={"pink"} onClick={this.friendsButtonClick}> Add to friends</Button>
                    }
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
                        {!isAnotherUser &&
                        <Menu.Item
                            name='conversation'
                            active={activeItem === 'conversation'}
                            onClick={this.handleItemClick}
                        />
                        }
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

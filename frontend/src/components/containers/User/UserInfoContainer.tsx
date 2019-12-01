import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {UserDTO, FriendDTO} from "../../../types"
import {Container, Grid, Segment, Header, Card, Button, Image} from "semantic-ui-react";
import userApi from "../../../api/user";
import SegmentLoader from "../../base/SegmentLoader";

interface IUserInfoContainerProps {
    user: UserDTO,
}

interface IUserInfoContainerState {
    friends: Array<FriendDTO>,
    friendsRequest: Array<FriendDTO>,
    loading: boolean
}

class UserInfoContainer extends Component<IUserInfoContainerProps, IUserInfoContainerState> {
    static propTypes = {};

    constructor(props: IUserInfoContainerProps) {
        super(props);

        this.state = {
            friends: [],
            friendsRequest: [],
            loading: true
        }
    }

    async componentDidMount(): Promise<void> {
        const [friendsRequestResponse, friendsResponse] = await Promise.all([userApi.getFriendsRequest(), userApi.getFriends()]);
        this.setState({
            friends: friendsResponse.friends,
            friendsRequest: friendsRequestResponse.friends,
            loading: false
        });
    }

    render() {
        const {name, surname, email} = this.props.user;
        const {loading, friends, friendsRequest} = this.state;

        return (
            loading ?
                <SegmentLoader/> :
                <Grid celled='internally'>
                    <Grid.Row width={12}>
                        <Grid.Column width={12}>
                            <Header content={`Surname: ${surname}`}/>
                            <Header content={`Name: ${name}`}/>
                            <Header content={`Email: ${email}`}/>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            {friendsRequest.length > 0 &&
                            <Grid.Row>
                                <Header textAlign={"center"} size={"huge"}> New friend requests </Header>
                                <Card.Group>
                                    {friendsRequest.map((friendRequest) =>
                                        <Card fluid>
                                            <Card.Content>
                                                <Image floated='right'
                                                       size='mini'
                                                       src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                                />
                                                <Card.Header>{friendRequest.Friend.name} {friendRequest.Friend.surname}</Card.Header>
                                                <Card.Description>
                                                    Steve wants to add you to the group <strong>best friends</strong>
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <div className='ui two buttons'>
                                                    <Button basic color='green'>
                                                        Approve
                                                    </Button>
                                                    <Button basic color='red'>
                                                        Decline
                                                    </Button>
                                                </div>
                                            </Card.Content>
                                        </Card>
                                    )}
                                </Card.Group>
                            </Grid.Row>
                            }
                            <div>
                                <h1> </h1>
                            </div>
                            {friends.length > 0 &&
                            <Grid.Row>
                                <Header textAlign={"center"} size={"huge"}> Friends </Header>
                                <Card.Group>
                                    {friends.map((friends) =>
                                        <Card fluid>
                                            <Card.Content>
                                                <Image floated='right'
                                                       size='mini'
                                                       src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                                />
                                                <Card.Header>{friends.Friend.name} {friends.Friend.surname}</Card.Header>
                                                <Card.Description>
                                                    Steve wants to add you to the group <strong>best friends</strong>
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    )}
                                </Card.Group>
                            </Grid.Row>
                            }

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
        email: PropTypes.string,
    }),
};


export default UserInfoContainer;

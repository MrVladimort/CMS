import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import {UserDTO, FriendDTO, PostDTO} from "../../../types"
import {Grid, Segment, Header, Card, Button, Image} from "semantic-ui-react";
import userApi from "../../../api/user";
import postApi from "../../../api/post";
import SegmentLoader from "../../base/SegmentLoader";
import PostContainer from "../PostContainer";

interface IUserInfoContainerProps {
    user: UserDTO,
    isAnotherUser: boolean,
}

interface IUserInfoContainerState {
    posts: Array<PostDTO>,
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
            posts: [],
            loading: true
        }
    }

    async componentDidMount(): Promise<void> {
        const [friendsRequestResponse, friendsResponse, userPostsResponse] = await Promise.all([userApi.getFriendsRequest(), userApi.getFriends(), postApi.getUserPosts(this.props.user.userId)]);
        console.log(friendsResponse);
        console.log(friendsRequestResponse);
        console.log(userPostsResponse);
        this.setState({
            friends: friendsResponse.friends,
            friendsRequest: friendsRequestResponse.friends,
            posts: userPostsResponse.posts,
            loading: false
        });
    }

    approveFriendRequest = async (friendId: number): Promise<void> => {
        const {friends, friendsRequest} = this.state;
        const acceptResponse = await userApi.acceptFriendRequest(friendId);
        friends.unshift(acceptResponse.friend);
        friendsRequest.splice(friendsRequest.findIndex(friendsRequest => friendsRequest.friendId === friendId), 1);
        this.setState({friends, friendsRequest});
    };

    declineFriendRequest = async (friendId: number): Promise<void> => {
        const {friendsRequest} = this.state;
        await userApi.deleteFriend(friendId);
        friendsRequest.splice(friendsRequest.findIndex(friendsRequest => friendsRequest.friendId === friendId), 1);
        this.setState({friendsRequest});
    };

    deleteFriendRequest = async (friendId: number): Promise<void> => {
        const {friends} = this.state;
        await userApi.deleteFriend(friendId);
        friends.splice(friends.findIndex(friend => friend.friendId === friendId), 1);
        this.setState({friends});
    };

    addToFriends = async () => {
        const {friendsRequest} = this.state;
        const addToFriendsResponse = await userApi.addToFriends(this.props.user.userId);
        friendsRequest.unshift(addToFriendsResponse.friend);
        this.setState({friendsRequest})
    };

    getFriends = () => {
        const {user, isAnotherUser} = this.props;
        const {friends, friendsRequest} = this.state;

        return (
            <div>
                {isAnotherUser
                && !friendsRequest.find(friendRequest => friendRequest.User.userId === user.userId || friendRequest.Friend.userId === user.userId)
                && !friends.find(friend => friend.User.userId === user.userId || friend.Friend.userId === user.userId)
                && <Button fluid color={"pink"} onClick={this.addToFriends}> Add to friends</Button>}
                {!isAnotherUser && friendsRequest.length > 0 &&
                <div>
                    <Header size={"huge"}> New friend requests </Header>
                    <Card.Group centered>
                        {friendsRequest.map((friendRequest) =>
                            <Card key={`friends ${friendRequest.friendId}`} fluid raised>
                                <Card.Content>
                                    <Header as='h2'>
                                        <Image circular
                                               src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
                                        {friendRequest.User.name} {friendRequest.User.surname}
                                    </Header>
                                    <Card.Meta>New Friend</Card.Meta>
                                    <Card.Description>
                                        Steve wants to add you to the group <strong>best friends</strong>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button basic content="Approve" color='green'
                                                onClick={() => this.approveFriendRequest(friendRequest.friendId)}/>
                                        <Button basic content="Decline" color='red'
                                                onClick={() => this.declineFriendRequest(friendRequest.friendId)}/>
                                    </div>
                                </Card.Content>
                            </Card>
                        )}
                    </Card.Group>
                </div>}

                {!isAnotherUser && friends.length > 0 && friends.find(friend => !friend.accepted && friend.User.userId === user.userId) &&
                <div>
                    <Header size={"huge"}> Pending friend requests </Header>
                    <Card.Group centered>
                        {friends.filter(friend => !friend.accepted && friend.User.userId === user.userId).map(friend =>
                            <Card key={`friends ${friend.friendId}`} fluid raised>
                                <Card.Content>
                                    <Header as='h2'>
                                        <Image circular
                                               src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
                                        {friend.Friend.name} {friend.Friend.surname}
                                    </Header>
                                    <Card.Meta>Pending friend requests</Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button fluid basic content="Delete" color='red'
                                            onClick={() => this.deleteFriendRequest(friend.friendId)}/>
                                </Card.Content>
                            </Card>
                        )}
                    </Card.Group>
                </div>}

                {friends.length > 0 && friends.find(friend => friend.accepted && friend.User.userId === user.userId) &&
                <div>
                    <Card.Group centered>
                        <Header size="huge"> Friends </Header>
                        {friends.filter(friend => friend.accepted && friend.User.userId === user.userId).map(friend =>
                            <Card key={`friends ${friend.friendId}`} fluid raised>
                                <Card.Content>
                                    <Header as='h2'>
                                        <Image circular
                                               src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
                                        {friend.Friend.name} {friend.Friend.surname}s
                                    </Header>
                                    <Card.Meta>Friend</Card.Meta>
                                </Card.Content>
                            </Card>
                        )}
                    </Card.Group>
                </div>}
            </div>
        )
    };

    render() {
        const {user} = this.props;
        const {loading, posts} = this.state;

        return (
            loading ?
                <SegmentLoader/> :
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Card.Group centered>
                                <Card fluid>
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false}/>
                                    <Card.Content>
                                        <Header>{user.name} {user.surname}</Header>
                                        <Card.Meta>
                                            <span
                                                className='date'>Joined in {moment(user.createdAt).format('MMMM Do YYYY')}</span>
                                        </Card.Meta>
                                        <Card.Description>
                                            {user.email}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        </Grid.Column>

                        <Grid.Column width={8}>
                            {posts && posts.map(post =>
                                <Segment raised key={`post: ${post.postId}`}>
                                    <PostContainer post={post}/>
                                </Segment>)}
                        </Grid.Column>

                        <Grid.Column width={4}>
                            {this.getFriends()}
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

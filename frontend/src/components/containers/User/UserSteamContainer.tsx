import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SteamFriendUserDTO, SteamGameDTO, SteamUserDTO, UserDTO} from "../../../types"
import {Grid, Segment, Header, Card, Image, Flag, FlagNameValues, Icon, Feed, Loader, Dimmer} from "semantic-ui-react";
import steamApi from "../../../api/steam";

interface IUserSteamContainerProps {
    user: UserDTO
}

interface ISteamPageState {
    userData: SteamUserDTO | null;
    friends: SteamFriendUserDTO[] | null
    lastPlayedGames: SteamGameDTO[] | null
    ownedGames: SteamGameDTO[] | null,
    loading: boolean,
}

class UserSteamContainer extends Component<IUserSteamContainerProps, ISteamPageState> {
    static propTypes = {};

    constructor(props: IUserSteamContainerProps) {
        super(props);

        this.state = {
            userData: null,
            friends: null,
            lastPlayedGames: null,
            ownedGames: null,
            loading: true,
        }
    }

    async componentDidMount(): Promise<void> {
        const {user, userFriends} = await steamApi.getUserData("maxvel_trade");
        const lastPlayedGames = await steamApi.getLastPlayedGames("maxvel_trade");
        const ownedGames = await steamApi.getOwnedGames("maxvel_trade");

        this.setState({
            loading: false,
            userData: user,
            friends: userFriends,
            lastPlayedGames: lastPlayedGames,
            ownedGames: ownedGames
        });
    }

    render() {
        const {loading, userData, friends, lastPlayedGames, ownedGames} = this.state;
        console.log(lastPlayedGames);
        return (
            loading ?
                <Segment>
                    <Dimmer active>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Segment> :
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header>{userData && friends &&
                            <Card centered={false} href={userData.profileUrl}>
                                <Image src={userData.avatar} wrapped/>
                                <Card.Content>
                                    <Card.Header>{userData.realName}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Joined in {userData.createDate}</span>
                                    </Card.Meta>
                                    <Card.Meta>
                                        <span className='date'>Level {userData.level}</span>
                                    </Card.Meta>
                                    <Card.Meta>
                                        <Flag name={userData.countryCode as FlagNameValues}/>
                                    </Card.Meta>
                                    <Card.Description>

                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='user'/>
                                        {friends.length} Friends
                                    </a>
                                </Card.Content>
                            </Card>
                            }</Header>
                        </Grid.Column>

                        <Grid.Column width={13}>
                            <Segment>
                                <Header textAlign={"center"} size={"huge"}>Recently Played</Header>
                                <Grid columns={4} divided>
                                    <Grid.Row>
                                        {lastPlayedGames && lastPlayedGames.map(game =>
                                            <Grid.Column>
                                                <Card href={"https://store.steampowered.com/app/" + game.appID}
                                                      color={"blue"}>
                                                    <Image src={game.logoURL}
                                                           href={"https://store.steampowered.com/app/" + game.appID}
                                                           wrapped/>

                                                    <Card.Description>
                                                        <span>Time spent: {(Number(game.playTime) / 60).toFixed()} h</span>
                                                    </Card.Description>

                                                </Card>
                                            </Grid.Column>
                                        )}
                                    </Grid.Row>
                                </Grid>

                                {ownedGames &&
                                <Grid textAlign={"center"}>
                                    <Header textAlign={"center"} size={"medium"}>Most time spend at</Header>
                                    <Grid.Row textAlign={"center"}>
                                        {ownedGames.filter(a => Number(a.playTime) > 1).sort((a, b) => (Number(a.playTime) / 60) - (Number(b.playTime) / 60)).reverse().slice(0, 7).map(game =>
                                            <Grid.Column>
                                                <Feed>
                                                    <Feed.Event>
                                                        <Feed.Label image={game.iconURL}
                                                                    href={"https://store.steampowered.com/app/" + game.appID}/>
                                                    </Feed.Event>
                                                </Feed>
                                            </Grid.Column>
                                        )}
                                    </Grid.Row>
                                </Grid>
                                }

                                <Grid textAlign={"center"}>
                                    <Header size={"small"}>Friends</Header>
                                    <Grid.Row textAlign={"center"}>
                                        {friends && friends.map(friend =>
                                            <Grid.Column>
                                                <Feed>
                                                    <Feed.Event>
                                                        <Feed.Label image={friend.avatar} href={friend.url}/>
                                                    </Feed.Event>
                                                </Feed>
                                            </Grid.Column>
                                        )}
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    {/*<Grid.Row>*/}
                    {/*    <Grid.Column width={16}>*/}
                    {/*    <Segment>*/}
                    {/*        {ownedGames && ownedGames.filter(a => Number(a.playTime) > 1).sort((a, b) => (Number(a.playTime)/60) - (Number(b.playTime)/60)).reverse().slice(0, 7).map(game =>*/}
                    {/*            <Feed>*/}
                    {/*                <Feed.Event>*/}
                    {/*                    <Feed.Label image={game.iconURL} href={"https://store.steampowered.com/app/" + game.appID}/>*/}
                    {/*                </Feed.Event>*/}
                    {/*            </Feed>*/}
                    {/*        )}*/}
                    {/*</Segment>*/}
                    {/*</Grid.Column>*/}
                    {/*</Grid.Row>*/}

                    {/*{friends && friends.map(friend =>*/}
                    {/*    <Feed>*/}
                    {/*        <Feed.Event>*/}
                    {/*            <Feed.Label image={friend.avatar} href={friend.url}/>*/}
                    {/*        </Feed.Event>*/}
                    {/*    </Feed>*/}
                    {/*)}*/}
                </Grid>
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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SteamFriendUserDTO, SteamGameDTO, SteamUserDTO, UserDTO} from "../../../types"
import {Grid, Segment, Header, Card, Image, Flag, FlagNameValues, Icon, Feed, Loader, Dimmer} from "semantic-ui-react";
import steamApi from "../../../api/steam";
import SegmentLoader from "../../base/SegmentLoader";

interface IUserSteamContainerProps {
    user: UserDTO
}

interface ISteamPageState {
    userData: SteamUserDTO | null;
    friends: SteamFriendUserDTO[] | null
    lastPlayedGames: SteamGameDTO[] | null
    ownedGames: SteamGameDTO[] | null,
    gameRecommendations: any[],
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
            gameRecommendations: []
        }
    }

    async componentDidMount(): Promise<void> {
        const [{user, userFriends}, lastPlayedGames, ownedGames, gameRecommendationsResponse] = await Promise.all([
            steamApi.getUserData("maxvel_trade"),
            steamApi.getLastPlayedGames("maxvel_trade"),
            steamApi.getOwnedGames("maxvel_trade"),
            steamApi.getRecommendations("maxvel_trade"),
        ]);

        this.setState({
            loading: false,
            userData: user,
            friends: userFriends,
            lastPlayedGames,
            ownedGames,
            gameRecommendations: gameRecommendationsResponse.recommendations
        });
    }

    render() {
        const {loading, userData, friends, lastPlayedGames, ownedGames, gameRecommendations} = this.state;
        console.log(lastPlayedGames);
        return (
            loading ?
                <SegmentLoader/> :
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

                            <Segment>
                                <Header textAlign={"center"} size={"huge"}>Game recommendations</Header>
                                <Grid columns={3} divided>
                                    <Grid.Row>
                                        {gameRecommendations && gameRecommendations.map(game =>
                                            <Grid.Column>
                                                <Card href={game.header_image}
                                                      color={"blue"}>
                                                    <Image src={game.header_image}
                                                           href={game.header_image}
                                                           wrapped/>

                                                    <Card.Description>
                                                        {game.short_description}
                                                    </Card.Description>

                                                </Card>
                                            </Grid.Column>
                                        )}
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
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

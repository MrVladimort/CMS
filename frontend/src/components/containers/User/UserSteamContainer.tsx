import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SteamFriendUserDTO, SteamGameDTO, SteamUserDTO, UserDTO} from "../../../types"
import {
    Grid,
    Segment,
    Header,
    Card,
    Image,
    Flag,
    FlagNameValues,
    Icon,
    Feed,
    Modal,
    Input,
    Button
} from "semantic-ui-react";
import steamApi from "../../../api/steam";
import SegmentLoader from "../../base/SegmentLoader";

interface IUserSteamContainerProps {
    user: UserDTO
}

export interface ISteamAddFormData {
    steamId: any,
}

interface ISteamPageState {
    formData: ISteamAddFormData,
    userData: SteamUserDTO | null;
    friends: SteamFriendUserDTO[] | null
    lastPlayedGames: SteamGameDTO[] | null
    ownedGames: SteamGameDTO[] | null,
    gameRecommendations: any[],
    loading: boolean,
    steamId: any,
}

class UserSteamContainer extends Component<IUserSteamContainerProps, ISteamPageState> {
    static propTypes = {};

    constructor(props: IUserSteamContainerProps) {
        super(props);

        this.state = {
            formData:{
                steamId: null,
            },
            userData: null,
            friends: null,
            lastPlayedGames: null,
            ownedGames: null,
            loading: true,
            steamId: null,
            gameRecommendations: []
        };
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
        formData: {
            ...this.state.formData,
            [e.target.name]: e.target.value
        }
    });

    checkSteamID = async () => {
        const steamID = this.state.formData.steamId;

        const [{userId}, userData] = await Promise.all([steamApi.checkSteamId(steamID), steamApi.checkProfileStatus(steamID)]);
        console.log(userId, userData);
        if (userId && userData.status.commentPermission) {
            const [{user, userFriends}, lastPlayedGames, ownedGames] = await Promise.all([
                steamApi.getUserData(steamID),
                steamApi.getLastPlayedGames(steamID),
                steamApi.getOwnedGames(steamID),
                steamApi.getRecommendations(steamID),
            ]);

            this.setState({
                loading: false,
                userData: user,
                friends: userFriends,
                lastPlayedGames,
                ownedGames,
                steamId: this.state.formData.steamId,
                gameRecommendations: []
            });
        }
    };

    async componentDidMount(): Promise<void> {
        // get user steam ID
        // const [{user, userFriends}, lastPlayedGames, ownedGames, gameRecommendationsResponse] = await Promise.all([
        //     steamApi.getUserData("maxvel_trade"),
        //     steamApi.getLastPlayedGames("maxvel_trade"),
        //     steamApi.getOwnedGames("maxvel_trade"),
        //     steamApi.getRecommendations("maxvel_trade"),
        // ]);
        //
        // this.setState({
        //     loading: false,
        //     userData: user,
        //     friends: userFriends,
        //     lastPlayedGames,
        //     ownedGames,
        //     steamId: null,
        //     gameRecommendations: gameRecommendationsResponse.recommendations
        // });
    }

    render() {
        const {loading, userData, friends, lastPlayedGames, ownedGames, gameRecommendations, steamId} = this.state;
        return (
            steamId == null ?
                <div>
                    <Modal defaultOpen={true} size={"tiny"}>
                        <Modal.Header>Set steam id</Modal.Header>
                        <Modal.Content>
                            <Header>Please make sure that you steam profile isn't private</Header>
                            <Input focus placeholder='steam id...' onChange={this.onChange} name='steamId'/>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                onClick={this.checkSteamID}
                                positive
                                icon='checkmark'
                                labelPosition='right'
                                content='Set'
                            />
                        </Modal.Actions>
                    </Modal>
                </div>
                : loading ?
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
                                        {gameRecommendations.length > 0 && gameRecommendations.map(game =>
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

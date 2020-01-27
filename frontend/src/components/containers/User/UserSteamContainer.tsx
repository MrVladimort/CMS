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
    Button,
    Tab,
    Item
} from "semantic-ui-react";
import steamApi from "../../../api/steam";
import userApi from "../../../api/user";
import SegmentLoader from "../../base/SegmentLoader";

interface IUserSteamContainerProps {
    user: UserDTO,
    history: any,
}

export interface ISteamAddFormData {
    steamId: any,
}

interface ISteamPageState {
    formData: ISteamAddFormData,
    userData: SteamUserDTO;
    friends: SteamFriendUserDTO[];
    lastPlayedGames: SteamGameDTO[];
    ownedGames: SteamGameDTO[];
    gameRecommendations: any[];
    friendsRecommendations: any[];
    loading: boolean,
    steamId: string,
    steamTabs: any[any]
}

class UserSteamContainer extends Component<IUserSteamContainerProps, ISteamPageState> {
    static propTypes = {};

    constructor(props: IUserSteamContainerProps) {
        super(props);

        this.state = {
            formData: {
                steamId: null,
            },
            userData: null,
            friends: null,
            lastPlayedGames: null,
            ownedGames: null,
            loading: true,
            gameRecommendations: [],
            friendsRecommendations: [],
            steamId: null,
            steamTabs: []
        };
    }

    componentDidMount = async () => {
        const {steamId} = this.props.user;

        if (steamId != null) {
            await this.loadSteamData(steamId);
            await this.loadSteamTabs();
        }
    };

    loadSteamData = async (steamId: string) => {
        this.setState({
            loading: true
        });

        const [{user, userFriends}, lastPlayedGames, ownedGames, gameRecommendations, friendsRecommendations] = await Promise.all([
            steamApi.getUserData(steamId),
            steamApi.getLastPlayedGames(steamId),
            steamApi.getOwnedGames(steamId),
            steamApi.getGameRecommendations(steamId),
            steamApi.getFriendsRecommendations(steamId),
        ]);

        this.setState({
            loading: false,
            userData: user,
            friends: userFriends,
            lastPlayedGames,
            ownedGames,
            steamId,
            gameRecommendations: gameRecommendations.recommendations,
            friendsRecommendations: friendsRecommendations.recommendations,
        });
    };

    loadSteamTabs = async () => {
        const {lastPlayedGames, ownedGames, friends, gameRecommendations, friendsRecommendations} = this.state;

        // @ts-ignore
        const panes = [
            {
                menuItem: 'Games', render: () => <Tab.Pane>
                    <Header textAlign={"center"} size={"huge"}>Recently Played</Header>
                    <Grid columns={3}>
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
                    </Grid>

                    <Header textAlign={"left"} size={"medium"} style={{paddingBottom: "20px"}}>Most time spend at</Header>
                    {ownedGames &&
                    <Grid>
                        <Feed>
                            {ownedGames.filter(a => Number(a.playTime) > 1).sort((a, b) => (Number(a.playTime) / 60) - (Number(b.playTime) / 60)).reverse().slice(0, 7).map(game =>
                                <Feed.Event href={"https://store.steampowered.com/app/" + game.appID}>
                                    <Feed.Label>
                                        <img src={game.iconURL}/>
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.User>{game.name}</Feed.User>
                                            <Feed.Date>{(Number(game.playTime) / 60).toFixed()} h</Feed.Date>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                            )}
                        </Feed>
                    </Grid>
                    }
                </Tab.Pane>
            },
            {
                menuItem: 'Friends', render: () => <Tab.Pane>
                    <Header textAlign={"center"} size={"huge"}>Friends</Header>
                    <Grid columns={4}>
                        {friends && friends.map(friend =>
                            <Grid.Column stretched>
                                <Feed href={friend.url}>
                                    <Feed.Event>
                                        <Feed.Label image={friend.avatar}/>
                                        <Feed.Content>
                                            <Feed.Summary content={friend.nickname}/>
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                            </Grid.Column>
                        )}
                    </Grid>
                </Tab.Pane>
            },
            {
                menuItem: 'Recommendations', render: () => <Tab.Pane>
                    <Header textAlign={"center"} size={"huge"}>Games</Header>
                    <Grid columns={4} divided>
                        {gameRecommendations.length > 0 && gameRecommendations.map((game: { header_image: string; short_description: React.ReactNode; steam_appid: string }) =>
                            <Grid.Column stretched>
                                <Card href={"https://store.steampowered.com/app/" + game.steam_appid} fluid>
                                    <Image src={game.header_image}
                                           wrapped/>
                                    <Card.Content>
                                        <Card.Description>
                                            {game.short_description}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        )}
                    </Grid>

                    <Header textAlign={"center"} size={"huge"}>Friends</Header>
                    <Grid columns={4}>
                        {friendsRecommendations && friendsRecommendations.map(friend =>
                            <Grid.Column stretched>
                                <Feed href={friend.url}>
                                    <Feed.Event>
                                        <Feed.Label image={friend.avatar}/>
                                        <Feed.Content>
                                            <Feed.Summary content={friend.nickname}/>
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                            </Grid.Column>
                        )}
                    </Grid>
                </Tab.Pane>
            },
        ];

        this.setState({steamTabs: panes})
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
        formData: {
            ...this.state.formData,
            [e.target.name]: e.target.value
        }
    });

    setSteamId = async () => {
        const steamId = this.state.formData.steamId;

        const {userId} = await steamApi.checkSteamId(steamId);

        if (userId) {
            await userApi.setSteamId(steamId);
            window.location.reload();
        }
    };

    getSteamIdForm = () => {
        return (<Modal defaultOpen={true} size={"tiny"}>
            <Modal.Header>Set steam id</Modal.Header>
            <Modal.Content>
                <Header>Please make sure that you steam profile isn't private</Header>
                <Input focus placeholder='steam id...' onChange={this.onChange} name='steamId'/>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    onClick={this.setSteamId}
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Set'
                />
            </Modal.Actions>
        </Modal>);
    };

    render() {
        const {user} = this.props;
        const {loading, userData, friends, steamTabs, steamId} = this.state;

        if (!user.steamId && !steamId) {
            return (
                this.getSteamIdForm()
            );
        } else {
            return (
                loading ? <SegmentLoader/> :
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
                                <Tab panes={steamTabs}> </Tab>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            );
        }
    }
}

UserSteamContainer.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string,
        email: PropTypes.string
    }),
    history: PropTypes.object
};


export default UserSteamContainer;

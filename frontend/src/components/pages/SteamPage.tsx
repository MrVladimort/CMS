import React, {Component} from 'react';
import PropTypes, {any} from 'prop-types';
import {connect} from "react-redux";
import {SteamUserDTO, SteamFriendUserDTO, SteamGameDTO} from "../../types";
import {Container, Grid, Segment, Header, Card, Image, Icon, Feed} from "semantic-ui-react";
import steamApi from "../../api/steam";

interface ISteamPageState {
    userData: SteamUserDTO | null;
    friends: SteamFriendUserDTO[] | null
    lastPlayedGames: SteamGameDTO[] | null
}

interface IEventPageProps {
    user: any;
}

class SteamPage extends React.Component <IEventPageProps, ISteamPageState> {
    static propTypes = {};

    constructor(props: IEventPageProps) {
        super(props);

        this.state = {
            userData: null,
            friends: null,
            lastPlayedGames: null
        }
    }

    async componentDidMount(): Promise<void> {
        const {user, userFriends} = await steamApi.getUserData("maxvel_trade");
        const games = await steamApi.getLastPlayedGames("maxvel_trade");
        this.setState({userData: user, friends: userFriends, lastPlayedGames: games});
        console.log(this.state);
    }

    render() {
        const { userData, friends, lastPlayedGames } = this.state;
    console.log(lastPlayedGames);
        return (
            <div>
                <Segment size="small">
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
                                            <Card.Description>
                                                TEST
                                                TEST
                                                TEST
                                                TEST
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <a>
                                                <Icon name='user' />
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
                                        {/*<Card href={"https://store.steampowered.com/app/" + game.appID}>*/}
                                            <p>{game.name}</p>
                                            <Image src={game.logoURL} wrapped/>
                                        {/*</Card>*/}
                                        </Grid.Column>
                                    )}
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        {friends && friends.map(friend =>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image={friend.avatar} href={friend.url}/>
                                </Feed.Event>
                            </Feed>
                        )}
                    </Grid>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(SteamPage);

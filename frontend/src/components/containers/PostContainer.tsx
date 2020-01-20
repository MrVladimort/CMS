import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Container, Grid, Header, Image, Icon, Label, Rating, List} from "semantic-ui-react";
import {Link} from "react-router-dom";
import moment from "moment";
import {PostDTO} from "../../types";

interface IPostProps {
    post: PostDTO,
    displaySetting: any
}

class PostContainer extends Component<IPostProps> {
    static propTypes: any;

    render() {
        const {post, displaySetting} = this.props;

        if (!displaySetting.displayFull && post.text.length > displaySetting.maxCharacters) {
            post.text = post.text.substr(0, displaySetting.maxCharacters) + "...";
        }

        return (
            <Grid>
                {!displaySetting.disaplyFull && (displaySetting.maxCharacters > 1000 || displaySetting.maxCharacters === 0) && // gavno
                <Grid.Row divided>
                    <Grid.Column width={3}>
                        <List>
                            <List.Item>
                                <Image style={{width: '20px'}}
                                       src={"https://www.freeiconspng.com/uploads/counter-strike-global-offensive-csgo-icon-8.png"}/>
                                <List.Content>
                                    <List.Header>CS GO</List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <p> {post.User.name} {post.User.surname} </p>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <cite>{moment(post.createAt).format("MMMM Mo")} </cite>
                    </Grid.Column>
                </Grid.Row>
                }
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Link to={`/post/exact?postId=${post.postId}`}>
                            <Header as={"h2"}>{post.title}</Header>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Image src={post.imageLink} size='large' rounded centered/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Container>
                            <p>{post.text}</p>
                        </Container>
                    </Grid.Column>
                </Grid.Row>

                {!displaySetting.disaplyFull && (displaySetting.maxCharacters > 1000 || displaySetting.maxCharacters === 0) && // gavno
                <Grid.Row>
                    <Grid.Column width={6} textAlign='left'>
                        <Label>
                            <Icon name='eye'/> {post.views}
                        </Label>
                    </Grid.Column>
                    <Grid.Column width={10} textAlign='right'>
                        <Rating defaultRating={Math.floor(Math.random() * 5)} maxRating={5} disabled/>
                    </Grid.Column>
                </Grid.Row>
                }
            </Grid>
        )
    }
}


PostContainer.propTypes = {
    post: PropTypes.object.isRequired,
    displayFull: PropTypes.bool
};


export default PostContainer;

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
        const {Category: category} = post;
        let style = {width: '400px', height: '250px'};

        if (!displaySetting.displayFull && post.text.length > displaySetting.maxCharacters) {
            post.text = post.text.substr(0, displaySetting.maxCharacters) + "...";
        }

        if (displaySetting.displayFull || displaySetting.maxCharacters > 1000) {
            style = null;
        }

        return (
            <Grid>
                {!displaySetting.disaplyFull && (displaySetting.maxCharacters > 1000 || displaySetting.maxCharacters === 0) && // gavno
                <Grid.Row divided>
                    <Grid.Column width={3}>
                        <List>
                            <List.Item>
                                <Image style={{width: '20px'}}
                                       src={category.imageLink}/>
                                <List.Content>
                                    <List.Header>{category.name}</List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <p> {post.User.name} {post.User.surname} </p>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <cite>{moment(post.createdAt).format("MMMM DD")} </cite>
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
                        <Image src={post.imageLink} style={style} rounded centered/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Container>
                            <p>{post.text}</p>
                        </Container>
                    </Grid.Column>
                </Grid.Row>

                {!displaySetting.disaplyFull && // gavno
                <Grid.Row columns={2}>
                    <Grid.Column width={6} textAlign='left'>
                        <Label>
                            <Icon name='eye'/> {post.views}
                        </Label>
                    </Grid.Column>

                    <Grid.Column width={6} textAlign='left'>
                        <cite>{moment(post.createdAt).format("MMMM Do YYYY")} </cite>
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

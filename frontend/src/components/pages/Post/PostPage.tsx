import * as React from 'react';
import {connect} from "react-redux";
import postApi from "../../../api/post";
import categoryApi from "../../../api/category";
import {CategoryDTO, PostDTO} from "../../../types";
import {Button, Grid, Icon, Image, List, Segment, GridRow} from "semantic-ui-react";
import PostContainer from "../../containers/PostContainer";
import {SyntheticEvent} from "react";
import {string} from "prop-types";

interface IEventPageState {
    posts: PostDTO[],
    categories: CategoryDTO[],
    postsToRender: PostDTO[],

    filter: {
        categoryFilter: boolean,
        category: CategoryDTO,

    },

    sortPopular: {
        active: boolean,
        direction: string,
    },
    sortDate: {
        active: boolean,
        direction: string,
    },
}

interface IEventPageProps {
    user: any;
}

class PostPage extends React.Component<IEventPageProps, IEventPageState> {
    static propTypes = {};

    constructor(props: IEventPageProps) {
        super(props);

        this.state = {
            posts: [],
            categories: [],

            postsToRender: [],

            filter: {
                categoryFilter: false,
                category: null,
            },

            sortPopular: {
                active: false,
                direction: "",
            },
            sortDate: {
                active: false,
                direction: "",
            },
        }
    }


    componentDidMount = async () => {
        const [postsResponse, categoryResponse] = await Promise.all([postApi.getAllPosts(), categoryApi.getCategories()]);
        this.setState({
            posts: postsResponse.posts,
            postsToRender: postsResponse.posts,
            categories: categoryResponse.categories
        });
    };

    onCategoryClick = async (e: SyntheticEvent, data: any) => {
        const {categories} = this.state;

        await this.setState({
            filter: {
                categoryFilter: true,
                category: categories.find(category => category.categoryId === data.categoryId)
            }
        });

        this.filterAndSort();
    };

    onResetCategoryClick = async (e: SyntheticEvent, data: any) => {
        await this.setState({
            filter: {
                categoryFilter: false,
                category: null
            }
        });

        this.filterAndSort();
    };

    onPopularClick = async (e: SyntheticEvent, data: any) => {
        await this.setState({sortPopular: {active: true, direction: data.name}, sortDate: {active: false, direction: ""}});
        this.filterAndSort();
    };

    onNewClick = async (e: SyntheticEvent, data: any) => {
        await this.setState({sortDate: {active: true, direction: data.name}, sortPopular: {active: false, direction: ""}});
        this.filterAndSort();
    };

    filterAndSort = () => {
        const {posts, filter, sortPopular, sortDate} = this.state;

        let filteredAndSortedPosts: PostDTO[] = [...posts];

        if (filter.categoryFilter) {
            filteredAndSortedPosts = posts.filter(post => post.Category.categoryId === filter.category.categoryId);
        }

        if (sortPopular.active) {
            filteredAndSortedPosts = sortPopular.direction === "asc" ? filteredAndSortedPosts.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1) : filteredAndSortedPosts.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1).reverse()
        } else if (sortDate.active) {
            filteredAndSortedPosts = sortDate.direction === "asc" ? filteredAndSortedPosts.sort((a, b) => a.views - b.views) : filteredAndSortedPosts.sort((a, b) => a.views - b.views).reverse()
        }

        this.setState({postsToRender: filteredAndSortedPosts})
    };

    render() {
        const {postsToRender, categories} = this.state;

        return (
            <Grid>
                <Grid.Column width={3}>
                    <List selection animated verticalAlign='middle' size='huge'>
                        <List.Item>
                            <List.Content verticalAlign='middle' floated="left">
                                <List.Header content={"Popular"}/>
                            </List.Content>
                            <List.Content verticalAlign='middle' floated="right">
                                <Button.Group icon>
                                    <Button name="asc" onClick={this.onPopularClick}>
                                        <Icon name='arrow up'/>
                                    </Button>
                                    <Button name="desc" onClick={this.onPopularClick}>
                                        <Icon name='arrow down'/>
                                    </Button>
                                </Button.Group>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content verticalAlign='middle' floated="left">
                                <List.Header content={"New"}/>
                            </List.Content>
                            <List.Content verticalAlign='middle' floated="right">
                                <Button.Group icon>
                                    <Button name="asc" onClick={this.onNewClick}>
                                        <Icon name='arrow up'/>
                                    </Button>
                                    <Button name="desc" onClick={this.onNewClick}>
                                        <Icon name='arrow down'/>
                                    </Button>
                                </Button.Group>
                            </List.Content>
                        </List.Item>
                    </List>

                    <List selection animated verticalAlign='middle'>
                        <List.Item onClick={this.onResetCategoryClick}>
                            <List.Content>
                                <List.Header content={"All categories"}/>
                            </List.Content>
                        </List.Item>

                        {categories && categories.map(category =>
                            <List.Item key={`category:${category.categoryId}`} onClick={this.onCategoryClick}
                                       categoryId={category.categoryId}>
                                <Image avatar src={category.imageLink}/>
                                <List.Content>
                                    <List.Header content={category.name}/>
                                </List.Content>
                            </List.Item>)}
                    </List>
                </Grid.Column>

                <Grid.Column width={14}>
                    <Grid columns={4} verticalAlign='middle'>
                        {postsToRender && postsToRender.map(post =>
                            <Grid.Column key={`post:${post.postId}`} verticalAlign='middle'>
                                <Segment raised>
                                    <PostContainer displaySetting={{displayFull: false, maxCharacters: 256}}
                                                   post={post}/>
                                </Segment>
                            </Grid.Column>
                        )}
                    </Grid>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(PostPage);

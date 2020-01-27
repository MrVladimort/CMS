import * as React from 'react';
import {connect} from "react-redux";
import postApi from "../../../api/post";
import categoryApi from "../../../api/category";
import {CategoryDTO, PostDTO} from "../../../types";
import {Grid, Image, List, Segment} from "semantic-ui-react";
import PostContainer from "../../containers/PostContainer";
import {SyntheticEvent} from "react";

interface IEventPageState {
    posts: PostDTO[],
    categories: CategoryDTO[],
    postsToRender: PostDTO[],

    filter: {
        categoryFilter: boolean,
        category: CategoryDTO,

    },

    sort: {
        popular: {
            active: boolean,
            inverse: boolean
        },
        date: {
            active: boolean,
            inverse: boolean
        },
    }
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

            sort: {
                popular: {
                    active: false,
                    inverse: false
                },
                date: {
                    active: false,
                    inverse: false
                },
            }
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

    onPopularClick = () => {
        const {sort} = this.state;
        this.setState({sort: {...sort, popular: {...sort.popular, active: !sort.popular.active}}});
        this.filterAndSort();
    };

    onNewClick = () => {
        const {sort} = this.state;
        this.setState({sort: {...sort, date: {...sort.date, active: !sort.date.active}}});
        this.filterAndSort();
    };

    filterAndSort = () => {
        const {posts, filter, sort} = this.state;

        let filteredAndSortedPosts: PostDTO[] = [...posts];

        if (filter.categoryFilter) {
            filteredAndSortedPosts = posts.filter(post => post.Category.categoryId === filter.category.categoryId);
        }

        if (sort.popular.active && sort.date.active) {
            filteredAndSortedPosts = filteredAndSortedPosts.sort((a, b) => a.views - b.views || (a.createdAt > b.createdAt ? 1 : -1))
        } else if (sort.popular.active) {
            filteredAndSortedPosts = filteredAndSortedPosts.sort((a, b) => a.views - b.views)
        } else if (sort.date.active) {
            filteredAndSortedPosts = filteredAndSortedPosts.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
        }

        this.setState({postsToRender: filteredAndSortedPosts})
    };

    render() {
        const {postsToRender, categories} = this.state;

        return (
            <Grid>
                <Grid.Column width={2}>
                    <List selection animated verticalAlign='middle' size='huge'>
                        <List.Item active>
                            <List.Content>
                                <List.Header content={"Popular"}/>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header content={"New"}/>
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
                            <List.Item onClick={this.onCategoryClick} categoryId={category.categoryId}>
                                <Image avatar src={category.imageLink}/>
                                <List.Content>
                                    <List.Header content={category.name}/>
                                </List.Content>
                            </List.Item>)}
                    </List>
                </Grid.Column>

                <Grid.Column width={14}>
                    <Grid columns={4} divided>
                        <Grid.Row>
                            {postsToRender && postsToRender.map(post =>
                                <Grid.Column stretched>
                                    <Segment raised>
                                        <PostContainer displaySetting={{displayFull: false, maxCharacters: 256}}
                                                       post={post} key={`post:${post.postId}`}/>
                                    </Segment>
                                </Grid.Column>
                            )}
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(PostPage);

import React, {Component, SyntheticEvent} from 'react';
import {Menu, Button, Container, Image, Input, Icon, Dropdown, Search} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import mainConfig from "../config";
import authActions from "../redux/actions/auth";
import searchApi from "../api/search"
import {PostDTO} from "../types";

interface IHeaderState {
    activeItem: string
    search: {
        results: any[],
        value: string,
        isLoading: boolean
    }
}

interface IHeaderProps {
    isAuth: boolean,
    user: {
        name: string,
        surname: string
    },

    history: {
        push: Function
    },
    dispatch: Function,
    logout: Function
}

class Header extends Component<IHeaderProps, IHeaderState> {
    static propTypes: any;

    constructor(props: IHeaderProps) {
        super(props);

        this.state = {
            activeItem: "",
            search: {
                results: [],
                value: "",
                isLoading: false
            }
        };
    }

    onResultSelect = (event: SyntheticEvent, {result}: any) => {
        const {history} = this.props;
        history.push(`/post/exact?postId=${result.postId}`)
    };

    onSearchChange = async (event: SyntheticEvent, {value}: any) => {
        this.setState({
            search: {
                ...this.state.search,
                isLoading: true,
                value
            }
        });

        if (value.length >= 3) {
            const searchResultResponse = await searchApi.searchPosts(value),
                searchResults = searchResultResponse.posts.map(post => ({
                    title: post.title,
                    image: post.imageLink,
                    postId: post.postId
                }));

            this.setState({
                search: {
                    ...this.state.search,
                    isLoading: false,
                    results: searchResults
                }
            })
        }
    };

    onLogoutClick = (event: SyntheticEvent, {value}: any) => {
        const {logout, history, dispatch} = this.props;
        logout(dispatch);
        history.push(value);
    };

    getAuthButtons = () => {
        const {isAuth, user} = this.props;

        const options = [
                {key: 'profile', text: 'Your Profile', value: '/user'},
                {key: 'sign-out', text: 'Logout', value: '/'},
            ],
            trigger = (<span> <Icon name='user'/> Hello, {user.name} </span>);

        return (
            <div>
                {!isAuth && <Menu.Menu position='right'>
                    <Link to='/login'>
                        <Menu.Item>
                            <Button primary>Login</Button>
                        </Menu.Item>
                    </Link>
                    <Link to='/register'>
                        <Menu.Item>
                            <Button secondary>Register</Button>
                        </Menu.Item>
                    </Link>
                </Menu.Menu>}

                {isAuth && <Menu.Menu position='right'>

                    <Link to='/post/add'>
                        <Menu.Item>
                            <Button fluid color={"green"}>Add post</Button>
                        </Menu.Item>
                    </Link>

                    <Menu.Item>
                        <Dropdown trigger={trigger}>
                            <Dropdown.Menu>

                                    <Dropdown.Item content="Your profile" onClick={() => this.props.history.push("/user")}/>

                                <Dropdown.Item content="Log Out" onClick={this.onLogoutClick}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Menu.Menu>}
            </div>
        );
    };

    render() {
        const {search} = this.state;

        return (
            <div className='header'>
                <Menu fluid compact size='massive' borderless fixed='top' inverted>
                    <Menu.Item>
                        <Link to={'/'}>
                            <Image size='mini' src='https://logoeps.com/wp-content/uploads/2012/10/snoopy-vector.png'/>
                        </Link>
                    </Menu.Item>

                    <Menu.Item><Link to={'/posts'}>Posts</Link></Menu.Item>

                    <Menu.Item>
                        <Search
                            loading={search.isLoading}
                            onResultSelect={this.onResultSelect}
                            onSearchChange={this.onSearchChange}
                            results={search.results}
                            value={search.value}
                        />
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        {this.getAuthButtons()}
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,

    isAuth: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }),
};

const mapStateToProps = (state: any) => ({
    user: state.user,
    isAuth: !!state.auth.tokens,
});

const mapDispatchToProps = {
    logout: authActions.logout
};

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    isAuth: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string
    }),
    logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

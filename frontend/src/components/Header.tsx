import React, {Component, SyntheticEvent} from 'react';
import {Menu, Button, Container, Image, Input, Icon, Dropdown} from 'semantic-ui-react';
import PropTypes, {object} from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import mainConfig from "../config";
import authActions from "../redux/actions/auth";

interface IHeaderState {
    activeItem: string
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
            activeItem: ""
        };
    }

    clickLogout = () => {
        const {logout, history, dispatch} = this.props;
        logout(dispatch);
        history.push('/');
    };

    // @ts-ignore
    onUserDropdownChange = (event: SyntheticEvent, data: any) => {
        console.log(data.value);
        const {logout, history, dispatch} = this.props;
        if (data.value === '/') { logout(dispatch); }
        history.push(data.value);
    };

    getAuthButtons = () => {
        const {isAuth, user} = this.props;

        const options = [
            {key: 'profile', text: 'Your Profile', value: '/user'},
            {key: 'sign-out', text: 'Logout', value: '/'},
            ],
            trigger = ( <span> <Icon name='user' /> Hello, {user.name} </span> );

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
                            <Button fluid color={"green"} >Add post</Button>
                        </Menu.Item>
                    </Link>

                    <Menu.Item>
                        <Dropdown trigger={trigger} options={options} onChange={this.onUserDropdownChange}/>
                    </Menu.Item>
                </Menu.Menu>}
            </div>
        );
    };

    render() {
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
                        <Input icon='search' placeholder='Search post...' />
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

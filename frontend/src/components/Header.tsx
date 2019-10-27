import React, {Component} from 'react';
import {Menu, Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
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

    getAuthButtons = () => {
        const {isAuth, user} = this.props;

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

                    <Link to='/user'>
                        <Menu.Item>
                            <Button>
                                {`Hello, ${user.name} ${user.surname}`}
                            </Button>
                        </Menu.Item>
                    </Link>
                    <Menu.Item>
                        <Button onClick={this.clickLogout} primary>Logout</Button>
                    </Menu.Item>
                </Menu.Menu>}
            </div>
        );
    };

    render() {
        return (
            <div className='header'>
                <Menu fluid compact size='massive' borderless fixed='top'>
                    <Menu.Item>
                        <img src='https://donejs.com/static/img/react-logo.png'/>
                    </Menu.Item>

                    <Menu.Item><Link to={'/'}>Home</Link></Menu.Item>
                    <Menu.Item><Link to={'/my-page'}>My page</Link></Menu.Item>
                    <Menu.Item><Link to={'/posts'}>Posts</Link></Menu.Item>

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

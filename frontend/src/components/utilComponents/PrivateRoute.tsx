import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

interface IPrivateRouteProps {
    component: any;
    user: any;
    path: string;
    exact: boolean;
}

class PrivateRoute extends Component<IPrivateRouteProps> {

    render() {
        const {component: Component, user, ...rest} = this.props;
        return (<Route {...rest} render={props => (
            localStorage.getItem('CMS_pro')
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )}/>)
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(PrivateRoute);

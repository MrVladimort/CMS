import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

interface IAdminRouteProps {
    component: any;
    user: any;
    path: string;
    exact: boolean;
}

class AdminRoute extends Component<IAdminRouteProps> {

    render() {
        const { component: Component, user, ...rest } = this.props;
        return (
            <Route {...rest} render={(props: any) => (
                user.userType === 2
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/'}} />
            )} />
        );
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(AdminRoute);

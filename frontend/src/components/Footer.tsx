import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class Footer extends Component {
    static propTypes = {};

    render() {
        return (<div className='footer'>
            <Menu size='small' stackable borderless className='footer'/>
        </div>);
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(Footer);

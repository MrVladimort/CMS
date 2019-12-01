import React, {Component} from 'react';
import {Dimmer, Image, Segment, Loader} from "semantic-ui-react";

class SegmentLoader extends Component {
    render() {
        return (
            <Segment>
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
        );
    }
}

export default SegmentLoader;

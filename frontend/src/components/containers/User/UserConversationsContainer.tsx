import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ConversationDTO, MessageDTO, UserDTO} from "../../../types"
import {Container, Grid, Segment, Header} from "semantic-ui-react";
import config from "../../../config";

interface IUserConversationContainerProps {
    user: UserDTO
}

interface IUserConversationContainerState {
    conversations: Array<ConversationDTO>,
    currentConversation: ConversationDTO,
    messages: Array<MessageDTO>,
}

interface ISocketData {
    message: MessageDTO
}


class UserConversationContainer extends Component<IUserConversationContainerProps, IUserConversationContainerState> {
    static propTypes = {};

    constructor(props: IUserConversationContainerProps) {
        super(props);

        this.state = {
            conversations: [],
            currentConversation: null,
            messages: []
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container text>

            </Container>
        );
    }
}

UserConversationContainer.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string,
        email: PropTypes.string
    })
};


export default UserConversationContainer;

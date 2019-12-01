import React, {Component} from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";
import {ConversationDTO, MessageDTO, UserDTO} from "../../../types"
import {Container, Grid, Segment, Header} from "semantic-ui-react";
import config from "../../../config";

const socket = socketIOClient(config.serverHost);

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

        //Very simply connect to the socket
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("conversation.message", (data: ISocketData) => {
            const {messages} = this.state;
            messages.push(data.message);
            this.setState({messages})
        });
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

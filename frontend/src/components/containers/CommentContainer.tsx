import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Comment, Icon, Segment, Button} from "semantic-ui-react";
import moment from "moment";
import {Link} from "react-router-dom";
import {CommentDTO, UserDTO} from "../../types";

interface ICommentProps {
    comment: CommentDTO,
    user: UserDTO,
    displayFull: boolean
}

class CommentContainer extends Component<ICommentProps> {
    static propTypes: any;

    render() {
        const {comment, user, displayFull} = this.props;
        let {Post: post, User: commentUser, text, grade, createdAt} = comment;

        if (!displayFull && text.length > 500) {
            text = text.substr(0, 100) + "...";
        }

        return (
            <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg'/>
                <Comment.Content>
                    <Link to={`/users?userId=${commentUser.userId}`}>
                        <Comment.Author as='a'>{`${commentUser.name} ${commentUser.surname}`}</Comment.Author>
                    </Link>
                    <Comment.Metadata>
                        <div>{moment(createdAt).fromNow()}</div>
                        <div>
                            <Icon name='star'/>{grade} Grade
                        </div>
                    </Comment.Metadata>
                    <Comment.Text>{text}</Comment.Text>
                    {(user && (user.userId === commentUser.userId || user.userType === 2)) &&
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                        <Link to={`/comment/edit?commentId=${comment.commentId}`}>
                            <Comment.Action>Edit</Comment.Action>
                        </Link>
                        <Link to={`/comment/delete?commentId=${comment.commentId}`}>
                            <Comment.Action>Delete</Comment.Action>
                        </Link>
                    </Comment.Actions>}
                </Comment.Content>
            </Comment>
        )
    }
}


CommentContainer.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default CommentContainer;

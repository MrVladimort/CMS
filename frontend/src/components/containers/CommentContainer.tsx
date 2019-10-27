import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Comment, Icon, Segment} from "semantic-ui-react";
import moment from "moment";
import {Link} from "react-router-dom";

interface ICommentProps {
    comment: any,
    user: any,
}

class CommentContainer extends Component<ICommentProps> {
    static propTypes: any;

    render() {
        const {comment, user} = this.props;
        const {Post: post, User: commentUser, text, grade, createdAt} = comment;

        return (
            <Segment raised>
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg'/>
                    <Comment.Content>
                        <Comment.Author as='a'>{`${user.name} ${user.surname}`}</Comment.Author>
                        <Comment.Metadata>
                            <div>{post.name}</div>
                            <div><Icon name='star'/>{grade} Faves</div>
                            <div>{moment(createdAt).fromNow()}</div>
                        </Comment.Metadata>
                        <Comment.Text>{text}</Comment.Text>

                        {(user.userType && (user.userId === commentUser.userId || user.userType === 2)) &&
                        <Comment.Actions>
                            <Link to={`/comment/edit?commentId=${comment.id}`}>
                                Edit
                            </Link>
                            <Link to={`/comment/delete?commentId=${comment.id}`}>
                                Delete
                            </Link>
                        </Comment.Actions>}
                    </Comment.Content>
                </Comment>
            </Segment>
        )
    }
}


CommentContainer.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default CommentContainer;

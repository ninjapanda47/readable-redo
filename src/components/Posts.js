import React, { Component } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions/postActions'
import { fetchComments, setCurrentComment, deleteComment } from '../actions/commentActions'
import { Container, Row } from 'react-bootstrap';
import Comments from './Comments'

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
        this.setShowModal = this.setShowModal.bind(this);
    }

    componentDidUpdate(nextProps) {
        if (nextProps.comments !== this.props.comments) {
            this.setState({ showModal: true })
        }
    }

    deletePost(id) {
        this.props.deletePost(id)
    }

    getCommentsById(id) {
        this.props.fetchComments(id)
        this.props.setCurrentComment(id)
    }

    addComment() {
        this.props.history.push('/addComment')
    }

    deleteComment(id) {
        this.props.deleteComment(id)
    }

    setShowModal(state) {
        this.setState({ showModal: state })
    }

    render() {

        const CommentModal = (props) => {
            return (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className="d-block">
                        <Modal.Title id="contained-modal-title-vcenter" className="center">
                            Comments
                  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Comments comments={this.props.comments} deleteComment={id => {
                            this.deleteComment(id);
                        }} />
                    </Modal.Body>
                    <Modal.Footer className="d-block center">
                        <Button className="gray" onClick={props.onHide}>Close</Button>
                        <Button variant="info" onClick={e => this.addComment(props, this.state.currentPostId)}>Add A comment</Button>
                    </Modal.Footer>
                </Modal>
            );
        }

        const cards = this.props.posts.map(post => (
            <div key={post.id} className="m-2">
                <Card style={{ width: '18rem' }} className="center">
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">By: {post.author}</Card.Subtitle>
                        <Card.Text>
                            {post.body}
                        </Card.Text>
                        <Button variant="primary" className="m-1 btn-sm">Edit</Button>
                        <Button variant="secondary" className="m-1 btn-sm" onClick={e => this.deletePost(post.id)}>Delete</Button>
                        <br></br>
                        <h5><Badge className="mt-2 gray" onClick={e => this.getCommentsById(post.id)}>{post.commentCount} Comments</Badge></h5>
                    </Card.Body>
                </Card>
            </div>
        ))
        return (
            <Container fluid className="m-0">
                <Row className="m-2">
                    {cards}
                </Row>
                <CommentModal show={this.state.showModal}
                    history={this.props.history}
                    onHide={() => this.setShowModal(false)} />
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    comments: state.comments.items,
    comment: state.comments.item
})

export default connect(mapStateToProps, { fetchPosts, deletePost, fetchComments, setCurrentComment, deleteComment })(Posts)
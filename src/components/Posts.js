import React, { Component } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPosts, deletePost, setCurrentPost, decreaseCommentCount, updateVote } from '../actions/postActions'
import { fetchComments, setCurrentComment, deleteComment } from '../actions/commentActions'
import { Container, Row } from 'react-bootstrap';
import Comments from './Comments'

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.setShowModal = this.setShowModal.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comments !== this.props.comments) {
            this.setState({ showModal: true })
        }
    }

    deletePost(id) {
        this.props.deletePost(id)
    }

    editPost(id) {
        this.props.setCurrentPost(id)
        this.props.history.push('/editPost')
    }

    getPost(id, category) {
        this.props.setCurrentPost(id)
        this.props.history.push("/category/" + category + "/" + id);
    }

    getCommentsById(id) {
        this.props.fetchComments(id)
        this.props.setCurrentPost(id)
    }

    addComment() {
        this.props.history.push('/addComment')
    }

    deleteComment(id) {
        this.props.deleteComment(id)
        this.props.decreaseCommentCount(this.props.post.id)
    }

    editComment(id) {
        this.props.setCurrentComment(id)
        this.props.history.push('/editComment')
    }

    setShowModal(state) {
        this.setState({ showModal: state })
    }

    updateVote(id, vote) {
        this.props.updateVote(id, vote)
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
                            this.deleteComment(id)
                        }} editComment={id => { this.editComment(id) }} />
                    </Modal.Body>
                    <Modal.Footer className="d-block center">
                        <Button className="gray" onClick={props.onHide}>Close</Button>
                        <Button variant="info" onClick={e => this.addComment(props, this.state.currentPostId)}>Add A comment</Button>
                    </Modal.Footer>
                </Modal>
            );
        }
        const maxLength = 200
        const cards = this.props.posts.map(post => (
            <div key={post.id} className="m-2">
                <Card style={{ width: '24rem', height: '20rem' }} className="center mb-2">
                    <Card.Body>
                        <Card.Title style={{ height: '3rem' }}>{post.title}</Card.Title>
                        <Card.Subtitle style={{ height: '2rem' }} className=" text-muted">By: {post.author}</Card.Subtitle>
                        {
                            post.body.length > maxLength ? (<Card.Text style={{ height: '7rem' }}>{`${post.body.substring(0, maxLength)}...`}</Card.Text>) : <Card.Text style={{ height: '7rem' }}>
                                {post.body}
                            </Card.Text>
                        }

                        <h5><Badge className="mt-2 mr-2 gray" onClick={e => this.getCommentsById(post.id)}>{post.commentCount} Comments</Badge>
                            <Badge className="mt-2" variant="info"><i className="fa fa-thumbs-up mr-2" onClick={e => this.updateVote(post.id, "upVote")}></i>{post.voteScore}  Votes  <i className="fa fa-thumbs-down ml-2" onClick={e => this.updateVote(post.id, "downVote")}></i></Badge></h5>
                        <Button variant="btn btn-outline-info" className="mr-2 btn-sm" onClick={e => this.getPost(post.id, post.category)}>Detail View</Button>
                        <Button variant="primary" className="mr-2 btn-sm" onClick={e => this.editPost(post.id)}>Edit</Button>
                        <Button variant="secondary" className="mr-2 btn-sm" onClick={e => this.deletePost(post.id)}>Delete</Button>
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
    post: state.posts.item,
    comments: state.comments.items,
    comment: state.comments.item
})

export default connect(mapStateToProps, { fetchPosts, deletePost, fetchComments, setCurrentComment, deleteComment, setCurrentPost, decreaseCommentCount, updateVote })(Posts)
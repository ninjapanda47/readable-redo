import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions/postActions'
import { Container, Row } from 'react-bootstrap';

class Comment extends Component {
    render() {
        const cards = this.props.comments.map(comment => (
            <div key={post.id} className="m-2">
                <Card style={{ width: '18rem' }} className="center">
                    <Card.Body>
                        <Card.Title>{comment.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">By: {comment.author}</Card.Subtitle>
                        <Card.Text>
                            {comment.body}
                        </Card.Text>
                        <Button variant="primary" className="m-1 btn-sm">Edit</Button>
                        <Button variant="secondary" className="m-1 btn-sm" onClick={e => this.deletePost(post.id)}>Delete</Button>
                        <br></br>
                        <a href="#" className="card-link">Comments</a>
                    </Card.Body>
                </Card>
            </div>
        ))
        return (
            <Container fluid className="m-0">
                <Row className="m-2">
                    {cards}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.comments.items
})

export default connect(mapStateToProps, { fetchPosts, deletePost })(Comments)
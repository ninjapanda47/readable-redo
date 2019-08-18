import React, { Component } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions/postActions'
import { Container, Row } from 'react-bootstrap';

class Posts extends Component {

    deletePost(id) {
        this.props.deletePost(id)
    }

    getCommentsById(id) {
        console.log('check id', id)
        // this.props.getCommentsById(id)
    }

    render() {
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
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts, deletePost })(Posts)
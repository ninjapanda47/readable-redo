import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions'
import { Container, Row } from 'react-bootstrap';

class Posts extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const cards = this.props.posts.map(post => (
            <div key={post.id} className="m-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">By: {post.author}</Card.Subtitle>
                        <Card.Text>
                            {post.body}
                        </Card.Text>
                        <Button variant="primary" className="m-1 btn-sm">Edit</Button>
                        <Button variant="secondary" className="m-1 btn-sm">Delete</Button>
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
    posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(Posts)
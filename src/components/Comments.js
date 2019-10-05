import React, { Component } from 'react'
import { Container, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class Comments extends Component {
    render() {
        const maxLength = 200
        const cards = this.props.comments.map(comment => (
            <div key={comment.id} className="m-2">
                <Card className="center">
                    <Card.Body>
                        <Card.Title>{comment.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">By: {comment.author}</Card.Subtitle>
                        {
                            comment.body.length > maxLength ? (<Card.Text style={{ height: '7rem' }}>{`${comment.body.substring(0, maxLength)}...`}</Card.Text>) : <Card.Text style={{ height: '7rem' }}>
                                {comment.body}
                            </Card.Text>
                        }
                        <Button variant="primary" className="m-1 btn-sm" onClick={() => {
                            this.props.editComment(comment.id);
                        }}>Edit</Button>
                        <Button variant="secondary" className="m-1 btn-sm" onClick={() => {
                            this.props.deleteComment(comment.id);
                        }}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        ))
        return (
            <Container fluid className="m-0">
                {cards}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.comments.items
})

export default connect(mapStateToProps)(Comments)
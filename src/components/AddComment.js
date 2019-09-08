import React, { Component } from 'react'
import { Form, Button, Row, Container, Card } from 'react-bootstrap';
import { addComment } from '../actions/commentActions'
import { connect } from 'react-redux';
const uuidv4 = require("uuid/v4");

class AddComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            body: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let value = event.target.value
        let name = event.target.id
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const comment = this.state;
        comment.timestamp = Date.now();
        comment.id = uuidv4();
        comment.parentId = this.props.comment;
        this.props.addComment(comment);
        this.props.history.push("/")
    }

    render() {

        return (

            <Container fluid className="m-0">
                <Row className="mt-5">
                    <Card style={{ width: '75%' }} className="m-auto">
                        <Card.Body>
                            <Card.Title className="center">Add Comment</Card.Title>
                            <Form style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                                <Form.Group controlId="author" value={this.state.author} onChange={this.handleChange}>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" placeholder="Author" />
                                </Form.Group>
                                <Form.Group controlId="body" value={this.state.body} onChange={this.handleChange}>
                                    <Form.Label>Post</Form.Label>
                                    <Form.Control as="textarea" rows="5" placeholder="Write your post" />
                                </Form.Group>
                                <div className="col text-center">
                                    <Button variant="primary" type="submit">
                                        Submit
                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = state => ({
    comment: state.comments.item
})

export default connect(mapStateToProps, { addComment })(AddComment)
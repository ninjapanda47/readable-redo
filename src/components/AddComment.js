import React, { Component } from 'react'
import { Form, Button, Row, Container, Card } from 'react-bootstrap';
import { addComment } from '../actions/commentActions'
import { increaseCommentCount } from '../actions/postActions'
import { connect } from 'react-redux';
const uuidv4 = require("uuid/v4");

class AddComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            body: '',
            validated: false,
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
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true })
        } else {
            const comment = {
                author: this.state.author,
                body: this.state.body
            };
            comment.timestamp = Date.now();
            comment.id = uuidv4();
            comment.parentId = this.props.post.id;
            this.props.addComment(comment);
            this.props.increaseCommentCount(this.props.post.id)
            this.props.history.push("/")

        }
    }

    render() {

        return (

            <Container fluid className="m-0">
                <Row className="mt-5">
                    <Card style={{ width: '75%' }} className="m-auto">
                        <Card.Body>
                            <Card.Title className="center">Add Comment</Card.Title>
                            <Form noValidate validated={this.state.validated} style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                                <Form.Group controlId="author" value={this.state.author} onChange={this.handleChange}>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" placeholder="Author" required />
                                    <Form.Control.Feedback type="invalid">
                                        Author is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="body" value={this.state.body} onChange={this.handleChange}>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as="textarea" rows="5" placeholder="Write your comment" required />
                                    <Form.Control.Feedback type="invalid">
                                        Body text is required.
                                    </Form.Control.Feedback>
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
    comment: state.comments.item,
    post: state.posts.item
})

export default connect(mapStateToProps, { addComment, increaseCommentCount })(AddComment)
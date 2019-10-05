import React, { Component } from 'react'
import { Form, Button, Row, Container, Card } from 'react-bootstrap';
import { addPost, updatePost, fetchPosts } from '../actions/postActions'
import { connect } from 'react-redux';

class EditPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            category: '',
            body: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.post !== this.props.post) {
            this.setState({
                title: this.props.post.title,
                author: this.props.post.author,
                category: this.props.post.category,
                body: this.props.post.body
            });
        }
    }

    handleChange(event) {
        let value = event.target.value
        let name = event.target.id
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const post = this.state
        post.timestamp = Date.now();
        let id = this.props.post.id
        this.props.updatePost(id, post)
        this.props.history.goBack()
    }

    cancel() {
        this.props.history.goBack()
    }

    render() {

        return (

            <Container fluid className="m-0">
                <Row className="mt-5">
                    <Card style={{ width: '75%' }} className="m-auto">
                        <Card.Body>
                            <Card.Title className="center">Edit Post</Card.Title>
                            <Form style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                                <Form.Group controlId="title" >
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" value={this.state.title} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="author" >
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" readOnly value={this.state.author} />
                                </Form.Group>
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" readOnly value={this.state.category} />
                                </Form.Group>
                                <Form.Group controlId="body" >
                                    <Form.Label>Post</Form.Label>
                                    <Form.Control as="textarea" rows="5" value={this.state.body} onChange={this.handleChange} />
                                </Form.Group>
                                <div className="col text-center">
                                    <Button variant="primary" type="submit">
                                        Submit
                    </Button>
                                    <Button variant="secondary" className="m-1" onClick={e => this.cancel()} >
                                        Cancel
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
    post: state.posts.item,
    posts: state.posts.items
})

export default connect(mapStateToProps, { addPost, updatePost, fetchPosts })(EditPost)
import React, { Component } from 'react'
import { Form, Button, Row, Container, Card } from 'react-bootstrap';
import { fetchCategories } from '../actions/categoryActions'
import { addPost, fetchPosts } from '../actions/postActions'
import { connect } from 'react-redux';
const uuidv4 = require("uuid/v4");

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            category: '',
            body: '',
            validated: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.fetchCategories();
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
            const post = {
                title: this.state.title,
                author: this.state.author,
                category: this.state.category,
                body: this.state.body
            }
            post.timestamp = Date.now();
            post.id = uuidv4();
            this.props.addPost(post)
            this.props.fetchPosts()
            this.props.history.push("/")
        }

    }

    render() {

        const categories = this.props.categories.map(category => (<option key={category.name} value={category.name}>{category.name}</option>))
        return (

            <Container fluid className="m-0">
                <Row className="mt-5">
                    <Card style={{ width: '75%' }} className="m-auto">
                        <Card.Body>
                            <Card.Title className="center">Add Post</Card.Title>
                            <Form noValidate validated={this.state.validated} style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                                <Form.Group controlId="title" value={this.state.title} onChange={this.handleChange}>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Title" required />
                                    <Form.Control.Feedback type="invalid">
                                        Title is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="author" value={this.state.author} onChange={this.handleChange}>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" placeholder="Author" required />
                                    <Form.Control.Feedback type="invalid">
                                        Author is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="category" onChange={this.handleChange}>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control required as="select">
                                        <option value="">Select Category</option>
                                        {categories}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Category is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="body" value={this.state.body} onChange={this.handleChange}>
                                    <Form.Label>Post</Form.Label>
                                    <Form.Control as="textarea" rows="5" placeholder="Write your post" required />
                                    <Form.Control.Feedback type="invalid">
                                        Post is required.
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
    categories: state.categories.items,
    post: state.posts.item
})

export default connect(mapStateToProps, { fetchCategories, addPost, fetchPosts })(AddPost)
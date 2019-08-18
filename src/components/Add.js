import React, { Component } from 'react'
import { Form, Button, Row, Container, Card } from 'react-bootstrap';
import { fetchCategories } from '../actions/categoryActions'
import { addPost } from '../actions/postActions'
import { connect } from 'react-redux';
const uuidv4 = require("uuid/v4");

class Add extends Component {

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
        const post = this.state
        post.timestamp = Date.now();
        post.id = uuidv4();
        this.props.addPost(post)
        this.props.history.push("/")
    }

    render() {

        const categories = this.props.categories.map(category => (<option key={category.name} value={category.name}>{category.name}</option>))
        return (

            <Container fluid className="m-0">
                <Row className="mt-5">
                    <Card style={{ width: '75%' }} className="m-auto">
                        <Card.Body>
                            <Card.Title className="center">Add Post</Card.Title>
                            <Form style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                                <Form.Group controlId="title" value={this.state.title} onChange={this.handleChange}>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Title" />
                                </Form.Group>
                                <Form.Group controlId="author" value={this.state.author} onChange={this.handleChange}>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" placeholder="Author" />
                                </Form.Group>
                                <Form.Group controlId="category" onChange={this.handleChange}>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as="select">
                                        <option>Select Category</option>
                                        {categories}
                                    </Form.Control>
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
    categories: state.categories.items,
    post: state.posts.item
})

export default connect(mapStateToProps, { fetchCategories, addPost })(Add)
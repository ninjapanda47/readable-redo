import React, { Component } from 'react'
import { Form, Button, Row, Container, Card } from 'react-bootstrap';
import { updateComment } from '../actions/commentActions'
import { connect } from 'react-redux';

class EditComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            body: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comment !== this.props.comment) {
            this.setState({
                author: this.props.comment.author,
                body: this.props.comment.body
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
        const comment = this.state;
        comment.timestamp = Date.now();
        comment.parentId = this.props.comment.parentId;
        let id = this.props.comment.id
        this.props.updateComment(id, comment)
        this.props.history.goBack()
    }

    render() {

        return (

            <Container fluid className="m-0">
                <Row className="mt-5">
                    <Card style={{ width: '75%' }} className="m-auto">
                        <Card.Body>
                            <Card.Title className="center">Edit Comment</Card.Title>
                            <Form style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                                <Form.Group controlId="author" >
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" placeholder="Author" readOnly value={this.state.author} />
                                </Form.Group>
                                <Form.Group controlId="body" >
                                    <Form.Label>Post</Form.Label>
                                    <Form.Control as="textarea" rows="5" value={this.state.body} onChange={this.handleChange} />
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

export default connect(mapStateToProps, { updateComment })(EditComment)
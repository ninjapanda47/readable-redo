import React, { Component } from 'react';
import { Navbar, Nav, Button, Dropdown, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCategories, selectCategory } from '../actions/categoryActions'
import { fetchPosts, sortBy } from '../actions/postActions'
import { NavLink } from "react-router-dom"

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    selectCategory(category) {
        this.props.selectCategory(category)
    }

    getAll() {
        this.props.fetchPosts()
    }

    sortPosts(e) {
        this.props.sortBy(e)
        console.log(this.props.posts)
    }

    render() {

        const categories = this.props.categories.map(category => (<NavLink className="nav-link" to={`/category/${category.name}`} key={category.name} onClick={e => this.selectCategory(category.name)}>{category.name}</NavLink>))
        return (
            <div>
                <Navbar expand="lg" className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <NavLink to="/" onClick={e => this.getAll()}>
                        <Navbar.Brand>Readable</Navbar.Brand>
                    </NavLink>
                    <Nav.Item>
                        <NavLink to="/addPost">
                            <Button variant="secondary" className="ml-2">New Post</Button>
                        </NavLink>
                    </Nav.Item>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="justify-content-end">
                            {categories}
                            <Dropdown as={NavItem} id="dropdown-menu-align-right" alignRight onSelect={e => this.sortPosts(e)}>
                                <Dropdown.Toggle>Sort by...</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="vote">Vote Score</Dropdown.Item>
                                    <Dropdown.Item eventKey="timestamp">Timestamp</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.items,
    posts: state.posts.items
})

export default connect(mapStateToProps, { fetchCategories, selectCategory, fetchPosts, sortBy })(NavBar)
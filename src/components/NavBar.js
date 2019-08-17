import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCategories, selectCategory } from '../actions/categoryActions'
import { fetchPosts } from '../actions/postActions'
import { NavLink } from "react-router-dom"

class NavBar extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    selectCategory(category) {
        this.props.selectCategory(category)
    }

    getAll() {
        this.props.fetchPosts()
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
                            <NavDropdown title="Sort By" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Vote</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Time Stamp</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.items
})

export default connect(mapStateToProps, { fetchCategories, selectCategory,fetchPosts })(NavBar)
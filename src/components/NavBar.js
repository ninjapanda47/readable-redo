import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCategories, selectCategory } from '../actions/categoryActions'

class NavBar extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    selectCategory(category) {
        this.props.selectCategory(category)
        console.log('clicked', category)
    }

    render() {

        const categories = this.props.categories.map(category => (<Nav.Link key={category.name} href="#link" onClick={e => this.selectCategory(category.name)}>{category.name}</Nav.Link>))
        return (
            <div>
                <Navbar expand="lg" className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Navbar.Brand href="#home">Readable</Navbar.Brand>
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

export default connect(mapStateToProps, { fetchCategories, selectCategory })(NavBar)
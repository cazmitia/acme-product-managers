import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getProducts, getManagers } from './store'
import { findProductManagers } from './util.js'

class Navbar extends Component {
    componentDidMount() {
        Promise.all([this.props.getAllProducts(), this.props.getAllManagers()])
    }

    render() {
        const productManagers = findProductManagers(this.props.products, this.props.managers)
        const links = [
            { name: 'home', to: '/' },
            { name: 'Products', to: '/products' },
            { name: 'Managers', to: '/managers' }
        ]
        return (
            <nav>
                <ul className="nav nav-pills">
                    {links.map(link => (
                        <li key={link.name}>
                            <NavLink className="nav-link" activeClassName="nav-link active" exact to={link.to}>
                                {link.name} {link.name === 'Managers' ? `(${productManagers.length})` : null}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state) => (
    {
        managers: state.managers,
        products: state.products
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        getAllProducts: () => dispatch(getProducts()),
        getAllManagers: () => dispatch(getManagers())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

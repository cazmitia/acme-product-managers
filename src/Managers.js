import React from 'react'
import { connect } from 'react-redux'
import { findProductManagers } from './util.js'

const Managers = (props) => {
    const productManagers = findProductManagers(props.products, props.managers)
    return (
        <div>
            <h3>Our Managers!</h3>
            <ul>
                {productManagers.map(manager => <li key={manager.id}>{manager.name}</li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        managers: state.managers,
        products: state.products
    }
)

export default connect(mapStateToProps)(Managers)

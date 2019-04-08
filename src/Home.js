import React from 'react'
import { connect } from 'react-redux'

const Home = (props) => {
    const openings = props.products.some(product => product.managerId === null)
    return (
        <h3>We {openings ? '' : 'DONT'} HAVE openings for Product Managers!</h3>
    )
}

const mapStateToProps = (state) => ({ products: state.products })

export default connect(mapStateToProps)(Home)

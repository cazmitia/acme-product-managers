import React from 'react'
import ProductContainer from './ProductContainer'
import { connect } from 'react-redux';

const Products = (props) => {
        return (
            <div>
            <h1> Our Products! </h1>
            <ul className="list-group">
                {props.products.map((product => <ProductContainer key={product.id} product={product} />))}
            </ul>
            </div>
        )
}

const mapStateToProps = (state) => ({ products: state.products })

export default connect(mapStateToProps)(Products)

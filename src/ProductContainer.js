import React, { Component } from 'react'
import { updateProduct } from './store'
import { connect } from 'react-redux'

class ProductContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productManager: props.product.managerId || 0,
            error: ''
        }
    }

    changeHandler = (evt) => {
        this.setState({ productManager: evt.target.value })
    }

    submitHandler = (evt) => {
        evt.preventDefault()
        this.props.updateProduct(this.props.product.id, this.state.productManager * 1 === 0 ? null : this.state.productManager)
        .then(() => this.setState({error: ''}))
        .catch(e => this.setState({error: e}))
    }

    render() {
        const newManager = this.state.productManager
        const { product, managers } = this.props
        const prevManager = product.managerId || 0
        const disabled = newManager * 1 === prevManager

        return (
            <li className="list-group-item">
                <div>
                    {this.state.error === '' ? null : <div className="alert alert-danger" >Error saving manager! Please try again.</div>}
                    <h4>{product.name}</h4>
                    <form onSubmit={this.submitHandler}>
                        <label><em>Product Manager:</em></label>
                        <div>
                            <select value={newManager} onChange={this.changeHandler} className="form-control">
                                <option value={0}>---</option>
                                {managers.map(manager => (
                                    <option value={manager.id} key={manager.id} >{manager.name}</option>
                                ))}
                            </select>
                        </div>
                        <button style={{marginTop: 5}} type="submit" className="btn btn-primary" disabled={disabled}>Save</button>
                    </form>
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state) => ({ managers: state.managers })

const mapDispatchToProps = (dispatch) => ({ updateProduct: (id, newManagerId) => dispatch(updateProduct(id, newManagerId)) })

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer)


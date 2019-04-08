import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Products from './Products'
import Managers from './Managers'
import Navbar from './Navbar'
import Home from './Home'

export default class Main extends Component {
    render() {
        return (
            <div>
                <h1>Acme Product Managers</h1>
                <Router>
                    <Navbar />
                    <Route path="/products" component={Products} />
                    <Route path="/managers" component={Managers} />
                    <Route exact path="/" component={Home} />
                </Router>
            </div>
        )
    }
}

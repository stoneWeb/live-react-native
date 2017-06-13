import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import Reducer from './reducers/index';
import Navigation from './navigators/Navigation';

const middlewares = [
    thunkMiddleware
];

export default class App extends Component<any, any> {
    store = applyMiddleware(...middlewares)(createStore)(Reducer);
    //store = createStore(Reducer);
    render () {
        return (
            <Provider store={this.store}>
                <Navigation />
            </Provider>
        );
    }
}
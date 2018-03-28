import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const configureStore = () => {

    const store = process.env.NODE_ENV === 'production'
        ? createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk)
            )
        )
        : createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk, createLogger)
            )
        );
        
    return store;
};

export default configureStore;
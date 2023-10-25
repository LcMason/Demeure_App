import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { BrowserRouter } from 'react-router-dom'
import thunk from "redux-thunk"


import rootReducer from './components/reducers'

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

// const root = ReactDOM.createRoot(document.getElementById('root'))

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);




// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

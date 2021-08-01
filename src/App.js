import React, { Component } from 'react'
import AppRouter from './routes/AppRouter';
import './styles/scss/style.scss'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './services/redux/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter/>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;

import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../services/redux/store'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">
    </div>
  </div>
)

const Header = React.lazy(() => import('../views/common/Header'));
const Pokedex = React.lazy(() => import('../views/pages/pokedex/Pokedex'));
const PokemonDetails = React.lazy(() => import('../views/pages/pokemons/PokemonDetails'));
const Page404 = React.lazy(() => import('../views/pages/404/Page404'));
const Footer = React.lazy(() => import('../views/common/Footer'));

class AppRouter extends Component {
    render() {        
        return (
          <Container className="bg-main" fluid="xxl">
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                  <React.Suspense fallback={loading}>
                    <Route path="/" name="Header" render={props => <Header {...props}/>} />
                    <Switch>
                        <Route exact path="/" name="Pokedex" render={props => <Pokedex {...props}/>} />
                        <Route exact path="/pokedex" name="Pokedex" render={props => <Pokedex {...props}/>} />
                        <Route exact path="/pokedex/:name" name="Pokemon Details" render={props => <PokemonDetails {...props}/>} />
                        <Route path="/" name="404" render={props => <Page404 {...props}/>} />
                    </Switch>
                    <Route path="/" name="Footer" render={props => <Footer {...props}/>} />
                  </React.Suspense>
                </BrowserRouter>
              </PersistGate>
            </Provider>
          </Container>
        )
    }
}

export default AppRouter;
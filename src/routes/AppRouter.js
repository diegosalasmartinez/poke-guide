import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">
    </div>
  </div>
)

const Header = React.lazy(() => import('../views/common/Header'));
const Pokemons = React.lazy(() => import('../views/pages/pokemons/Pokemons'));
const Page404 = React.lazy(() => import('../views/pages/404/Page404'));

export default class AppRouter extends Component {
    render() {        
        return (
        <BrowserRouter>
            <React.Suspense fallback={loading}>
              <Route path="/" name="Pokemon" render={props => <Header {...props}/>} />
              <Container className="bg-main">
                <Switch>
                    <Route exact path="/pokemons" name="Pokemon" render={props => <Pokemons {...props}/>} />
                    <Route path="/" name="404" render={props => <Page404 {...props}/>} />
                </Switch>
              </Container>
            </React.Suspense>
        </BrowserRouter>
        )
    }
}

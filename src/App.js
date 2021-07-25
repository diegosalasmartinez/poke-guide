import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/scss/style.scss'
// import 'bootstrap/dist/css/bootstrap.min.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">
      a
    </div>
  </div>
)

const Header = React.lazy(() => import('./views/containers/Header'));
const Pokemons = React.lazy(() => import('./views/pages/pokemons/Pokemons'));


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Route path="/" name="Pokemon" render={props => <Header {...props}/>} />
            <Switch>
              <Route path="/" name="Pokemon" render={props => <Pokemons {...props}/>} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;

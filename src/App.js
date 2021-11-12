import ArticlesGrid from './components/ArticlesGrid'
import ArticleDetail from './components/ArticleDetail'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path='/'>
          <ArticlesGrid />
        </Route>
        <Route path='/:articleUid'>
          <ArticleDetail />
        </Route>
      </Switch>
    </Router>
  )
}

export default App

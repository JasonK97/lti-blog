import "./App.css"
import ArticlesGrid from "./components/ArticlesGrid"
import Article from "./components/Article"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/">
          <ArticlesGrid />
        </Route>
        <Route path="/:articleUid">
          <Article />
        </Route>
      </Switch>
    </Router>
  )
}

export default App

import { Route, Switch } from "wouter";
import MapAdmin from "./Pages/Map";
import Home from "./Pages/Home";
function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/map" component={MapAdmin} />
      </Switch>
    </div>
  );
}

export default App;

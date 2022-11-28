import { Route, Switch } from "wouter";
import MapAdmin from "./Pages/Map";
import Home from "./Pages/Home";
import { useEffect } from "react";
import callApi from "./API";
import actions from "./API/actions";
const App = () => {
  useEffect(() => {
    const res = callApi(actions.CONNECT, {})
    .then(res => console.log(res));
  }, [])

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

import { Route, Switch } from "wouter";
import MapAdmin from "./Pages/Map";
import Home from "./Pages/Home";
import { useEffect } from "react";
import callApi from "./API";
import actions from "./API/actions";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { setLog } from "./Redux/slices/logSlice";

const App = () => {

  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.log.value)


  useEffect(() => {
    const res = callApi(actions.GETLOGS, {})
      .then(res => dispatch(setLog(res.data)))
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

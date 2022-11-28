import { Route, Switch } from "wouter";
import MapAdmin from "./Pages/Map";
import Home from "./Pages/Home";
import { Layout } from 'antd';
import { useEffect } from "react";
import callApi from "./API";
import actions from "./API/actions";
import { useAppDispatch } from "./Redux/hooks";
import { setLog } from "./Redux/slices/logSlice";
import Logs from "./Pages/Logs";
import './Styles/App.css';


const { Header, Footer, Sider, Content } = Layout;


const App = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    callApi(actions.GETLOGS, {})
      .then(res => dispatch(setLog(res.data)))
  }, [])

  return (
    <div>
      <Layout>
        <Header>
          <div className='home-header'>
            Header
          </div>
        </Header>
        <Content>
          <div className='home-content'>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/map" component={MapAdmin} />   // Tharun needs to fix the UI of this page 
              <Route path="/logs" component={Logs} />
            </Switch>
          </div>
        </Content>
        <Footer className='footer-main'>
          <div className='home-footer'>
            Footer
          </div>
        </Footer>
      </Layout>

    </div>
  );
}

export default App;

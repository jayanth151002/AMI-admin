import { Route, Switch } from "wouter";
import MapAdmin from "./Pages/Map";
import Home from "./Pages/Home";
import LogOnMap from "./Pages/LogOnMap";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import callApi from "./API";
import actions from "./API/actions";
import { useAppDispatch } from "./Redux/hooks";
import { io } from "socket.io-client";
import { setLog, setNewLog } from "./Redux/slices/logSlice";
import Logs from "./Pages/Logs";
import "./Styles/App.css";
import ProfileLog from "./Components/ProfileLog";
import IItmLogo from "./assets/IIT_Madras_Logo.png";
const { Header, Footer, Sider, Content } = Layout;

const socket = io(import.meta.env.VITE_API_URL);

const App = () => {
  const [triggerLog, setTriggerLog] = useState({});
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setNewLog({ profile: {}, log: {} }));
    callApi(actions.GETLOGS, {}).then((res) => dispatch(setLog(res.data)));
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("we are connected to the server!!");
    });
    socket.on("connected", (data: any) => {
      dispatch(setNewLog({ profile: data?.profile?.Item, log: data?.log }));
      callApi(actions.GETLOGS, {}).then((res) => dispatch(setLog(res.data)));
    });
  }, []);

  return (
    <div>
      <Layout>
        <Header>
          <div
            style={{
              display: "flex",
              alignItems: "space-evenly",
            }}
          >
            <a href="/">
              <img src={IItmLogo} width="50px" alt="IITM-logo" />
            </a>
            <div className="home-header">Name</div>
          </div>
        </Header>
        <Content>
          <div className="home-content">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/map" component={MapAdmin} />
              <Route path="/map/:id" component={LogOnMap} />
              <Route path="/log/profile" component={() => <ProfileLog />} />
              <Route path="/logs" component={Logs} />
            </Switch>
          </div>
        </Content>
        <Footer className="footer-main">
          <div className="footer">
            <div
              className="row"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "centre",
                  alignItems: "center",
                }}
              >
                <a href="https://www.iitm.ac.in/">
                  <img src={IItmLogo} width="50px" alt="IITM-logo" />
                </a>
              </div>
            </div>
            <div className="row">
              <p className="sec-row">IIT Madras © All Rights Reserved</p>
            </div>
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

export default App;

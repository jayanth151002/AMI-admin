import { Route, Switch } from "wouter";
import MapAdmin from "./Pages/Map";
import Home from "./Pages/Home";
import LogOnMap from "./Pages/LogOnMap";
import { Button, Layout } from "antd";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
  useEffect,
} from "react";
import callApi from "./API";
import actions from "./API/actions";
import { useAppDispatch } from "./Redux/hooks";
import { io } from "socket.io-client";
import { setLog, setNewLog } from "./Redux/slices/logSlice";
import Logs from "./Pages/Logs";
import "./Styles/App.css";
import ProfileLog from "./Components/ProfileLog";
import IItmLogo from "../public/IIT_Madras_Logo.png";
import Logo from "../public/appLogo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Log from "./Types/logType";
import { useLocation } from "wouter";
const { Header, Footer, Content } = Layout;
const socket = io(import.meta.env.VITE_API_URL);

const App = () => {
  const dispatch = useAppDispatch();
  const [, navigate] = useLocation();

  const notify = (profile: any) => {
    const CustomToastWithLink = () => {
      return (
        <div>
          Attention!!! {profile.name} is in an emergency.
          <Button danger onClick={() => navigate("/log/profile")} style={{marginTop:"10px"}}>
            View Details
          </Button>
        </div>
      );
    };
    toast.error(CustomToastWithLink, { autoClose: 50000 });
  };

  useEffect(() => {
    dispatch(setNewLog({ profile: {}, log: {} }));
    callApi(actions.GETLOGS, {}).then((res) => dispatch(setLog(res.data)));
  }, []);

  useEffect(() => {
    socket.on("connect", () => { });
    socket.on("connected", (data: any) => {
      dispatch(setNewLog({ profile: data?.profile?.Item, log: data?.log }));
      callApi(actions.GETLOGS, {}).then((res) => {
        notify(data?.profile?.Item);
        dispatch(setLog(res.data));
      });
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <Layout>
        <Header>
          <div
            style={{
              display: "flex",
              alignItems: "space-evenly",
            }}
          >
            <a href="/">
              <img
                src={Logo}
                style={{
                  borderRadius: "16px",
                  border: "2px solid white",
                  marginRight: "10px",
                }}
                width="50px"
                alt="IITM-logo"
              />
            </a>
            <div className="home-header">AMI</div>
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

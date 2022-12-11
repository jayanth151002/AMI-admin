import { Col, Row } from "antd";
import NewLogCard from "../Components/NewLogCard";
import { useAppSelector } from "../Redux/hooks";
import { useLocation } from "wouter";
import "../Styles/Home.css";

const Home = () => {
  const newLog = useAppSelector((state) => state.log.newLog);
  const [, navigate] = useLocation();
  return (
    <div>
      <Row className="home-content-grid">
        <Col span={6} offset={4}>
          <div
            className="home-content-grid-item"
            onClick={() => navigate("/map")}
          >
            Map
          </div>
        </Col>
        <Col span={6} offset={4}>
          <div
            className="home-content-grid-item"
            onClick={() => navigate("/logs")}
          >
            Logs
          </div>
        </Col>
        {/* <Col span={5}>
                <div className='home-content-grid-item'>
                    Analytics
                </div>
            </Col>
            <Col span={5}>
                <div className='home-content-grid-item'>
                    Box 4
                </div>
            </Col> */}
      </Row>
    </div>
  );
};

export default Home;

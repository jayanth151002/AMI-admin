import { Col, Row } from 'antd';
import HomeGrid from '../Components/HomeGrid';
import NewLogCard from '../Components/NewLogCard';
import { useAppSelector } from '../Redux/hooks';
import '../Styles/Home.css';

const Home = () => {

  const newLog = useAppSelector(state => state.log.newLog);
  return (
    <div>
      <HomeGrid />
      <Row>
        <Col span={20} offset={2}>
          <div className="notifs-div">
            <h1>
              Notifications
            </h1>
            {JSON.stringify(newLog.profile) === '{}' ? "No new logs" : <NewLogCard />}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Home
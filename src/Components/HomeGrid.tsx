import { Row, Col } from 'antd'
import { useLocation } from "wouter";
import '../Styles/HomeGrid.css'

const HomeContent = () => {

    const [location, navigate] = useLocation();

    return (
        <Row className='home-content-grid'>
            <Col span={5} offset={2}>
                <div className='home-content-grid-item' onClick={()=>navigate('/map')}>
                    Map
                </div>
            </Col>
            <Col span={5}>
                <div className='home-content-grid-item' onClick={()=>navigate('/logs')}>
                    Logs
                </div>
            </Col>
            <Col span={5}>
                <div className='home-content-grid-item'>
                    Analytics
                </div>
            </Col>
            <Col span={5}>
                <div className='home-content-grid-item'>
                    Box 4
                </div>
            </Col>
        </Row>
    )
}

export default HomeContent
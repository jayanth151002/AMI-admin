import { Layout } from 'antd';
import '../Styles/Home.css';

const { Header, Footer, Sider, Content } = Layout;
const Home = () => {
  return (
    <Layout>
      <Header>
        <div className='home-header'>
          Header
        </div>
      </Header>
      <Content>
        <div className='home-content'>
          Content
        </div>
      </Content>
      <Footer>
        <div className='home-footer'>
          Footer
        </div>
      </Footer>
    </Layout>
  )
}

export default Home
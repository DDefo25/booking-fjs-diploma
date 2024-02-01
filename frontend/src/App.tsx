import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './components/SideBar';
import Logo from './components/Logo';
import Profile from './components/Profile';
import UsersModule from './components/UsersModule/UsersModule';


function App() {
  return (
    <Container>
      <Row>
          <Col sm={4}>
            <Logo />
          </Col>
          <Col sm={8}>
            <Profile placement='bottom'/>
          </Col>
      </Row>
      <Row>
          <Col sm={4}>
            <SideBar />
          </Col>
          <Col sm={8}>
            <UsersModule />
          </Col>
      </Row>

    </Container>
  );
}

export default App;

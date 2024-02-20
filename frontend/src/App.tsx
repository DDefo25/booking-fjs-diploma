import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './components/SideBar/SideBar';
import Logo from './components/SideBar/Logo';
import { Outlet } from 'react-router-dom';
import Profile from './components/AuthModule/Profile';

function App() {
  return (
    <Container>
      <Row>
          <Col sm={4}>
            <Logo />
          </Col>
          <Col sm={8}>
            <Profile />
          </Col>
      </Row>
      <Row>
          <Col sm={4}>
            <SideBar />
          </Col>
          <Col sm={8}>
            <Outlet />
          </Col>
      </Row>
    </Container>
  );
}

export default App;

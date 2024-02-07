import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './components/SideBar';
import Logo from './components/Logo';
import Profile from './components/AuthModule/Profile';
import UsersModule from './components/UsersModule/UsersModule';
import { MainContainer } from './components/MainContainer';
import { Outlet, RouterProvider } from 'react-router-dom';
import router from './router';


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

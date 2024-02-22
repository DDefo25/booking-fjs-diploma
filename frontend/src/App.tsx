import './App.css';
import { Col, Container, Navbar, Row, Stack } from 'react-bootstrap';
import SideBar from './components/SideBar/SideBar';
import Logo from './components/SideBar/Logo';
import { Outlet } from 'react-router-dom';
import Profile from './components/AuthModule/Profile';
import { ToastList } from './components/utilites-components/Toast/ToastList';

function App() {
  return (<>
    <div className='position-relative'>
      <Navbar sticky="top" className="bg-body-tertiary">
        <Col md={{ offset: 1 }}>
          <Logo />
        </Col>
        <Col md={{ offset: 5 }} className="">
          <Profile />
        </Col>
      </Navbar>
      <Container >
        
        <Col md={{ span: 8, offset: 3 }} className='p-3'>
          <Outlet />
        </Col>
      </Container>
      <Col md={{ span: 2, offset: 1 }} className='fixed-top' style={{top: '12vh'}}>
          <SideBar />
      </Col>
      <ToastList />
    </div>
    </>
  );
}

export default App;

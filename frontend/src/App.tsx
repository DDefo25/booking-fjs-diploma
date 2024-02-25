import './App.css';
import { Col, Container, Navbar } from 'react-bootstrap';
import SideBar from './components/SideBar/SideBar';
import Logo from './components/SideBar/Logo';
import { Navigate, Outlet } from 'react-router-dom';
import Profile from './components/AuthModule/Profile';
import { ToastList } from './components/utilites-components/Toast/ToastList';
import { SupporRequestModule } from './components/SupportRequest/SupportRequestModule';
import { useCheckRoles } from './hooks/useCheckRoles';
import { Role } from './config/roles.enum';
import { SocketClient } from './socket/SocketClient';

function App() {
  (() => {
    SocketClient()
  })()

  const isAllow = useCheckRoles()  

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

      <Navigate to="/hotel-rooms" replace />
      <ToastList />
      { isAllow([Role.Manager, Role.Client]) && <SupporRequestModule /> }
    </div>
    </>
  );
}

export default App;

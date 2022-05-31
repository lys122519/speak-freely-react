import React from 'react';
import './App.less';
import { Layout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';
import AppHeader from './pages/header';


 


function App() {
  return (
    <div>
      <Layout style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
        <AppHeader />
        <Content style={{flexGrow: 1}}>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}

export default App;

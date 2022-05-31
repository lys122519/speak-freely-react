import React from 'react';
import './App.less';
import { Layout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';
import AppHeader from './pages/header';


 


function App() {
  return (
    <div>
      <Layout>
        <AppHeader />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}

export default App;

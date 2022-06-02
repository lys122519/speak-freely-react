import React from 'react';
import './App.less';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Outlet } from 'react-router-dom';
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

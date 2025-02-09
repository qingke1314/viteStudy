import React, { useRef } from 'react'
import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
import Routes from '@/router/index.jsx';
import { changeName, getList } from './reducers/user';
import { changeTheme } from './reducers/theme';


function App({ state }) {
  const { colorPrimary, colorBgContainer } = state.theme;
  const Fallback = <div></div>
  return (
    <ConfigProvider theme={{
      token: {
        // Seed Token 影响范围大
        colorPrimary,
        borderRadius: 5
      },
      // 派生变量 影响范围小
      colorBgContainer,
      // 1. 单独使用暗色算法
      // algorithm: theme.darkAlgorithm,
      // 2. 组合使用暗色算法与紧凑算法
      // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}>
      <HashRouter basename='/'>
        <Routes fallback={Fallback} ></Routes>
      </HashRouter>
    </ConfigProvider>
  );
}
const mapStateToProps = state => {
  return {
    state
  }
};
const mapDispatchToProps = {
  changeName,
  getList,
  changeTheme
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

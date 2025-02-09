import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { items } from './const.js';
import {
  LeftOutlined
} from '@ant-design/icons';
import styles from './index.module.scss';
import { connect } from 'react-redux';
import BaseLayoutHead from './BaseLayoutHead/index.jsx';

const BaseLayout = (props) => {
  const { colorPrimary } = props;
  const navigate = useNavigate();
  const [transLeft, setTransLeft] = useState('0px');
  const [current, setCurrent] = useState('/');
  useEffect(() => {
    navigate(current, {
      replace: false
    });
    console.log(document.querySelector('tst'))
  }, []);
  const handleCollapse = () => {
    if(transLeft === '0px') {
      setTransLeft('-256px');
    } else {
      setTransLeft('0px');
    }
  };
  return (
    <div>
      <div className={styles.head} style={{ background: colorPrimary }}>
        <BaseLayoutHead />
      </div>
      <div id='tst' className={styles.home}>
        <div className={styles.leftContent} style={{ transform: `translateX(${transLeft})`}}>
          <Menu
            selectedKeys={[current]}
            mode="inline"
            items={items}
            theme={'light'}
            onClick={(e) => {
              setCurrent(e.key);
              navigate(e.key, {
                replace: false
              });
            }}
          />
          <div className={styles.direct} style={{ background: colorPrimary }}>
            <div onClick={handleCollapse} className={styles.directBox}>
              <div className={styles.icon}>
                <LeftOutlined style={{ color: colorPrimary }} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content} style={{ marginLeft: transLeft === '0px' ? '280px' : '24px' }}>
          { props.children }
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  console.log('map, state'. state)
  return {
    colorPrimary: state.theme.colorPrimary,
  }
};
const BaseLayoutConnect = connect(mapStateToProps)(BaseLayout)
export default BaseLayoutConnect;
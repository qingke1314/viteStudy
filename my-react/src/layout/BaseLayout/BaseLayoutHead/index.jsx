import React from "react";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { items, keyColorMap } from './const';
import styles from './index.module.scss';
import { getList } from '@/reducers/user';

const BaseLayoutHead = () => {
  const { userName, list } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onClick = ({ key }) => {
    const { colorPrimary, colorBgContainer } = keyColorMap[key];
    dispatch(getList())
    // dispatch({
    //   type: 'CHANGE_THEME',
    //   payload: { colorPrimary, colorBgContainer }
    // });
  };
  return (
    <div className={styles.content}>
      <div>{list[0]?.title}</div>
      <div className={styles.contentRight}>
        <Dropdown trigger={['click']} menu={{ items, onClick }} >
          <UnorderedListOutlined className={styles.icon} />
        </Dropdown>
        <div className={styles.userName}>Hello, { userName }!</div>
      </div>
    </div>
  )
}

export default BaseLayoutHead;
import React from 'react';
import styles from '../index.module.scss';

/**
 * 顶部左侧tabItem按钮
 */
function CircleBtnTab({
  onBtnClick = () => {},
  activeTab = '',
  dataSource = [],
  style = {}
}) {
  return (<div style={style} className={styles.circleBtnWrap}>
    {
      dataSource.map(({value, label}) => {
        return (
          <div
            onClick={() => onBtnClick(value)}
            className={`${styles.circleBtn} ${activeTab === value ? styles.circleBtnActive : ''}`}
          >
            { label }
          </div>
        );
      })
    }
  </div>)
}

export default CircleBtnTab;

import React, { useEffect, useState, useRef } from 'react';
import ScGpxReactFusionComponentSubpageLayout from 'sc-gpx-react-fusion-component-subpage-layout';
import ScGpxReactFusionComponentLoading from 'sc-gpx-react-fusion-component-loading';
import Result from 'sc-gpx-react-fusion-component-result';
import { Input, Icon, MenuButton } from '@alifd/next';
import { queryProcurementCaseConditionList, queryProcurementCaseList, getDictCaseList } from '@/services/case';
import CircleBtnTab from './components/CircleBtnTab';
import CaseCard from './components/caseCard';
import styles from './index.module.scss';
import './index.scss';
import CustomIcon from '@/components/CustomIcon';
/**
 * 顶部左侧tab目录项
 */
const TAB_LIST = [
  { label: '机构', value: '0' },
  { label: '区划', value: '1' },
];
/**
 * 顶部右侧下拉选项数据在字典集里的code映射列表
 *  适用区划-zoneCode
    100071：所属单位-orgId
    10001：业务类型-bizTypeCode
    101：采购方式-purchaseMethodCode
    103：采购类型-projectType
 */
const CATALOG_KEY_MAP = [
  // {
  //   label: '所属单位',
  //   code: '100071',
  //   postCode: 'orgId'
  // },
  {
    label: '适用区划',
    code: '100070',
    postCode: 'zoneCode'
  },
  {
    label: '业务类型',
    code: '10001',
    postCode: 'bizTypeCode'
  },
  {
    label: '采购方式',
    code: '101',
    postCode: 'purchaseMethodCode'
  },
  {
    label: '采购类型',
    code: '103',
    postCode: 'projectType'
  },
  {
    label: '时间',
    code: '999',
    postCode: 'createTime'
  }
];
/**
 * 业务案例
 */
function CaseCardList() {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('');
  const [procurementCaseConditionMap, setProcurementCaseConditionMap] = useState({}); // 右上菜单的下拉列
  const [cacheMenuData, setCacheMenuData] = useState({}); // 右上菜单按钮存储的数据，这个只用来回显菜单按钮的已选，
  const [queryValue, setQueryValue] = useState('');
  /**
   * 缓存前一次的存储数据，若菜单弹层关闭时数据无变化，则不调接口
   */
  const cacheMenuDataRef = useRef({
    old: {},
    new: {}
  });
  const [cardList, setCardList] = useState([]);
  /**
   * 初始化
   * 1、获取右上菜单按钮下拉选项
   * 2、获取卡片列表
   */
  useEffect(() => {
    getDictCaseList()
      .then(res => {
        setProcurementCaseConditionMap({
          ...(res.data || {}),
          '999': [
            {
              dictValue: 'NEW',
              dictName: '最新'
            },
            {
              dictValue: 'OLD',
              dictName: '最早'
            }
          ]
        });
      })
    getCardList();
  }, []);
  /**
   * 获取卡片列表
   */
  const getCardList = (queryActualContent) => {
    const post = Object.keys(cacheMenuDataRef.current.new).reduce((acc, key) => {
      const postCode = CATALOG_KEY_MAP.find(e => e.code === key)?.postCode;
      acc[postCode] = postCode === 'createTime' ? (cacheMenuDataRef.current.new)[key] : [(cacheMenuDataRef.current.new)[key]];
      return acc;
    }, {});
    post.queryContent = queryActualContent === undefined ? queryValue : queryActualContent;
    setLoading(true);
    queryProcurementCaseList(post)
      .then(res => {
        setCardList(res.data || []);
      })
      .finally(() => { setLoading(false); })
  };
  /**
   * 菜单按钮切换事件
   */
  const handleMenuBtnChange = (value, code) => {
    if(code === '999') return;
    setCacheMenuData(data => {
      const newData = { ...data, [code]: value };
      cacheMenuDataRef.current.new = newData;
      return newData;
    });
  };
  /**
   * 菜单按钮切换事件-时间
   */
  const onItemClick = (value, code) => {
    setCacheMenuData(data => {
      const newData = {
        ...data,
        [code]: value
      };
      cacheMenuDataRef.current.new = newData;
      return newData;
    });
  };
  /**
   * 菜单按钮关闭时重新获取卡片表格
   */
  const handleVisibleChange = (visible) => {
    if(visible === false &&
      (JSON.stringify(cacheMenuDataRef.current.old) !== JSON.stringify(cacheMenuDataRef.current.new))) {
      getCardList();
      cacheMenuDataRef.current.old = cacheMenuDataRef.current.new;
    }
  };
  /**
   * 右上-重置
   */
  const handleReset = () => {
    setCacheMenuData({});
    setQueryValue('');
    cacheMenuDataRef.current = {
      old: {},
      new: {}
    };
    getCardList('');
  }
  return (
    <ScGpxReactFusionComponentSubpageLayout
      title='业务案例'
      useMenuTitle
      showBottomLine={false}
      titleStyle={{ zIndex: 99 }}
      rightRenderer={() => {
        return (
          <Input
            value={queryValue}
            onChange={v => setQueryValue(v)}
            onPressEnter={() => { getCardList(); }}
            innerAfter={<Icon type="search" size="xs" onClick={() => {}} style={{ margin: 4 }} />}
            placeholder='请输入您要搜索的内容'
          />
        );
      }}
    >
      <ScGpxReactFusionComponentLoading visible={loading} fullScreen>
        <div className={`${styles.content} caseCardListVCardWrap`}>
          <div className={styles.head}>
            <div>
              <CircleBtnTab
                style={{ display: 'none' }}
                activeTab={tab}
                dataSource={TAB_LIST}
                onBtnClick={(val) => { console.log(val); setTab(val); }}
              />
            </div>
            <div style={{ display: 'flex' }}>
              {
                CATALOG_KEY_MAP.map(e => {
                  return <MenuButton
                    popupClassName={'caseCardListVCardWrapMenuBtn'}
                    className={styles.menuBtn}
                    key={e.code}
                    text
                    label={e.label}
                    selectMode={'single'}
                    // onSelect={(value) => { handleMenuBtnChange(value, e.code); }}
                    onItemClick={value => { onItemClick(value, e.code); }}
                    onVisibleChange={handleVisibleChange}
                    selectedKeys={cacheMenuData[e.code]}
                  >
                    {
                      (procurementCaseConditionMap[e.code] || []).map(o => {
                        return <MenuButton.Item value={e.dictValue} key={o.dictValue}>{o.dictName}</MenuButton.Item>
                      })
                    }
                  </MenuButton>
                })
              }
              <div className='themePrimaryColor' onClick={handleReset} style={{ cursor: 'pointer', display: 'flex', marginLeft: 8 }}>
                <CustomIcon className='themePrimaryColor' type='subapp-btn-recruit' size={14}></CustomIcon>
                <span style={{ transform: 'translateY(2px)', }}>重置</span>
              </div>
            </div>
          </div>
          <div className={`${styles.body}`}>
          { cardList.length > 0 ? <div className='cardWrap'>
              {/* <CaseCard add data={e}></CaseCard> */}
              {
                cardList.map(e => {
                  return <CaseCard getCardList={getCardList} setLoading={setLoading} data={e}></CaseCard>
                })
              }
            </div> : <div style={{ height: '100%', width: '100%' }}>
              <Result status='page-empty-data' content="暂无数据" />
            </div>}
          </div>
        </div>
      </ScGpxReactFusionComponentLoading>
    </ScGpxReactFusionComponentSubpageLayout>
  );
}

export default CaseCardList;

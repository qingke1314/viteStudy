import { request } from 'ice';
import React, { useState } from 'react';
import { ScGpxReactFusionComponentBaseDialog } from 'sc-gpx-react-fusion-component-common-dialog';
import editComplexRender from '@/components/ComplexRender';
import { queryCaseCatalogQuery,
  handleCaseCopy,
  handleCaseDelete
} from '@/services/case';
import {
  elementDataSave,
  elementDeleteDetail,
  elementDetailGet,
  elementSaveDetail,
} from '@/services/procurement';
import SIG from '@/components/SIG';
import { PUBLISH_NOTICE } from '@/services/constants';
import styles from '../index.module.scss';
import '../index.scss';
import CustomIcon from '@/components/CustomIcon';
import { Button, Divider } from '@alifd/next';
import { GpxQuickNotification, GpxQuickDialog } from 'sc-gpx-react-fusion-component-quick-dialog';
const VIEW_CASE_ITEM = [
  {
    code: 'bizTypeName',
    label: '业务类型'
  },
  {
    code: 'organizeFormName',
    label: '行业分类'
  },
  {
    code: 'purchaseMethodName',
    label: '采购方式'
  },
  {
    code: 'projectTypeName',
    label: '采购类型'
  },
  {
    code: 'catalogName',
    label: '品目类型'
  },
  {
    code: 'detailName',
    label: '适用标的'
  },
  {
    code: 'zoneName',
    label: '适用区划'
  },
  {
    code: 'roleUserType',
    label: '适用角色'
  },
];

function CaseCard({
  data = {},
  setLoading = () => {},
  getCardList,
}) {
  const [viewVisible, setViewVisible] = useState(false); // 业务案例--查看 可视
  const [sigCardData, setSIGCardData] = useState({});
  /**
   * 业务案例查看弹框关闭
   */
  const handleClose = () => {
    setViewVisible(false);
  };
  /**
   * 案例卡片点击事件
   */
  const handleClickCard = () => {
    setViewVisible(true);
  };
  /**
   * 案例复制
   */
  const handleCopy = (event) => {
    setLoading(true);
    event.stopPropagation();
    handleCaseCopy(data.id)
      .then(res => {
        GpxQuickNotification.success('复制成功!');
        getCardList();
      })
      .finally(() => {
        setLoading(false);
      })
  };
  /**
   * 案例删除
   */
  const handleDelete = (event) => {
    event.stopPropagation();
    GpxQuickDialog.confirm({
      title: '提示',
      message: '确认是否删除',
      async onOk() {
        try {
          setLoading(true);
          handleCaseDelete(data.id)
            .then(res => {
              GpxQuickNotification.success('删除成功!');
              getCardList();
            })
            .finally(() => {
              setLoading(false);
            })
        } catch (e) {
        } finally {
          return true;
        }
      },
    });
  };
  /**
   * SIG apiMap
   */
  const apiMap = {
    getQueryParam: () => {
      return {
        businessId: data.docId
      }
    },
    catalogQuery: queryCaseCatalogQuery,
    catalogDetailGet: elementDetailGet,
    elementDataSave: elementDataSave,
    elementSaveDetail: elementSaveDetail,
  };
  /**
   * query接口完成后获取相关数据
   */
  const initProjectHandle = (data) => {
    setSIGCardData(data?.procurementCasesVo || {});
  };
  return (
    <div onClick={handleClickCard} className={styles.caseCard}>
      <div className={`${styles.top} ${styles['top-' + data.collectMethodCode]}`}>
        <div className={styles.topContent}>
          <div className={styles.wordContent}>
            <div>{ data.organizeFormName || '-' }</div>
            <div>{ data.purchaseMethodName || '-' }</div>
            <div>{ data.projectTypeName ? (data.projectTypeName + '类') : '-' }</div>
            <div>{ data.agencyName || '-' }</div>
            <div>{ data.bizTypeName }</div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div style={{ lineHeight: '20px', fontSize: 15 }}>{ data.caseName }</div>
        <div title={data.detailName} style={{
          color: '#999', margin: '5px 0',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          width: '100%',
          zIndex: 50
        }}>{ data.detailName }</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={`${styles.tag} ${styles['tag-' + data.collectMethodCode]}` }>{ data.collectMethodName }</div>
          <div className={styles.bottomTime}>{ data.createTime }</div>
        </div>
      </div>
      <div className={styles.iconContent}>
        <CustomIcon onClick={handleCopy} size={14} color="#0a82e5" type='subapp-fuzhi'></CustomIcon>
        <CustomIcon onClick={handleDelete} style={{ marginLeft: 8 }} size={14} color="#f5222d" type='subapp-shanchu1'></CustomIcon>
      </div>
      <ScGpxReactFusionComponentBaseDialog
        title="业务案例--查看"
        visible={viewVisible}
        style={{ width: 1600 }}
        footerActions={[]}
        onClose={handleClose}
        noPaddingTag={'1'}
        className={styles.baseDialog}
      >
        <div style={{ height: 750, display: 'flex' }}>
          <SIG
            style={{ flex: 1, height: '100%' }}
            apiMap={apiMap}
            eventMap={{
              onInitProjectSuccess: initProjectHandle
            }}
            config={{
              minorEditComplexRender: editComplexRender,
              sensitive: false,
              request,
              postil: false,
              sign: false,
              aside: true,
              minor: false,
              onlyViewDoc: true,
              attachment: false,
              toolbar: false
            }}
            EMEnvironment={PUBLISH_NOTICE}
          />
          <div style={{ width: 300, height: '100%', padding: 12, marginLeft: 12, background: 'white' }}>
            <div className={styles.rightTop}>
              <div className={styles.rightTopTitle}>
                <CustomIcon size={22} type='subapp-xiangmumingcheng1' className='themePrimaryColor'></CustomIcon>
                <div title={sigCardData.caseName} className={styles.rightTopTitleWord}>{ sigCardData.caseName }</div>
              </div>
              <div style={{ marginTop: 16, color: '#666' }}>
                <span>引用：-</span>
                <span style={{ marginLeft: 40 }}>完整度：-</span>
              </div>
              <div className={styles.rightTopBtn}>
                <Button onClick={handleCopy} type='secondary' warning>复制案例</Button>
                <Button onClick={handleDelete} style={{ marginLeft: 8 }} type="normal" warning>删除</Button>
              </div>
            </div>
            <Divider />
            <div>
              { VIEW_CASE_ITEM.map(e => {
                return <div className={styles.rightBottomItem} key={e.label}>
                  <div className={styles.rightBottomItemLabel}>{ e.label }：</div>
                  <div className={styles.rightBottomItemCode}>{ e.code ? sigCardData[e.code] : '-' }</div>
                </div>
              }) }
            </div>
          </div>
        </div>
      </ScGpxReactFusionComponentBaseDialog>
    </div>
  );
}

export default CaseCard;

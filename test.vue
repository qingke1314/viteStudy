<template>
  <div class="bid">
    <el-row class="content">
      <page-header
        showTitleLine
        :useMenuTitle="false"
        :title="title"
      >
      </page-header>
      <el-row class="block pad">
        <p class="custom_title">
          <span class="custom_underline"></span>项目明细
        </p>
        <el-row :gutter="20" class="table1">
          <el-col :span="12">
            <el-form label-position="left" label-width="100px">
              <el-form-item label="项目名称：">
                <span :title="allData.projectName">{{
                  allData.projectName
                }}</span>
              </el-form-item>
              <el-form-item :label="`${$t('tender.projectNo')}：`">
                <span>{{ allData.projectCode }}</span>
              </el-form-item>
              <el-form-item :label="$t('basic.purchase') + '方式：'">
                <span>{{ allData.purchaseMethodName }}</span>
              </el-form-item>
              <el-form-item v-if="!isFramePurchase" label="备案号：">
                <span>{{ allData.planRecordCode }}</span>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form label-position="left" label-width="150px">
              <el-form-item label="标书价格：">
                <span>{{ unitPrice(allData.bidDocPrice) }} 元</span>
              </el-form-item>
              <el-form-item>
                <span slot="label"
                  >{{
                    purchaseMethodCode == "21" ? "竞价截止时间" : $t('bidopen.bidOpenName') + "时间"
                  }}
                  :&nbsp;</span
                >
                <span>{{
                  purchaseMethodCode != "21"
                    ? allData.bidOpenTime
                    : allData.bidEndTime
                }}</span>
              </el-form-item>
              <el-form-item :label="$t('tender.agency')+'：'">
                <span>{{ allData.agencyName }}</span>
              </el-form-item>
              <el-form-item label="立项时间：">
                <span>{{ allData.approvalTime }}</span>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-row>
      <el-row v-if="checktype === CHECK_TYPE.SIGN">
        <el-tabs
          type="border-card"
          tab-position="top"
          @tab-click="tabClick"
          class="packagetab"
        >
          <el-tab-pane
            v-for="p in packages"
            :key="p.id"
            :label="$t('basic.packageName') + p.packageNumber"
          >
            <el-row class="pad block" style="margin-top: -20px;">
              <p class="custom_title">
                <span class="custom_underline"></span>审核列表
              </p>
              <div class="table-operate">
                <v-tabs v-model="tableSignStatus" @tab-click="querySignSupplierTableData">
                  <el-tab-pane :key="TABLE_STATUS.UN_SUBMIT" label="未提交" :name="TABLE_STATUS.UN_SUBMIT"></el-tab-pane>
                  <el-tab-pane :key="TABLE_STATUS.UN_PASS" label="未通过" :name="TABLE_STATUS.UN_PASS"></el-tab-pane>
                  <el-tab-pane :key="TABLE_STATUS.PASSED" label="已通过" :name="TABLE_STATUS.PASSED"></el-tab-pane>
                  <el-tab-pane :key="TABLE_STATUS.ALL" label="全部" :name="TABLE_STATUS.ALL"></el-tab-pane>
                </v-tabs>
                <div>
                  <el-button type="primary" v-if="checktype === CHECK_TYPE.SIGN && auditType === AUDIT_TYPE.SIGN_AUDIT" @click="handleDownloadAll">一键下载</el-button>
                </div>
              </div>
              <el-row>
                <data-table
                  :data="tableData"
                  :config="config"
                  border
                  style="width: 100%;"
                  :span-method="objectSpanMethod"
                  :pagination="true"
                  :selfMotionPagination="false"
                  :current-page.sync="pageNum"
                  :page-size="pageSize"
                  :page-sizes="[5, 10, 20, 30, 40, 50]"
                  :total="total"
                  layout="sizes, total, ->, prev, pager, next, jumper"
                  @current-page-change="handleCurrentPageChange"
                  @size-change="handleSizeChange"
                >
                  <el-table-column
                    slot="operate"
                    fixed="right"
                    label="操作"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" size="small"
                        >审核</el-button
                      >
                    </template>
                  </el-table-column>
                </data-table>
              </el-row>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <el-row
        v-if="checktype === CHECK_TYPE.TENDER"
        class="pad block"
        style="margin-top: 3%;"
      >
        <p class="custom_title">
          <span class="custom_underline"></span>审核列表
        </p>
        <el-row>
          <data-table
            :data="tableData"
            border
            style="width: 100%;"
            :config="config2"
            :pagination="true"
            :selfMotionPagination="false"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            :page-sizes="[5, 10, 20, 30, 40, 50]"
            :total="total"
            layout="sizes, total, ->, prev, pager, next, jumper"
            @current-page-change="handleCurrentPageChange"
            @size-change="handleSizeChange"
          >
            <el-table-column
              slot="operate"
              fixed="right"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small"
                  >审核</el-button
                >
              </template>
            </el-table-column>
          </data-table>
        </el-row>
      </el-row>
      <el-dialog title="缴费信息确认" :visible.sync="deposit_visible" width="80%" :close-on-click-modal="false">
        <div class="deposit-contain" style="background: #f6f9fc;">
          <div class="deposit-info bid-left">
            <div class="deposit-info-head">
              <div style="width: 50%;">
                <span>{{ $t("basic.supplier") }}:</span>
                <span>{{ select_package.supplierName }}</span>
              </div>
              <div style="width: 50%;">
                <span>平台联系电话:</span>
                <span>{{ signChargeConfig.personMobile }}</span>
              </div>
            </div>
            <div class="deposit-info-content">
              <div class="custom-title-1">投标信息</div>
              <div class="deposit-content-basic">
                <div style="width: 50%;">
                  <el-form label-position="left">
                    <el-form-item label="项目名称:">
                      <span>{{ select_package.projectName }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('basic.supplier')+'投标包号:'">
                      <span>{{
                        "第" + select_package.packageNumber + "包"
                      }}</span>
                    </el-form-item>
                    <el-form-item label="联系人姓名:">
                      <span>{{ select_package.signMan }}</span>
                    </el-form-item>
                  </el-form>
                </div>
                <div style="width: 50%;">
                  <el-form label-position="left">
                    <el-form-item :label="$t('tender.agency')+':'">
                      <span>{{ select_package.agencyName }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('basic.packageName')+'名称:'">
                      <span>{{ select_package.packageName }}</span>
                    </el-form-item>
                    <el-form-item label="联系人手机号:">
                      <span>{{ select_package.signTel }}</span>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
            <div class="deposit-info-content">
              <div class="custom-title-1">缴费信息</div>
              <div class="deposit-content-basic">
                <div style="width: 50%;">
                  <el-form label-position="left">
                    <el-form-item label="缴费金额:">
                      <span>{{ signChargeConfig.charge }} 元</span>
                    </el-form-item>
                    <el-form-item label="缴费账户:">
                      <span>{{ signChargeConfig.basicName }}</span>
                    </el-form-item>
                    <el-form-item label="转账账户:">
                      <span>{{ signFeedata.outBankAccount }}</span>
                    </el-form-item>
                    <el-form-item label="转账银行:">
                      <span>{{ signFeedata.outBankName }}</span>
                    </el-form-item>
                    <el-form-item label="转账时间:">
                      <span>{{ signFeedata.payDate }}</span>
                    </el-form-item>
                  </el-form>
                </div>
                <div style="width: 50%;">
                  <el-form label-position="left">
                    <el-form-item label="缴费账号:">
                      <span>{{ signChargeConfig.payAccount }}</span>
                    </el-form-item>
                    <el-form-item label="开户行:">
                      <span>{{ signChargeConfig.receiptBankName }}</span>
                    </el-form-item>
                    <el-form-item label="转账账号:">
                      <span>{{ signFeedata.outBankNo }}</span>
                    </el-form-item>
                    <el-form-item label="银行交易流水号:">
                      <span style="word-break: break-all;">{{
                        signFeedata.bankBillNo
                      }}</span>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div class="custom-title-1">开票信息</div>
              <div style="font-size: 14px; margin: 10px 10px;">
                <span>要求开具发票:</span>
                <el-radio-group
                  :disabled="true"
                  v-model="signFeedata.isInvoicing"
                >
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </div>
              <div
                class="deposit-content-basic"
                v-show="signFeedata.isInvoicing"
              >
                <div style="width: 50%;">
                  <el-form label-position="left">
                    <el-form-item label="公司名称:">
                      <span>{{ billInfo.billTitle }}</span>
                    </el-form-item>
                    <el-form-item label="开票地址:">
                      <span>{{ billInfo.registerAddress }}</span>
                    </el-form-item>
                    <el-form-item label="联系人:">
                      <span>{{ billInfo.consigneeName }}</span>
                    </el-form-item>
                    <el-form-item label="邮寄地址:">
                      <span>{{ billInfo.consigneeAddress }}</span>
                    </el-form-item>
                  </el-form>
                </div>
                <div style="width: 50%;">
                  <el-form label-position="left">
                    <el-form-item label="纳税人识别码:">
                      <span>{{ billInfo.ratepayerCode }}</span>
                    </el-form-item>
                    <el-form-item label="开户行:">
                      <span>{{ billInfo.depositBank }}</span>
                    </el-form-item>
                    <el-form-item label="开户行账号:">
                      <span>{{ billInfo.bankCode }}</span>
                    </el-form-item>
                    <el-form-item label="联系电话:">
                      <span>{{ billInfo.registerPhone }}</span>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div class="custom-title-1" style="width: 100%;">附件列表</div>
              <el-table
                :data="fileList"
                key="fileList"
                border
                style="margin: 10px 0; width: 100%;"
              >
                <el-table-column
                  label="文件名称"
                  prop="fileName"
                ></el-table-column>
                <el-table-column
                  label="上传时间"
                  prop="createTime"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{ row, $index }">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="downloadFile(row.fileName, row.filePath)"
                      >下载</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="custom-title-1">备注</div>
              <v-input
                type="textarea"
                style="margin: 10px 0px;"
                :maxlength="800"
                show-word-limit
                :rows="5"
                v-model="remark"
              ></v-input>
            </div>
            <div class="deposit-contain-dialog-footer" style="display: flex; justify-content: center;">
              <el-button style="margin-right: 20px;" size="medium" @click="deposit_visible = false">取消</el-button>
              <el-button style="margin-right: 20px;" type="primary" :disabled="timeLimit" size="medium" @click="updateSignStatus(3)">不通过</el-button>
              <el-button style="margin-right: 20px;" type="primary" :disabled="timeLimit" size="medium" @click="updateSignStatus(2)">通过</el-button>
            </div>
          </div>
          <div
            class="operate-log bid-right"
            :style="{ maxHeight: maxLogHeight }"
          >
            <strong>操作日志</strong>
            <bs-time-line>
              <bs-time-line-item
                v-for="(timeLineData, index) in logs"
                :key="index"
              >
                <template slot="title">{{ timeLineData.createTime }}</template>
                <template slot="content">
                  <div>
                    <div>
                      <span style="color: #666666;">提交方:</span>
                      {{ timeLineData.createUserName }}
                    </div>
                    <div>
                      <span style="color: #666666;">状态:</span>
                      {{(timeLineData.logType == '1' ? '已提交' :
                        (timeLineData.logType == '2' ? (timeLineData.status == 1 ? '审核通过' : '审核未通过' ) :
                        timeLineData.logType == '3' ? '已撤回' : ''))}}
                    </div>
                    <div
                      :title="timeLineData.remark"
                      v-if="timeLineData.remark"
                    >
                      <span style="color: #666666;">备注:</span>
                      {{
                        timeLineData.remark.length > 10
                          ? timeLineData.remark.slice(0, 10) + "..."
                          : timeLineData.remark
                      }}
                    </div>
                  </div>
                </template>
              </bs-time-line-item>
            </bs-time-line>
          </div>
        </div>
      </el-dialog>
      <el-dialog class="bid-feePay-dialog" :title="`${purchaseName}文件费用缴纳信息`" :visible.sync="bidFeePay" width="80%" center>
        <div class="deposit-contain" style="background: #f6f9fc;">
          <div class="deposit-info bid-left">
            <div class="deposit-info-head">
              <div style="width: 50%;">
                <span>{{ $t("basic.supplier") }}:</span>
                <span>{{ projectExpand.supplierName }}</span>
              </div>
            </div>
            <div class="deposit-info-content">
              <div class="custom-title-1">缴费信息</div>
              <div class="deposit-content-basic">
                <div style="width: 50%;">
                  <el-form label-position="left">
                    <el-form-item label="缴费金额:">
                      <span>{{ unitPrice(projectExpand.charge) }}</span>
                      <span style="margin-left: 2px;">元</span>
                    </el-form-item>
                    <el-form-item label="缴费账户:">
                      <span>{{ projectExpand.inBankAccount }}</span>
                    </el-form-item>
                  </el-form>
                </div>
                <div style="width: 50%;">
                  <el-form label-position="left">
                    <el-form-item label="缴费账号:">
                      <span>{{ projectExpand.inBankNo }}</span>
                    </el-form-item>
                    <el-form-item label="开户行:">
                      <span>{{ projectExpand.inBankName }}</span>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div class="custom-title-1">付款信息</div>
              <div class="deposit-content-basic">
                <el-form
                  class="deposit-form"
                  status-icon
                  ref="ruleForm1"
                  label-position="left"
                >
                  <div style="width: 50%;">
                    <el-form-item label="转账账户:">
                      <div>{{ projectExpand.outBankAccount }}</div>
                    </el-form-item>
                    <el-form-item label="转账银行:">
                      <div>{{ projectExpand.outBankName }}</div>
                    </el-form-item>
                    <el-form-item label="转账时间:">
                      <div>{{ projectExpand.payDate }}</div>
                    </el-form-item>
                  </div>
                  <div style="width: 50%;">
                    <el-form-item label="转账账号:" label-width="122px">
                      <div>{{ projectExpand.outBankNo }}</div>
                    </el-form-item>
                    <el-form-item label="银行交易流水号:" label-width="122px">
                      <div style="word-break: break-all;">
                        {{ projectExpand.bankBillNo }}
                      </div>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
              <div class="custom-title-1">附件列表</div>
              <el-table
                :data="fileList"
                key="fileList"
                border
                style="margin: 10px 0;"
              >
                <el-table-column
                  label="文件名称"
                  prop="fileName"
                ></el-table-column>
                <el-table-column
                  label="上传时间"
                  prop="createTime"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{ row, $index }">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="downloadFile(row.fileName, row.filePath)"
                      >下载</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="custom-title-1">备注</div>
              <v-input
                type="textarea"
                style="margin: 10px 0px;"
                :maxlength="800"
                :rows="3"
                v-model="remark"
                show-word-limit
              ></v-input>
            </div>
          </div>
          <div
            class="operate-log bid-right"
            :style="{ maxHeight: maxLogHeight }"
          >
            <strong>操作日志</strong>
            <bs-time-line>
              <bs-time-line-item
                v-for="(timeLineData, index) in operLog"
                :key="index"
              >
                <template slot="title">{{ timeLineData.createTime }}</template>
                <template slot="content">
                  <div>
                    <div>
                      <span style="color: #666666;">提交方:</span>
                      {{ timeLineData.createUserName }}
                    </div>
                    <div>
                      <span style="color: #666666;">状态:</span>
                      {{(timeLineData.logType == '3' ? '已提交' : (timeLineData.logType == '4' ? (timeLineData.status == 1 ? '审核通过' : '审核未通过' ):''))}}
                    </div>
                    <div
                      :title="timeLineData.remark"
                      v-if="timeLineData.remark"
                    >
                      <span style="color: #666666;">备注:</span>
                      {{
                        timeLineData.remark.length > 10
                          ? timeLineData.remark.slice(0, 10) + "..."
                          : timeLineData.remark
                      }}
                    </div>
                  </div>
                </template>
              </bs-time-line-item>
            </bs-time-line>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            :disabled="passOrFailVerificationButton === 'readonly'"
            @click="saveSignSupplierInfo('ruleForm', 3)"
            >不通过</el-button
          >
          <el-button
            :disabled="passOrFailVerificationButton === 'readonly'"
            @click="saveSignSupplierInfo('ruleForm', 2)"
            type="primary"
            >通过</el-button
          >
        </span>
      </el-dialog>
      <audit-confirm ref="auditConfirm" :max-height="maxLogHeight" @download-file="downloadFile" @handle-is-pass="handleIsPass" />
    </el-row>
  </div>
</template>

<script>
import {
  querySignSupplierInfoByPackageId,
  querySignSupplierInfoByProjId,
  querySignedSupplierInfoByProjId,
  agencyQeryPackageSignupByProjId,
  saveSignSupplierInfo,
  saveSignSupplierTenderInfo,
  updateSignStatus,
  querySignUpChargeByPackageId,
  queryBillInfoBySupplierId,
  queryTenderChargeVoByProjectIdAndSupplierId,
  queryAgencyEnclosureList,
  saveSignSupplierInfoNew,
  querySignedSupplierInfoByProjIdWithStatus,
  queryDownloadAllPath
} from "@/api/module/bid/biddingProcess";
import { toUnitPrice, getLanguageByCondition, langDefault} from "@/util/util";
import dataTable from "@/components/table";
import auditConfirm from '@/views/module/bid/Review/supplierProcureCheckAuditConfirm';
import vInput from '@/views/module/bid/Review/signupSituation/components/v-input/v-input';
import vTabs from '@/views/module/bid/Review/signupSituation/components/v-tabs/index';

// 审核状态映射 有两种，表格‘状态’列针对checkType不同展示不同的字段
const SIGN_STATUS_MAP = {
  0: '无需审核',
  1: '未审核',
  2: '审核通过',
  3: '审核未通过',
  4: '待审核',
}
const TENDER_STATUS_MAP = {
  0: '无需审核',
  1: '未审核',
  2: '审核通过',
  3: '审核未通过'
}
// 审核类型
const AUDIT_TYPE = {
  SIGN_FEE_AUDIT: 'signFeeAudit', // 报名费审核
  SIGN_AUDIT: 'signAudit' // 报名审核
}
// 报名费 or 标书费
const CHECK_TYPE = {
  SIGN: '1',
  TENDER: '2'
}
// 表格数据过滤状态
const TABLE_STATUS = {
  UN_SUBMIT: '4',
  UN_PASS: '3',
  PASSED: '2',
  ALL: 'all'
}
export default {
  name: "supplierProcureCheck",
  components: {
    dataTable,
    auditConfirm,
    vInput,
    vTabs
  },
  data() {
    return {
      TABLE_STATUS, // 表格数据过滤状态位
      tableSignStatus: '4',
      remark: "",
      isPass: false,
      projectExpand: {},
      bidFeePay: false,
      billInfo: {},
      maxLogHeight: "500px",
      fileList: [],
      select_package: "",
      signChargeConfig: {},
      signFeedata: {},
      fontDictionary: {},
      deposit_visible: false,
      logs: [],
      unitPrice: toUnitPrice,
      cost: "",
      title: "",
      allData: "",
      purchaseMethodCode: "",
      projectType: "",
      timeLimit: false,
      checktype: this.$route.query.checktype,
      auditType: this.$route.query.auditType,
      add_data: [],
      is_give: "1",
      supplier: "",
      operLog: [],
      same_row: "",
      same_num: 1,
      auditPackageId:"",
      supplierId: "",
      tableData: [],
      sameTable: [],
      packageActive: "",
      sign_man: "",
      sign_tel: "",
      dialogVisible: false,
      switchBtn: false,
      packageId: "",
      projectId: "",
      packages: [],
      show: 1,
      resource: "",
      type: [],
      radio: "1",
      total: 0,
      pageNum: 1,
      pageSize: 10,
      ruleForm: {
        bankBillNo: "",
        outBankNo: "",
        inBankNo: "",
      },
      rules: {
        bankBillNo: [{ required: true, message: "不能为空", trigger: "blur" }],
        outBankNo: [{ required: true, message: "不能为空", trigger: "blur" }],
        inBankNo: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      config: {
        columns: [
          {
            title: this.$t("basic.supplier") + "名称",
            prop: "supplierName",
            align: "center",
          },
          {
            title: "联系人姓名",
            prop: "signMan",
            align: "center",
          },
          {
            title: "联系人电话",
            prop: "signTel",
            align: "center",
          },
          {
            title: "申请时间",
            prop: "createTime",
            align: "center",
          },
          {
            title: "状态",
            prop: "signStatusName",
            align: "center",
          },
          {
            slot: "operate",
          },
        ],
      },
      config2: {
        columns: [
          {
            title: '包号',
            prop: "packageNumber",
            align: "center",
          },
          {
            title: this.$t("basic.supplier") + "名称",
            prop: "supplierName",
            align: "center",
          },
          {
            title: "联系人姓名",
            prop: "signMan",
            align: "center",
          },
          {
            title: "联系人电话",
            prop: "signTel",
            align: "center",
          },
          {
            title: "申请时间",
            prop: "tederFileCreateTime",
            align: "center",
          },
          {
            title: "状态",
            prop: "tenderStatus",
            align: "center",
          },
          {
            slot: "operate",
          },
        ],
      },
      passOrFailVerificationButton: "",
      CHECK_TYPE,
      AUDIT_TYPE
    };
  },
  async created() {
    if (this.$route.params.id) {
      if (this.checktype === CHECK_TYPE.SIGN) {
        await this.querySignSupplierInfoByProjId(this.$route.params.id);
        this.agencyQeryPackageSignupByProjId(this.$route.params.id);
        this.querySignSupplierTableData();
      } else {
        await this.querySignedSupplierInfoByProjId(this.$route.params.id);
        this.title = `${this.bidActionName}审核`;
      }
      const _param = {projectId: this.$route.params.id}
      this.fontDictionary = await getLanguageByCondition(_param) || {}
    }
  },
  computed:{
    isFramePurchase(){
      return this.purchaseMethodCode == '8'
    },
    // 采购/征集
    purchaseName(){
      if(this.fontDictionary.common && this.fontDictionary.common.purchaseName){
        return this.fontDictionary.common.purchaseName
      } else {
        return this.$t('basic.purchase')
      }
    },
    // 报名
    bidActionName() {
      if(this.fontDictionary.bid && this.fontDictionary.bid.bidActionName) {
        return this.fontDictionary.bid.bidActionName
      } else {
        return langDefault.bid.bidActionName
      }
    }
  },
  methods: {
    /**
     * 切页
     */
    handleCurrentPageChange(pageNum, pageSize) {
      this.pageNum = pageNum;
      this.pageSize = pageSize;
      if (this.checktype === CHECK_TYPE.TENDER) {
        this.querySignedSupplierInfoByProjId(this.$route.params.id);
      }
      if (this.checktype === CHECK_TYPE.SIGN) {
        this.clickInChangePackage(this.packageActive);
      }
    },
    /**
     * 切页大小
     */
    handleSizeChange(pageSize, pageNum) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      if (this.checktype === CHECK_TYPE.TENDER) {
        this.querySignedSupplierInfoByProjId(this.$route.params.id);
      }
      if (this.checktype === CHECK_TYPE.SIGN) {
        this.clickInChangePackage(this.packageActive);
      }
    },
    /**
     * 审核确认弹窗通过按钮回调
     */
    handleIsPass({ type, remark }) {
      this.remark = remark;
      this.saveSignSupplierInfo('', type);
    },
    // 下载附件
    downloadFile(fileName, filePath) {
      var ahref = encodeURI(
        encodeURI("?path=" + filePath + "&fileName=" + fileName)
      );
      window.location.href =
        globalConfig.serverName.document + "/file/download" + ahref;
    },
    /**
     * 审核-确认 type 通过/不通过
     */
    updateSignStatus(type) {
      const _that = this;
      const daTa = {
        chargeType: this.checktype,
        isPass: type,
        charge: this.cost,
        projectId: this.$route.params.id,
        packageId: this.packageActive,
        supplierId: this.supplierId,
        remark: this.remark,
      };
      if (type == 3 && !this.remark) {
        this.$message({
          type: "warning",
          message: "不通过时备注项为必填.",
        });
      } else {
        updateSignStatus(daTa)
          .then((res) => {
            _that.$message({
              type: "success",
              message: "保存成功!",
            });
            _that.clickInChangePackage(this.packageActive);
            this.deposit_visible = false;
          })
      }
    },
    /**
     * 包tab
     */
    tabClick(tab, event) {
      this.tableSignStatus = TABLE_STATUS.UN_SUBMIT;
      this.packageActive = this.packages[tab.index].id;
      this.clickInChangePackage(this.packageActive);
    },
    /**
     * getBankCardCheckCode
     */
    getBankCardCheckCode(nonCheckCodeCardId) {
      // 如果传的不是数字返回N
      if (
        nonCheckCodeCardId == null ||
        nonCheckCodeCardId.trim().length === 0 ||
        !nonCheckCodeCardId.matches("\\d+")
      ) {
        return "N";
      }
      var chs = nonCheckCodeCardId.trim().toCharArray();
      var luhmSum = 0;
      for (let i = chs.length - 1, j = 0; i >= 0; i--, j++) {
        let k = chs[i] - "0";
        if (j % 2 === 0) {
          k *= 2;
          k = k / 10 + (k % 10);
        }
        luhmSum += k;
      }
      return luhmSum % 10 === 0 ? "0" : 10 - (luhmSum % 10) + "0";
    },
    /**
     * 审核方法
     * 如果是报名费审核(auditType = signFeeAudit)则逻辑不变， 否则调旧窗口(该窗口抽离，需要的数据打包后直接传参过去)
     */
    queryExamSignFeeByPackId(packageId, supplierId) {
      const fn = this.auditType === AUDIT_TYPE.SIGN_FEE_AUDIT ? querySignUpChargeByPackageId : queryAgencyEnclosureList;
      fn(packageId, supplierId).then(async ({ data: { data } }) => {
        this.select_package = data;
        this.remark = this.signFeedata.remark || "";
        this.logs = data.feedataLogList || [];
        this.logs.forEach((item) => {
          item.remark = item.remark || "";
        });
        if(this.auditType === AUDIT_TYPE.SIGN_FEE_AUDIT) {
          this.signChargeConfig = data.signChargeConfig || {};
          this.signFeedata = data.signFeedata || {};
          this.fileList = data.attachmentList;
          if (this.signFeedata.isInvoicing) {
            this.billInfo = await queryBillInfoBySupplierId(supplierId);
          }
          this.deposit_visible = true;
        } else if(this.auditType === AUDIT_TYPE.SIGN_AUDIT) {
          const sendData = {
            select_package: this.select_package,
            enclosureList: data.requirementsList,
            remark: this.remark,
            logs: this.logs,
            editable: data.editable,
          }
          this.$refs.auditConfirm.open(sendData);
        }
        this.$nextTick((_) => {
          this.maxLogHeight = $(".operate-log").prev().css("height");
        });
      });
    },
    /**
     * 合并方法
     */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.checktype !== CHECK_TYPE.SIGN) {
        if (columnIndex === 0 || columnIndex === 5) {
          if (this.sameTable[rowIndex]) {
            return {
              rowspan: this.sameTable[rowIndex],
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      }
    },
    /**
     * 标书费基础信息
     */
    async querySignedSupplierInfoByProjId(id) {
      // 获取投标信息
      const _that = this;
      await querySignedSupplierInfoByProjId(id, this.pageNum, this.pageSize)
        .then((res) => {
          _that.allData = res.data.data;
          this.total = res.data.data.signedSupplierPageVo.total;
          this.purchaseMethodCode = res.data.data.purchaseMethodCode || ''
          this.projectType = res.data.data.projectType || ''
          this.tableData = res.data.data.signedSupplierPageVo.records.map(e => {
            this.$set(e, 'tenderStatus', TENDER_STATUS_MAP[e.tenderStatus] ? TENDER_STATUS_MAP[e.tenderStatus] : TENDER_STATUS_MAP[3]);
            return e;
          })
          this.fixMergeTable();
        })
        .catch((msg) => {
        });
    },
    /**
     * 合并用的函数
     */
    fixMergeTable() {
      let j = 0;
      this.sameTable[0] = 1;
      for (let i = 0; i < this.tableData.length - 1; i++) {
        if (
          this.tableData[i].supplierId === this.tableData[i + 1].supplierId
        ) {
          this.sameTable[j]++;
          this.sameTable[i + 1] = 0;
        } else {
          j = i + 1;
          this.sameTable[j] = 1;
        }
      }
    },
    // 查询弹窗附件列表 （审核确认弹窗-审核要求及供应商资料附件）
    queryAgencyEnclosureList(packageId, supplierId) {
      return new Promise((resolve, reject) => {
        queryAgencyEnclosureList(packageId, supplierId)
          .then(res => {
            if (res.data.code === '200'){
              return resolve(res.data.data.requirementsList || []);
            }
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          })
      });
    },
    /**
     * 表格-审核按钮
     */
    handleClick(row) {
      this.auditPackageId = row.packageId;
      this.supplier = row.supplierName;
      this.supplierId = row.supplierId;
      this.sign_man = row.signMan;
      this.sign_tel = row.signTel;
      this.maxLogHeight = "500px";
      if (this.checktype === CHECK_TYPE.SIGN) {
        this.queryExamSignFeeByPackId(row.packageId, row.supplierId);
      } else {
        queryTenderChargeVoByProjectIdAndSupplierId(
          row.projectId,
          row.supplierId
        ).then((res) => {
          this.projectExpand = res.data.data;
          this.passOrFailVerificationButton = this.projectExpand.editable && this.projectExpand.editable.passOrFailVerificationButton || "";
          this.projectExpand.supplierName = row.supplierName;
          this.operLog = res.data.data.feedataLogList;
          this.remark = res.data.data.remark || "";
          this.operLog.forEach((item) => {
            item.remark = item.remark || "";
          });
          this.fileList =
            res.data.data.attachmentList == null
              ? []
              : res.data.data.attachmentList;
          this.bidFeePay = true;
          this.$nextTick((_) => {
            this.maxLogHeight = $(".operate-log").prev().css("height");
          });
        });
      }
    },
    /**
     * 处理一键下载
     */
    handleDownloadAll() {
      queryDownloadAllPath(this.packageActive)
        .then(res => {
          const downLoadFile = res.data.data || {};
          const { fileName, filePath } = downLoadFile;
          if(fileName && filePath) {
            let href = encodeURI(encodeURI("?path=" + filePath + "&fileName=" + fileName));
            window.location.href =globalConfig.serverName.document + "/file/download" + href;
          }
        })
    },
    /**
     * format
     */
    format(date, fmt) {
      // author: meizz
      var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    },
    clickInChangePackage(id) {
      this.tableData = [];
      querySignSupplierInfoByPackageId(id, this.pageNum, this.pageSize).then(
        (res) => {
          this.passOrFailVerificationButton = res.data.data.editable && res.data.data.editable.passOrFailVerificationButton || "";
          this.packageActive = id;
          this.querySignSupplierTableData();
        }
      );
    },
    /**
     * @type: 0 无需审核 1 待审核（主线） 2 审核通过 3 审核不通过 4 提交待审核（C）
     * 通过/不通过方法
     * 报名审核情况下，传参、方法、回调皆有改动
     */
    saveSignSupplierInfo(formName, type) {
      const _that = this;
      const isSignAudit = this.checktype === CHECK_TYPE.SIGN && this.auditType === AUDIT_TYPE.SIGN_AUDIT;
      let daTa = {
        chargeType: this.checktype,
        isPass: type,
        charge: this.cost,
        projectId: this.$route.params.id,
        packageId: this.auditPackageId,
        bankBillNo: this.projectExpand.bankBillNo,
        outBankNo: this.projectExpand.outBankNo,
        inBankNo: this.projectExpand.inBankNo,
        supplierId: this.supplierId,
        remark: this.remark,
      };
      if(isSignAudit) {
        daTa = {
          isPass: type,
          projectId: this.$route.params.id,
          packageId: this.auditPackageId,
          supplierId: this.supplierId,
          remark: this.remark,
        };
      }
      if (!this.remark && type == 3) {
        this.$message({
          type: "warning",
          message: "不通过时备注项为必填.",
        });
      } else {
        (isSignAudit ? saveSignSupplierInfoNew : saveSignSupplierInfo)(daTa)
          .then((res) => {
            _that.$message({
              type: "success",
              message: "保存成功!",
            });
            if (this.checktype === CHECK_TYPE.SIGN) {
              if(isSignAudit) {
                this.$refs.auditConfirm.handleClose();
              }
              _that.clickInChangePackage(this.packageActive);
            } else {
              _that.querySignedSupplierInfoByProjId(this.$route.params.id);
            }
            this.bidFeePay = false;
          })
      }
    },
    /**
     * 报名费审核，获取表格数据
     */
    querySignSupplierTableData() {
      querySignedSupplierInfoByProjIdWithStatus({
        packageId: this.packageActive,
        projectId: this.$route.params.id,
        signStatus: this.tableSignStatus === TABLE_STATUS.ALL ? null : Number(this.tableSignStatus),
      }, this.pageNum, this.pageSize)
        .then(({data: { data } }) => {
          const signUpPageVo = data.signUpPageVo || {};
          this.total = signUpPageVo.total;
          this.tableData = signUpPageVo.records || [];
          this.tableData = this.tableData.map(e => {
            const signStatusName = SIGN_STATUS_MAP[e.signStatus] ? SIGN_STATUS_MAP[e.signStatus] : SIGN_STATUS_MAP[3];
            this.$set(e, 'signStatusName', signStatusName);
            return e;
          })
        })
    },
    /**
     * 报名费审核-获取基础数据，表格数据另外取
     */
    async querySignSupplierInfoByProjId(id) {
      const _that = this;
      await querySignSupplierInfoByProjId(id, this.pageNum, this.pageSize)
        .then((res) => {
          _that.allData = res.data.data;
          this.title = this.allData.projectName;
          this.purchaseMethodCode = _that.allData.purchaseMethodCode || '';
          this.projectType = _that.allData.projectType || '';
          this.packageActive = this.packageId = res.data.data.packageInfoVo[0].id;
          this.passOrFailVerificationButton = _that.allData.editable && _that.allData.editable.passOrFailVerificationButton || "";
          this.querySignSupplierTableData();
        })
    },
    /**
     * 获取所有包
     * 设置当前包id
     * 手动设置el-tabs[0]的下划线(element的bug)
     */
    agencyQeryPackageSignupByProjId(id) {
      return new Promise((resolve, reject) => {
        agencyQeryPackageSignupByProjId(id)
          .then((res) => {
            this.packages = res.data.data;
            this.$nextTick(() => {
              document.getElementsByClassName('v-tabs__active-bar')[0].style.width = '42px';
            })
            return resolve();
          })
          .catch((msg) => {
            return reject();
          });
      });
    },
  },
  deactivated() {
    this.$destroy();
  },
};
</script>
<style lang="scss">
.custom-title-1 {
  background: #ecf2fb;
  color: #0a82e5;
  font-size: 14px;
  font-weight: 900;
  line-height: 33px;
  padding-left: 10px;
}
.deposit-contain {
  color: #222222;
  border: 1px solid #F5F5F5;
  display: flex;
  // 缴费内容
  .deposit-info {
    width: 80%;
    background: #fff;
    padding: 20px 10px;
    border-right: 1px solid #F5F5F5;
    //缴费内容头
    .deposit-info-head {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 900;
      margin-bottom: 10px;
    }
    //缴费内蓉中
    .deposit-info-content {
      //基本资料
      .deposit-content-basic {
        display: flex;
        flex-direction: row;
        // border: 1px solid #F5F5F5;
        // background:#F5F5F5;
        line-height: 32px;
        font-size: 14px !important;
        padding: 9px 20px 10px 20px;
        flex-wrap: wrap;
        .el-form-item {
          margin-bottom: 0px;
          .el-form-item__label {
            color: #666666 !important;
            padding-right: 10px;
            font-size: 14px !important;
            font-weight: normal !important;
          }
        }
        .deposit-form {
          width: 100%;
          padding-top: 10px;
          display: flex;
          flex-wrap: wrap;
          .el-form-item {
            margin-bottom: 20px;
            .el-form-item__label {
              color: #666666 !important;
            }
          }
        }
      }
    }
  }
}
.deposit-contain-dialog-footer{
  z-index: 1;
  bottom: 0px;
  padding: 12px;
  position: absolute;
  background: #ffffff;
}
@media screen and (min-width: 1601px) {
  .deposit-contain-dialog-footer{
    width: 75%;
  }
}
@media screen and (max-width: 1600px) {
  .deposit-contain-dialog-footer{
    width: 68%;
  }
}
@media screen and (max-width: 1200px) {
  .deposit-contain-dialog-footer{
    width: 62%;
  }
}
</style>
<style lang="scss" scoped>
@import './signupSituation/components/v-tabs/v-tab.css';
.table-operate {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bid-left {
  width: 80%;
  padding-bottom: 60px !important;
}
.bid-right {
  margin-left: 20px;
  width: 30%;
  padding-top: 25px;
}
.bid-feePay-dialog{
  .dialog-footer{
    .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
      border-color: rgba($color: #0a82e5, $alpha: 0.5)!important;
      background-color: rgba($color: #0a82e5, $alpha: 0.5)!important;
    }
    .el-button--default, .el-button--default:focus, .el-button--default:hover {
      border-color: rgba($color: #0a82e5, $alpha: 0.5)!important;
      color: rgba($color: #0a82e5, $alpha: 0.5)!important;
      background: #ffffff;
    }
  }
}

@media screen and (min-width: 1601px) {
  .bid-left {
    width: 80%;
  }
  .bid-right {
    width: 20%;
  }
}
/* 设置了浏览器宽度不小于1201px时 abc 显示1200px宽度 */

@media screen and (max-width: 1600px) {
  .bid-left {
    width: 75%;
  }
  .bid-right {
    width: 25%;
  }
}
/* 设置了浏览器宽度不大于1200px时 abc 显示900px宽度 */

@media screen and (max-width: 1200px) {
  .bid-left {
    width: 70%;
  }
  .bid-right {
    width: 30%;
  }
}
/* 设置了浏览器宽度不大于900px时 abc 显示200px宽度 */
</style>

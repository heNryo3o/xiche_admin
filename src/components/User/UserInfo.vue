<template>
  <div>
    <el-drawer title="用户详细信息" size="65%" :visible.sync="infoVisible" :before-close="handleClose" @open="handleOpen">
      <el-card class="box-card user-wrapper">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="用户资料" name="1">
            <div>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">基本信息</span>
                </div>
                <el-row :gutter="10" class="mb-20">
                  <el-col :sm="8"><span class="info-label">用户编号：</span>{{ info.id }}</el-col>
                  <el-col :sm="8"><span class="info-label">手机号码：</span>{{ info.mobile }}</el-col>
                  <el-col :sm="8"><span class="info-label">会员等级：</span>{{ info.vip_name }}</el-col>
                </el-row>
                <el-row :gutter="10" class="mb-20">
                  <el-col :sm="8"><span class="info-label">名字：{{ info.nickname }}</span></el-col>
                  <el-col :sm="8"><span class="info-label">渠道：{{ info.channel_name }}</span></el-col>
                  <el-col :sm="8"><span class="info-label">注册倾向：{{ info.prefer_name }}</span></el-col>
                </el-row>
              </el-card>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">活跃状态</span>
                </div>
                <el-row :gutter="10" class="mb-20">
                  <el-col :sm="8"><span class="info-label">注册时间：{{ info.created_at }}</span></el-col>
                  <el-col :sm="8"><span class="info-label">最近登录时间：{{ login_calculate.recent_login }}</span></el-col>
                  <el-col :sm="8"><span class="info-label">最近登录设备：{{ login_calculate.recent_origin }}</span></el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :sm="24">
                    <span class="info-label">
                      浏览器：
                      <el-tag v-for="item in login_calculate.browser" :key="item" size="small" type="info">{{ item }}</el-tag>
                    </span>
                  </el-col>
                </el-row>
              </el-card>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">使用终端</span>
                </div>
                <el-row :gutter="10" class="mb-20">
                  <el-col :sm="8"><span class="info-label">pc站：<i :class=" login_calculate.has_pc === 1 ? 'el-icon-success success-color' : 'el-icon-error danger-color'" /></span></el-col>
                  <el-col :sm="8"><span class="info-label">手机站：<i :class=" login_calculate.has_wap === 1 ? 'el-icon-success success-color' : 'el-icon-error danger-color'" /></span></el-col>
                  <el-col :sm="8"><span class="info-label">微信公众号：<i :class=" info.wechat_openid !== '' ? 'el-icon-success success-color' : 'el-icon-error danger-color'" /></span></el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :sm="8"><span class="info-label">小程序：<i :class=" login_calculate.has_weapp === 1 ? 'el-icon-success success-color' : 'el-icon-error danger-color'" /></span></el-col>
                  <el-col :sm="8"><span class="info-label">需方app：<i :class=" login_calculate.has_buyer_app === 1 ? 'el-icon-success success-color' : 'el-icon-error danger-color'" /></span></el-col>
                  <el-col :sm="8"><span class="info-label">供方app：<i :class=" login_calculate.has_seller_app === 1 ? 'el-icon-success success-color' : 'el-icon-error danger-color'" /></span></el-col>
                </el-row>
              </el-card>
            </div>
          </el-tab-pane>

          <el-tab-pane label="认证信息" name="2">
            <el-card class="box-card mb-30" shadow="hover">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;">个人认证</span>
              </div>
              <el-row :gutter="20" class="mb-30">
                <el-col :sm="7">
                  <el-image class="radius-15 id-card-image" fit="cover" :src="validate.person.id_pic" />
                </el-col>
                <el-col :sm="7">
                  <el-image class="radius-15 id-card-image" fit="cover" :src="validate.person.id_pic_back" />
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :sm="8"><span class="info-label">姓名：{{ validate.person.true_name }}</span></el-col>
                <el-col :sm="8"><span class="info-label">身份证号：{{ validate.person.id_card }}</span></el-col>
                <el-col :sm="8"><span class="info-label">认证状态：
                  <el-tag v-if="validate.person.status === 1" type="warning">待审核</el-tag>
                  <el-tag v-if="validate.person.status === 2" type="success">已认证</el-tag>
                  <el-tag v-if="validate.person.status === 3" type="danger">审核失败</el-tag>
                </span></el-col>
              </el-row>
            </el-card>
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;">企业认证</span>
              </div>
              <el-row :gutter="20" class="mb-20">
                <el-col :sm="6">
                  <el-image class="radius-15 licence-image" fit="cover" :src="validate.company.licence_pic" />
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :sm="8"><span class="info-label">公司名：{{ validate.company.company }}</span></el-col>
                <el-col :sm="8"><span class="info-label">社会信用代码：{{ validate.company.licence_num }}</span></el-col>
                <el-col :sm="8"><span class="info-label">认证状态：
                <el-tag v-if="validate.company.status === 1" type="warning">待审核</el-tag>
                <el-tag v-if="validate.company.status === 2" type="success">已认证</el-tag>
                <el-tag v-if="validate.company.status === 3" type="danger">审核失败</el-tag>
                </span></el-col>
              </el-row>
            </el-card>
          </el-tab-pane>

          <el-tab-pane label="店铺服务" name="3">
            <div>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">店铺信息</span>
                </div>
                <el-row :gutter="10" class="mb-20">
                  <el-col :sm="8"><span class="info-label">店铺编号：</span>{{store.id}}</el-col>
                  <el-col :sm="8"><span class="info-label">店铺名称：</span>{{store.name}}</el-col>
                  <el-col :sm="8"><span class="info-label">状态：</span>{{store.status === 1 ? '正常' : '下架'}}</el-col>
                </el-row>
                <el-row :gutter="10" class="mb-20">
                  <el-col :sm="8"><span class="info-label">联系人：</span>{{store.person}}</el-col>
                  <el-col :sm="8"><span class="info-label">联系电话：</span>{{store.phone}}</el-col>
                  <el-col :sm="8"><span class="info-label">关联分类：</span>环保处理</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :sm="8"><span class="info-label">店铺标签：</span><el-tag size="small" v-for="item in store.label" :key="item" class="tags-in-table">{{item}}</el-tag></el-col>
                </el-row>
              </el-card>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">曝光度</span>
                </div>
                <el-row :gutter="10">
                  <el-col :sm="8"><span class="info-label">浏览量：</span>{{store.browse}}次</el-col>
                  <el-col :sm="8"><span class="info-label">关注数：</span>{{store.collect}}个</el-col>
                </el-row>
              </el-card>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">店铺内服务</span>
                </div>
                <el-row :gutter="10">
                  <el-table
                    :data="serviceList"
                    style="width: 100%"
                  >
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form label-position="left" inline class="service-table-expand">
                          <el-form-item label="商品名称">
                            <span>{{ props.row.name }}</span>
                          </el-form-item>
                          <el-form-item label="所属店铺">
                            <span>{{ props.row.shop }}</span>
                          </el-form-item>
                          <el-form-item label="商品 ID">
                            <span>{{ props.row.id }}</span>
                          </el-form-item>
                          <el-form-item label="店铺 ID">
                            <span>{{ props.row.shopId }}</span>
                          </el-form-item>
                          <el-form-item label="商品分类">
                            <span>{{ props.row.category }}</span>
                          </el-form-item>
                          <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                          </el-form-item>
                          <el-form-item label="商品描述">
                            <span>{{ props.row.desc }}</span>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="服务编号"
                      prop="id"
                    />
                    <el-table-column
                      label="服务名称"
                      prop="name"
                    />
                    <el-table-column
                      label="服务分类"
                      prop="desc"
                    />
                  </el-table>
                </el-row>
              </el-card>
            </div>
          </el-tab-pane>

          <el-tab-pane label="发布需求" name="4">
            <div>
              <el-table
                :data="publishTask"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  prop="id"
                  label="需求编号"
                  width="150"
                />
                <el-table-column
                  prop="title"
                  label="需求标题"
                  width="250"
                />
                <el-table-column
                  prop="created_at"
                  label="发布时间"
                  width="220"
                />
                <el-table-column
                  prop="state"
                  label="需求状态"
                />
              </el-table>
            </div>
          </el-tab-pane>

          <el-tab-pane label="参与需求" name="5">
            <div>
              <el-table
                :data="joinTask"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  prop="date"
                  label="需求编号"
                  width="150"
                />
                <el-table-column
                  prop="name"
                  label="需求标题"
                  width="250"
                />
                <el-table-column
                  prop="address"
                  label="参与时间"
                  width="220"
                />
                <el-table-column
                  prop="address"
                  label="参与方式"
                  width="160"
                />
                <el-table-column
                  prop="address"
                  label="跟进状态"
                />
              </el-table>
            </div>
          </el-tab-pane>

          <el-tab-pane label="会员权益" name="6">
            <div>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">基本权益</span>
                </div>
                <el-row :gutter="10" class="mb-30">
                  <el-col :sm="8"><span class="info-label">会员等级：</span>黄金店</el-col>
                  <el-col :sm="8"><span class="info-label">首次开通时间：</span>2019-08-08</el-col>
                  <el-col :sm="8"><span class="info-label">到期时间：</span>2019-09-08</el-col>
                </el-row>
                <el-row :gutter="10" class="mb-30">
                  <el-col :sm="8"><span class="info-label">剩余通用券：</span>32</el-col>
                  <el-col :sm="8"><span class="info-label">可上架服务数：</span>30个</el-col>
                  <el-col :sm="8"><span class="info-label">装修等级：</span>精装修</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :sm="8"><span class="info-label">广告期数/剩余：</span>3期/2期</el-col>
                  <el-col :sm="8"><span class="info-label">定期引流：</span>3次</el-col>
                  <el-col :sm="8"><span class="info-label">金牌秘书服务：</span>有</el-col>
                </el-row>
              </el-card>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">派单权益</span>
                </div>
                <el-row :gutter="10">
                  <el-col :sm="8"><span class="info-label">派单权益总数：</span>96次</el-col>
                  <el-col :sm="8"><span class="info-label">剩余派单数：</span>32次</el-col>
                  <el-col :sm="8"><span class="info-label">拒单次数：</span>40次</el-col>
                </el-row>
              </el-card>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">会员开通记录</span>
                </div>
                <el-row :gutter="10">
                  <el-table
                    :data="serviceList"
                    style="width: 100%"
                  >
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form label-position="left" inline class="service-table-expand">
                          <el-form-item label="商品名称">
                            <span>{{ props.row.name }}</span>
                          </el-form-item>
                          <el-form-item label="所属店铺">
                            <span>{{ props.row.shop }}</span>
                          </el-form-item>
                          <el-form-item label="商品 ID">
                            <span>{{ props.row.id }}</span>
                          </el-form-item>
                          <el-form-item label="店铺 ID">
                            <span>{{ props.row.shopId }}</span>
                          </el-form-item>
                          <el-form-item label="商品分类">
                            <span>{{ props.row.category }}</span>
                          </el-form-item>
                          <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                          </el-form-item>
                          <el-form-item label="商品描述">
                            <span>{{ props.row.desc }}</span>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="开通等级"
                      prop="id"
                    />
                    <el-table-column
                      label="生效时间"
                      prop="name"
                    />
                    <el-table-column
                      label="过期时间"
                      prop="desc"
                    />
                    <el-table-column
                      label="应付金额"
                      prop="desc"
                    />
                    <el-table-column
                      label="实付金额"
                      prop="desc"
                    />
                  </el-table>
                </el-row>
              </el-card>
            </div>
          </el-tab-pane>

          <el-tab-pane label="申报案例" name="7">
            <div>
              <el-table
                :data="casesList"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  prop="id"
                  label="案例编号"
                  width="150"
                />
                <el-table-column
                  prop="title"
                  label="案例标题"
                  width="250"
                />
                <el-table-column
                  prop="category_name"
                  label="案例分类"
                  width="220"
                />
                <el-table-column
                  prop="created_at"
                  label="申报时间"
                  width="160"
                />
                <el-table-column
                  prop="state"
                  label="状态"
                />
              </el-table>
            </div>
          </el-tab-pane>

          <el-tab-pane label="账户信息" name="8">
            <div>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">余额</span>
                </div>
                <el-row :gutter="10">
                  <el-col :sm="8"><span class="info-label">账户余额：</span>300元</el-col>
                  <el-col :sm="8"><span class="info-label">冻结余额：</span>200元</el-col>
                  <el-col :sm="8"><span class="info-label">可提现金额：</span>100元</el-col>
                </el-row>
              </el-card>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">账户余额明细</span>
                </div>
                <el-row :gutter="10">
                  <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="date"
                      label="需求编号"
                      width="150"
                    />
                    <el-table-column
                      prop="name"
                      label="需求标题"
                      width="250"
                    />
                    <el-table-column
                      prop="address"
                      label="发布时间"
                      width="220"
                    />
                    <el-table-column
                      prop="address"
                      label="需求状态"
                    />
                  </el-table>
                </el-row>
              </el-card>
              <el-card class="box-card mb-30" shadow="hover">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">提现记录</span>
                </div>
                <el-row :gutter="10">
                  <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="date"
                      label="需求编号"
                      width="150"
                    />
                    <el-table-column
                      prop="name"
                      label="需求标题"
                      width="250"
                    />
                    <el-table-column
                      prop="address"
                      label="发布时间"
                      width="220"
                    />
                    <el-table-column
                      prop="address"
                      label="需求状态"
                    />
                  </el-table>
                </el-row>
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
import { getInfo, loginCalculate, validateInfo, storeInfo, serviceList, publishTask, joinTask, casesList } from '@/api/member'
export default {
  name: 'UserInfo',
  props: [
    'infoVisible', 'userId'
  ],
  data() {
    return {
      info: {},
      login_calculate: {},
      validate: {
        'person': {},
        'company': {}
      },
      store: {},
      serviceList: [],
      activeName: '1',
      publishTask: [],
      joinTask: [],
      casesList: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:infoVisible', false)
    },
    handleOpen() {
      this.getInfo()
      this.loginCalculate()
    },
    getInfo() {
      getInfo({
        id: this.userId
      }).then(response => {
        this.info = response.data
      })
    },
    handleTabClick(tab) {
      if (tab.name === '2') {
        this.validateInfo()
      }
      if (tab.name === '3') {
        this.storeInfo()
        this.getServiceList()
      }
      if (tab.name === '4') {
        this.getPublishTask()
      }
      if (tab.name === '5') {
        this.getJoinTask()
      }
      if(tab.name === '7'){
        this.getCasesList()
      }
    },
    getCasesList() {
      casesList({
        id: this.userId
      }).then(response => {
        this.casesList = response.data
      })
    },
    getPublishTask() {
      publishTask({
        id: this.userId
      }).then(response => {
        this.publishTask = response.data
      })
    },
    getJoinTask() {
      joinTask({
        id: this.userId
      }).then(response => {
        this.joinTask = response.data
      })
    },
    getServiceList() {
      serviceList({
        id: this.userId
      }).then(response => {
        this.serviceList = response.data
      })
    },
    storeInfo() {
        storeInfo({
          id: this.userId
        }).then(response => {
          this.store = response.data
        })
    },
    validateInfo() {
      validateInfo({
        id: this.userId
      }).then(response => {
        this.validate = response.data
      })
    },
    loginCalculate() {
      loginCalculate({
        id: this.userId
      }).then(response => {
        this.login_calculate = response.data
      })
    }
  }
}
</script>

<style>
  .user-wrapper{
    width: 94%;
    margin: auto;
  }

  .id-card-image{
    height: 160px;
  }

  .licence-image{
    height: 240px;
  }

  .service-table-expand {
    font-size: 0;
  }
  .service-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .service-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-drawer__body{
    overflow-y: scroll;
  }

</style>

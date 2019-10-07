<template>
  <div>
    <el-drawer title="订单信息" size="65%" :visible.sync="infoVisible" :before-close="handleClose" @open="handleOpen">
      <el-card class="box-card user-wrapper">
        <div>
          <el-card class="box-card mb-30" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">基本信息</span>
            </div>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">订单编号：</span>{{ info.id }}</el-col>
              <el-col :sm="8"><span class="info-label">客户手机号码：</span>{{ info.mobile }}</el-col>
              <el-col :sm="8"><span class="info-label">洗车工编号：</span>{{ info.worker_user_id }}</el-col>
            </el-row>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">地址：{{ info.address }}</span></el-col>
              <el-col :sm="8"><span class="info-label">详细地址：{{ info.address_detail }}</span></el-col>
              <el-col :sm="8"><span class="info-label">发起时间：{{ info.created_at }}</span></el-col>
            </el-row>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">车牌号：{{ info.licence_plate }}</span></el-col>
              <el-col :sm="8"><span class="info-label">车型：{{ info.size_name }}</span></el-col>
              <el-col :sm="8"><span class="info-label">订单类型：{{ info.type_name }}</span></el-col>
            </el-row>
          </el-card>
          <el-card class="box-card mb-30" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">订单状态</span>
            </div>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8" class="info-col"><span class="info-label">当前状态：{{ info.state }}</span></el-col>
              <el-col :sm="8" class="info-col" v-if="info.wash_at"><span class="info-label">洗车开始时间：{{ info.wash_at }}</span></el-col>
              <el-col :sm="8" class="info-col" v-if="info.finish_at"><span class="info-label">完成时间：{{ info.finish_at }}</span></el-col>
              <el-col :sm="8" class="info-col" v-if="info.is_start == 2"><span class="info-label">预约开始时间：{{ info.start_at }}</span></el-col>
              <el-col :sm="8" class="info-col" v-if="info.cancel_at"><span class="info-label">取消时间：{{ info.cancel_at }}</span></el-col>
              <el-col :sm="8" class="info-col" v-if="info.cancel_reason"><span class="info-label">取消原因：{{ info.cancel_reason }}</span></el-col>
              <el-col :sm="8" class="info-col"><span class="info-label">支付金额：{{ info.money }}</span></el-col>
              <el-col :sm="8" class="info-col"><span class="info-label">洗车工报酬：{{ info.worker_money }}</span></el-col>
              <el-col :sm="8" class="info-col"><span class="info-label">支付方式：{{ info.pay_type == 1 ? '余额支付' : '微信支付' }}</span></el-col>
              <el-col :sm="8" class="info-col"><span class="info-label">洗车工报酬：{{ info.worker_money }}</span></el-col>
              <el-col :sm="8" class="info-col"><span class="info-label">是否由后台派单：{{ info.is_dispatch == 1 ? '是' : '不是' }}</span></el-col>
            </el-row>
          </el-card>
          <el-card class="box-card mb-30" shadow="hover" v-if="info.status == 1 && info.is_start == 1">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">指派订单</span>
            </div>
            <el-row :gutter="10" class="mb-20">
              <div>
                <el-table :data="list" stripe style="width: 100%">
                  <el-table-column prop="worker_user_id" label="洗车工编号" width="150" />
                  <el-table-column prop="mobile" label="洗车工号码" width="250" />
                  <el-table-column prop="nickname" label="名字" width="220" />
                  <el-table-column prop="distance" label="距离" width="160" />
                  <el-table-column prop="worker_user_id" label="指派订单">
                    <template slot-scope="scope">
                      <el-button @click="dispatch(scope.row.worker_user_id)" type="primary" round size="mini">派单</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-row>
          </el-card>
        </div>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
  import {
    getInfo,
    getWorkers,
    dispatchOrder
  } from '@/api/order'
  export default {
    name: 'OrderInfo',
    props: [
      'infoVisible', 'orderId'
    ],
    data() {
      return {
        info: {},
        list: []
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:infoVisible', false)
      },
      handleOpen() {
        this.getInfo()
      },
      getInfo() {
        getInfo({
          id: this.orderId
        }).then(response => {
          this.info = response.data
          if (response.data.status == 1 && response.data.is_start == 1) {
            this.getWorkers()
          }
        })
      },
      getWorkers() {
        getWorkers({
          id: this.orderId
        }).then(response => {
          this.list = response.data.list
        })
      },
      dispatch(worker_user_id) {
        console.log(worker_user_id)
        dispatchOrder({
          worker_user_id: worker_user_id,
          id: this.orderId
        }).then(response => {
          this.$notify({
            title: '成功',
            message: '派发订单成功',
            type: 'success',
            duration: 2000
          })
          this.getInfo()
        })
      }
    }
  }
</script>

<style>
  .user-wrapper {
    width: 94%;
    margin: auto;
  }

  .id-card-image {
    height: 160px;
  }

  .licence-image {
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

  .el-drawer__body {
    overflow-y: scroll;
  }

  .info-col{
    margin-bottom: 20px;
  }
</style>

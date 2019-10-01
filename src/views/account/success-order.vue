<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.mobile" size="medium" prefix-icon="el-icon-search" placeholder="输入客户手机号码搜索"
          clearable @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="3">
        <el-input v-model="listQuery.nickname" size="medium" prefix-icon="el-icon-search" placeholder="输入客户姓名搜索"
          clearable @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="4">
        <el-input v-model="listQuery.worker_mobile" size="medium" prefix-icon="el-icon-search" placeholder="输入洗车工手机号码搜索"
          clearable @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="3">
        <el-input v-model="listQuery.worker_nickname" size="medium" prefix-icon="el-icon-search" placeholder="输入洗车工姓名搜索"
          clearable @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="6">
        <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="medium" unlink-panels
          range-separator="-" start-placeholder="发起订单开始日期" end-placeholder="发起订单结束日期" :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日" style="width: 100%;" />
      </el-col>
      <el-col :sm="4">
        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="handleFilter">
          搜索
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">

      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">

        <el-table-column label="订单编号" width="100">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewOrder(row.id)">{{ row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="客户手机号码" width="180">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewUser(row.user_id)">{{ row.mobile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="客户姓名" width="120">
          <template slot-scope="{row}">
            <span>{{ row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column label="洗车工手机号码" width="180">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewUser(row.worker_user_id)">{{ row.worker_mobile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="洗车工姓名" width="120">
          <template slot-scope="{row}">
            <span>{{ row.worker_nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column label="车辆类型" width="100">
          <template slot-scope="{row}">
            <span>{{ row.size_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="客户支付金额" width="120">
          <template slot-scope="{row}">
            <span>{{ row.money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="洗车工获取金额" width="120">
          <template slot-scope="{row}">
            <span>{{ row.worker_money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="发起时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="完成时间" min-width="180" class="fixed-width">
          <template slot-scope="{row}">
            <span>{{ row.finished_at }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <user-info :user-id="userId" :info-visible.sync="userVisible" />

    <order-info :order-id="orderId" :info-visible.sync="orderVisible" />

  </div>
</template>

<script>
  import {
    successOrder
  } from '@/api/account'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import UserInfo from '@/components/User/UserInfo'
  import OrderInfo from '@/components/Order/OrderInfo'

  export default {
    components: {
      Pagination,
      UserInfo,
      OrderInfo
    },
    directives: {
      waves,
      permission
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          sort: '-id'
        },
        userVisible: false,
        userId: 0,
        orderVisible: false,
        orderId: 0,
      }
    },
    created() {
      this.getList()
    },

    methods: {

      getList() {
        this.listLoading = true
        successOrder(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },

      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },

      handleViewUser(id) {
        this.userId = id
        this.userVisible = true
      },
      handleViewOrder(id) {
        this.orderId = id
        this.orderVisible = true
      }
    }
  }
</script>

<style lang="scss">

</style>

<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input
          v-model="listQuery.mobile"
          size="medium"
          prefix-icon="el-icon-search"
          placeholder="输入手机号码搜索"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-col>
      <el-col :sm="4">
        <el-input
          v-model="listQuery.nickname"
          size="medium"
          prefix-icon="el-icon-search"
          placeholder="输入姓名搜索"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-col>
      <el-col :sm="6">
        <el-date-picker
          v-model="listQuery.date_range"
          type="daterange"
          align="right"
          size="medium"
          unlink-panels
          range-separator="-"
          start-placeholder="支付开始日期"
          end-placeholder="支付结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          format="yyyy年 MM月 dd日"
          style="width: 100%;"
        />
      </el-col>
      <el-col :sm="5">
        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="handleFilter">
          搜索
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="手机号码" width="200">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewUser(row.user_id)">{{ row.mobile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="姓名" width="200">
          <template slot-scope="{row}">
            <span>{{ row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column label="支付时间" width="250">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="支付金额" width="200">
          <template slot-scope="{row}">
            <span>{{ row.money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="支付方式" min-width="200" class="fixed-width">
          <template slot-scope="{row}">
            <span v-if="row.type == 1">微信支付</span>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <user-info :user-id="userId" :info-visible.sync="userVisible" />

  </div>
</template>

<script>
import {
  workerDeposit
} from '@/api/account'
import waves from '@/directive/waves' // waves directive
import permission from '@/directive/permission'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import UserInfo from '@/components/User/UserInfo'

export default {
  components: {
    Pagination,
    UserInfo
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
      userId: 0
    }
  },
  created() {
    this.getList()
  },

  methods: {

    getList() {
      this.listLoading = true
      workerDeposit(this.listQuery).then(response => {
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
    }

  }
}
</script>

<style lang="scss">

</style>

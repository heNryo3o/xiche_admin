<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input
          v-model="listQuery.mobile"
          size="small"
          prefix-icon="el-icon-search"
          placeholder="输入手机号码搜索"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.type" placeholder="记录类型" size="small" clearable>
          <el-option v-for="item in typeOptions" :key="item.key" :label="item.name" :value="item.key"/>
        </el-select>
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.origin" placeholder="使用设备" size="small" clearable>
          <el-option v-for="item in originOptions" :key="item.key" :label="item.name" :value="item.key"/>
        </el-select>
      </el-col>
      <el-col :sm="6">
        <el-date-picker
          v-model="listQuery.date_range"
          type="daterange"
          align="right"
          size="small"
          unlink-panels
          range-separator="-"
          start-placeholder="记录开始日期"
          end-placeholder="记录结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          format="yyyy年 MM月 dd日"
          style="width: 100%;"
        />
      </el-col>
      <el-col :sm="5">
        <el-button v-waves type="primary" icon="el-icon-search" size="small" @click="handleFilter">
          搜索
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini"
                style="font-size: 14px;">
        <el-table-column label="编号" width="150">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="地区名称" width="150">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="简称" width="150">
          <template slot-scope="{row}">
            <span>{{ row.short_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮政编码" width="180">
          <template slot-scope="{row}">
            <span>{{ row.zip_code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拼音" width="240">
          <template slot-scope="{row}">
            <span>{{ row.pinyin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="经度" width="180">
          <template slot-scope="{row}">
            <span>{{ row.lng }}</span>
          </template>
        </el-table-column>
        <el-table-column label="纬度" width="180">
          <template slot-scope="{row}">
            <span>{{ row.lat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="全称" min-width="220" class="fixed-width">
          <template slot-scope="{row}">
            <span>{{ row.merger_name }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <user-info :user-id="userId" :info-visible.sync="infoVisible"/>

  </div>
</template>

<script>
  import {
    getList
  } from '@/api/area'
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
        typeOptions: [{
          name: '登录',
          key: 1
        },
          {
            name: '注册',
            key: 2
          }
        ],
        originOptions: [{
          name: 'pc站',
          key: 'pc'
        },
          {
            name: '手机站',
            key: 'wap'
          },
          {
            name: '小程序',
            key: 'weapp'
          },
          {
            name: '需方app',
            key: 'buyer_app'
          },
          {
            name: '供方app',
            key: 'seller_app'
          }
        ],
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          sort: '-id'
        },
        infoVisible: false,
        userId: 0
      }
    },
    created() {
      this.getList()
    },

    methods: {

      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },

      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },

      handleView(id) {
        this.userId = id
        this.infoVisible = true
      }

    }
  }
</script>

<style lang="scss">

</style>

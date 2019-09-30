<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.name" size="medium" prefix-icon="el-icon-search" placeholder="输入专家名称搜索" clearable
          @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="4">
        <el-input v-model="listQuery.mobile" size="medium" prefix-icon="el-icon-search" placeholder="输入手机号搜索" clearable
          @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" placeholder="状态" size="medium" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="6">
        <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="medium" unlink-panels
          range-separator="-" start-placeholder="创建开始日期" end-placeholder="创建结束日期" :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日" style="width: 100%;" />
      </el-col>
      <el-col :sm="7">
        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves type="success" icon="el-icon-circle-plus-outline" size="medium" @click="showInfo(0)">
          创建解决方
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="专家名" width="200">
          <template slot-scope="{row}">
            <span class="link-type" @click="showInfo(row.id)">{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="职称" width="150">
          <template slot-scope="{row}">
            <span>{{ row.professional_title }}</span>
          </template>
        </el-table-column>

        <el-table-column label="现任机构" width="120">
          <template slot-scope="{row}">
            <span>{{ row.organization }}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号" width="180">
          <template slot-scope="{row}">
            <span>{{ row.mobile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="邮箱" width="200">
          <template slot-scope="{row}">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column label="访问量" width="130">
          <template slot-scope="{row}">
            <span>{{ row.browse }}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="120">
          <template slot-scope="{row}">
            <el-tag :type="row.status == 1 ? '' : 'danger'" size="small"><span>{{ row.status == 1 ? '展示中' : '已下架' }}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves v-permission="['role/edit-role']" type="primary" size="mini" @click="showInfo(row.id)">
              修改
            </el-button>
            <el-button v-if="row.status == 1" v-waves v-permission="['role/change-status']" size="mini" type="warning"
              @click="handleChangeStatus(row,2)">
              禁用
            </el-button>
            <el-button v-else v-waves v-permission="['role/change-status']" size="mini" type="success" @click="handleChangeStatus(row,1)">
              展示
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <solution-person :id="itemId" :info-visible.sync="infoVisible" @getList="getList()" />

  </div>
</template>

<script>
  import {
    getList,
    edit,
    changeStatus
  } from '@/api/solution-person'
  import waves from '@/directive/waves'
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination'
  import SolutionPerson from '@/components/Solution/SolutionPerson'

  export default {
    components: {
      Pagination,
      SolutionPerson
    },
    directives: {
      waves,
      permission
    },
    data() {
      return {
        infoVisible: false,
        itemId: 0,
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
        statusOptions: [{
          name: '展示中',
          key: 1
        }, {
          name: '已禁用',
          key: 2
        }],
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        }
      }
    },

    created() {
      this.getList()
    },

    methods: {
      showInfo(id) {
        this.itemId = id
        this.infoVisible = true
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleChangeStatus(row, status) {
        var message = status === 1 ? '解决方启用成功' : '解决方禁用成功'
        changeStatus({
          id: row.id,
          status: status
        }).then(response => {
          this.$notify({
            title: '成功',
            message: message,
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      },

      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      }
    }
  }
</script>

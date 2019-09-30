<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.title" size="medium" prefix-icon="el-icon-search" placeholder="输入项目标题搜索"
                  clearable
                  @keyup.enter.native="handleFilter"/>
      </el-col>
      <el-col :sm="4">
        <el-input v-model="listQuery.mobile" size="medium" prefix-icon="el-icon-search" placeholder="输入用户手机号码搜索"
                  clearable
                  @keyup.enter.native="handleFilter"/>
      </el-col>
      <el-col :sm="4">
        <el-input v-model="listQuery.item_no" size="medium" prefix-icon="el-icon-search" placeholder="输入项目编号搜索"
                  clearable
                  @keyup.enter.native="handleFilter"/>
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" placeholder="项目状态" size="medium" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key"/>
        </el-select>
      </el-col>
      <el-col :sm="9">
        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves type="success" icon="el-icon-search" size="medium" @click="handleCreate()">
          创建项目
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini"
                style="font-size: 14px;">
        <el-table-column label="委托来源" width="120">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目编号" width="180">
          <template slot-scope="{row}">
            <span>{{ row.item_no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" width="150">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewOffline(row)">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类" width="180">
          <template slot-scope="{row}">
            <span>{{ row.category_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="委托人号码" width="150">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleView(row.user_id)">{{ row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" width="120">
          <template slot-scope="{row}">
            {{row.nickname}}
          </template>
        </el-table-column>
        <el-table-column label="项目状态" width="120">
          <template slot-scope="{row}">
            <el-tag type="warning" size="small" v-if="row.status == 1">
              <span>等待对接</span>
            </el-tag>
            <el-tag type="danger" size="small" v-if="row.status == 2">
              <span>审核失败</span>
            </el-tag>
            <el-tag type="success" size="small" v-if="row.status == 3">
              <span>已安排对接</span>
            </el-tag>
            <el-tag type="info" size="small" v-if="row.status == 4">
              <span>已下架</span>
            </el-tag>
            <el-tag type="info" size="small" v-if="row.status == 5">
              <span>不匹配</span>
            </el-tag>
            <el-tag size="small" v-if="row.status == 6">
              <span>对接中</span>
            </el-tag>
            <el-tag type="success" size="small" v-if="row.status == 7">
              <span>对接成功</span>
            </el-tag>
            <el-tag type="danger" size="small" v-if="row.status == 8">
              <span>对接失败</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="委托时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves type="primary" size="mini" v-permission="['role/edit-role']" @click="handleViewOffline(row)">
              编辑
            </el-button>
            <el-button v-waves v-if="row.status == 1" size="mini" v-permission="['role/change-status']" type="success"
                       @click="handleChangeStatus(row,3)">
              安排对接
            </el-button>
            <el-button v-waves v-if="row.status == 1" size="mini" v-permission="['role/change-status']" type="warning"
                       @click="handleChangeStatus(row,2)">
              驳回
            </el-button>
            <el-button v-waves v-if="row.status==3" size="mini" type="success" v-permission="['role/change-status']"
                       @click="handleChangeStatus(row,4)">
              添加合作方
            </el-button>
            <el-button v-waves v-if="row.status==3" size="mini" type="success" v-permission="['role/change-status']"
                       @click="handleViewOfflineJoin(row.id)">
              查看报名
            </el-button>
            <el-button v-waves v-if="row.status==3" size="mini" type="warning" v-permission="['role/change-status']"
                       @click="handleChangeStatus(row,4)">
              下架
            </el-button>
            <el-button v-waves v-if="row.status==2" size="mini" type="danger" v-permission="['role/destory']"
                       @click="handleDelete(row)">
              删除
            </el-button>
            <el-button v-waves v-if="row.status==4" size="mini" type="danger" v-permission="['role/destory']"
                       @click="handleDelete(row)">
              删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <user-info :user-id="userId" :info-visible.sync="infoVisible" />

    <offline-info :offlineId="offlineId" :offline-visible.sync="offlineVisible" />

    <offline-join-list :offlineId="offlineId" :offline-join-visible.sync="offlineJoinVisible" />

  </div>
</template>

<script>
  import {
    getList,
    changeStatus,
    destroy

  } from '@/api/offline'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import UserInfo from '@/components/User/UserInfo'
  import OfflineInfo from '@/components/Offline/OfflineInfo'
  import OfflineJoinList from '@/components/Offline/OfflineJoinList'

  export default {
    components: {
      Pagination,
      UserInfo,
      OfflineInfo,
      OfflineJoinList
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

        statusOptions: [{
          name: '等待对接',
          key: 1
        }, {
          name: '审核失败',
          key: 2
        },
        {
          name: '已安排对接',
          key: 3
        },
        {
          name: '已下架',
          key: 4
        },
        {
          name: '不匹配',
          key: 5
        },
        {
          name: '对接中',
          key: 6
        },
        {
          name: '对接成功',
          key: 7
        },
        {
          name: '对接失败',
          key: 8
        }],

        temp: {},
        dialogFormVisible: false,
        dialogStatus: '',
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          sort: '-id'
        },
        infoVisible: false,
        userId: 0,
        offlineVisible: false,
        offlineId: 0,
        offlineJoinVisible: false,
      }
    },
    created() {
      this.getList()
    },

    methods: {

      handleViewOffline(row) {
        this.offlineId = row.id
        this.offlineVisible = true
      },

      handleCreate() {
          this.offlineId = 0
          this.offlineVisible = true
      },

      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },

      handleView(id) {
        this.userId = id
        this.infoVisible = true
      },
      handleViewOfflineJoin(id) {
          console.log('ss')
          this.OfflineId = id
          this.offlineJoinVisible = true
      },
      handleChangeStatus(row, status) {
          var message='';
        if (status == 2) {
            message = '项目已驳回';
        }else if (status == 3) {
            message = '项目已安排对接';
        }else if (status == 4) {
            message = '项目已下架';
        }
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
      },

      resetTemp() {
        this.temp = {
          id: 0,
          status: '1',
          password: '',
          nickname: '',
          mobile: '',
          prefer: 3
        }
      },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该项目, 是否继续?', '删除项目提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                destroy({
                    id: row.id
                }).then(response => {
                    this.$notify({
                        title: '成功',
                        message: '已成功删除项目',
                        type: 'success',
                        duration: 2000
                    })
                    this.getList()
                })
            }).catch(() => {

            })
        }

    }
  }
</script>

<style lang="scss">

</style>

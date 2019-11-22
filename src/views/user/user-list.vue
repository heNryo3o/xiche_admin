<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.mobile" size="medium" prefix-icon="el-icon-search" placeholder="输入手机号码搜索"
          clearable @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" placeholder="用户状态" size="medium" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.prefer" placeholder="用户类型" size="medium" clearable>
          <el-option v-for="item in preferOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="6">
        <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="medium" unlink-panels
          range-separator="-" start-placeholder="注册开始日期" end-placeholder="注册结束日期" :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日" style="width: 100%;" />
      </el-col>
      <el-col :sm="5">
        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="handleFilter">
          搜索
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="手机号码" width="150">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleView(row.id)">{{ row.mobile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="姓名" width="150">
          <template slot-scope="{row}">
            <span>{{ row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户类型" width="150">
          <template slot-scope="{row}">
            <span v-if="row.prefer == 1">洗车工</span>
            <span v-if="row.prefer == 2">客户</span>
          </template>
        </el-table-column>

        <el-table-column label="注册时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户状态" width="120">
          <template slot-scope="{row}">
            <el-tag :type="row.status == 1 ? '' : 'danger'" size="small">
              <span>{{ row.status == 1 ? '正常' : '禁止登录' }}</span></el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-if="row.prefer == 2" v-waves v-permission="['role/edit-role']" type="primary" size="mini"
              @click="handleDeposit(row)">
              充值
            </el-button>
            <el-button v-waves v-permission="['role/edit-role']" type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button v-if="row.status == 1" v-waves v-permission="['role/change-status']" size="mini" type="warning"
              @click="handleChangeStatus(row,2)">
              禁用
            </el-button>
            <el-button v-else v-waves v-permission="['role/change-status']" size="mini" type="success" @click="handleChangeStatus(row,1)">
              启用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <user-info :user-id="userId" :info-visible.sync="infoVisible" />

    <!-- 新增/编辑用户信息弹框 -->
    <el-dialog :title="textMap[dialogStatus]" width="700px" :visible.sync="dialogFormVisible">

      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 550px; margin-left:50px;">

        <el-form-item label="手机号码">
          <el-input v-model="temp.mobile" placeholder="请填写用户手机号码" :disabled="temp.id > 0" />
        </el-form-item>

        <el-form-item label="用户姓名">
          <el-input v-model="temp.nickname" placeholder="请填写用户姓名" />
        </el-form-item>

        <el-form-item label="注册倾向">
          <el-radio v-for="item in preferOptions" :key="item.name" v-model="temp.prefer" :label="item.key" border size="small">{{ item.name }}
          </el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <div>
            <el-radio v-model="temp.status" label="1" border size="small">正常</el-radio>
            <el-radio v-model="temp.status" label="2" border size="small">禁止登录</el-radio>
          </div>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getList,
    changeStatus,
    changePassword,
    edit,
    create,
    deposit
  } from '@/api/member'
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
        statusOptions: [{
            name: '正常',
            key: 1
          },
          {
            name: '禁止登录',
            key: 2
          }
        ],
        preferOptions: [{
            name: '洗车工',
            key: 1
          },
          {
            name: '客户',
            key: 2
          }
        ],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改信息',
          create: '新增用户'
        },
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          sort: '-id'
        },
        infoVisible: false,
        temp: {},
        userId: 0
      }
    },
    created() {
      this.getList()
    },

    methods: {
      handleDeposit(row) {
        this.$prompt('请填写充值金额', '充值', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({
          value
        }) => {
          deposit({
            user_id: row.id,
            money: value
          }).then(response => {
            this.$message({
              type: 'success',
              message: '充值成功'
            })
          })
        })
      },
      sortChange(data) {
        const {
          prop,
          order
        } = data
        if (order === 'ascending') {
          this.listQuery.sort = '+' + prop
        } else {
          this.listQuery.sort = '-' + prop
        }
        this.handleFilter()
      },
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

      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {

        })
      },

      handleView(id) {
        this.userId = id
        this.infoVisible = true
      },

      handleUpdate(row) {
        this.temp = {
          id: row.id,
          nickname: row.nickname,
          mobile: row.mobile,
          password: '',
          status: row.status === 1 ? '1' : '2',
          prefer: row.prefer
        }
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {

        })
      },

      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.temp.id > 0) {
              edit(this.temp).then(response => {
                this.getList()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '修改用户信息成功',
                  type: 'success',
                  duration: 2000
                })
              })
            } else {
              create(this.temp).then(response => {
                this.getList()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '创建新用户成功',
                  type: 'success',
                  duration: 2000
                })
              })
            }
          }
        })
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

      handleChangeStatus(row, status) {
        var message = status === 1 ? '用户启用成功' : '用户禁用成功'
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
      }
    }
  }
</script>

<style lang="scss">

</style>

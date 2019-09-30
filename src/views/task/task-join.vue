<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.name" size="medium" prefix-icon="el-icon-search" placeholder="可搜索任务编号 任务标题"
                  clearable
                  @keyup.enter.native="handleFilter"/>
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.type" placeholder="分类类型" size="medium" clearable>
          <el-option v-for="item in typeOptions" :key="item.key" :label="item.name" :value="item.key"/>
        </el-select>
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" placeholder="状态" size="medium" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key"/>
        </el-select>
      </el-col>
      <el-col :sm="13">
        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves type="success" icon="el-icon-search" size="medium" @click="handleCreate">
          添加分类
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini"
                style="font-size: 14px;">
        <el-table-column label="需求编号" width="120">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="需求标题" width="180">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布者" width="150">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleView(row.id)">{{ row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道" width="150">
          <template slot-scope="{row}">
            <span>{{ row.chanel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="来源设备" width="120">
          <template slot-scope="{row}">
            <el-tag type="info" size="small">{{row.origin}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="需求状态" width="120">
          <template slot-scope="{row}">
            <el-tag :type="row.status == 1 ? '' : 'danger'" size="small">
              <span>{{ row.status == 1 ? '使用中' : '已禁用'}}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves type="primary" size="mini" v-permission="['role/edit-role']" @click="handleUpdate(row)">
              修改
            </el-button>
            <el-button v-waves v-if="row.status == 1" size="mini" v-permission="['role/change-status']" type="warning"
                       @click="handleChangeStatus(row,2)">
              禁用
            </el-button>
            <el-button v-waves v-else size="mini" type="success" v-permission="['role/change-status']"
                       @click="handleChangeStatus(row,1)">
              启用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <!-- 新增/编辑用户信息弹框 -->
    <el-dialog :title="textMap[dialogStatus]" width="700px" :visible.sync="dialogFormVisible">

      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px"
               style="width: 550px; margin-left:50px;">

        <el-form-item label="手机号码">
          <el-input v-model="temp.mobile" placeholder="请填写用户手机号码" :disabled="temp.id > 0"/>
        </el-form-item>

        <el-form-item label="用户姓名">
          <el-input v-model="temp.nickname" placeholder="请填写用户姓名"/>
        </el-form-item>

        <el-form-item label="状态">
          <div>
            <el-radio v-model="temp.status" label="1" border size="medium">启用</el-radio>
            <el-radio v-model="temp.status" label="2" border size="medium">禁用</el-radio>
          </div>
        </el-form-item>

        <el-form-item label="登录密码">
          <el-input v-model="temp.password" placeholder="不需要帮助用户修改密码时请勿填写"/>
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

    <user-info :user-id="userId" :info-visible.sync="infoVisible" />

  </div>
</template>

<script>
  import {
    getList,
    edit,
    changeStatus
  } from '@/api/task'
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
          name: '使用中',
          key: 1
        }, {
          name: '已禁用',
          key: 2
        }],
        temp: {},
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改分类信息',
          create: '新增分类'
        },
        typeOptions: [{
          name: '分类',
          key: 'cate'
        },
          {
            name: '标签',
            key: 'tag'
          },
          {
            name: '新闻分类',
            key: 'news'
          },
          {
            name: '帮助文章分类',
            key: 'faq'
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

      handleView(id) {
        this.userId = id
        this.infoVisible = true
      },

      handleChangeStatus(row, status) {
        var message = status == 1 ? '分类启用成功' : '分类禁用成功'
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

      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {

        })
      },

      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },

      handleUpdate(row) {
        this.temp = {
          id: row.id,
          nickname: row.nickname,
          mobile: row.mobile,
          password: '',
          status: row.status == 1 ? '1' : '2',
          prefer: row.prefer
        }
        Object.assign({}, row) // copy obj
        this.temp.status = this.temp.status == 1 ? '1' : '2'
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {

        })
      },

      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            edit(this.temp).then(response => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '保存用户信息成功',
                type: 'success',
                duration: 2000
              })
            })
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
      }

    }
  }
</script>

<style lang="scss">

</style>

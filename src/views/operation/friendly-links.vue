<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input
          v-model="listQuery.name"
          size="small"
          prefix-icon="el-icon-search"
          placeholder="输入网站名称搜索"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" placeholder="友链状态" size="small" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key"/>
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
          start-placeholder="创建开始日期"
          end-placeholder="创建结束日期"
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
        <el-button v-waves v-permission="['role/edit-role']" type="success" size="small" icon="el-icon-edit"
                   @click="handleCreate">
          新建友链
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini"
                style="font-size: 14px;">
        <el-table-column label="网站名称" width="250">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="链接地址" width="320">
          <template slot-scope="{row}">
            <a :href="row.url" target="_blank">{{ row.url }}</a>
          </template>
        </el-table-column>

        <el-table-column label="编辑人员" width="180">
          <template slot-scope="{row}">
            <span>{{ row.admin_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" width="210">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="友链状态" width="130">
          <template slot-scope="{row}">
            <el-tag :type="row.status == 1 ? '' : 'danger'" size="small">
              <span>{{ row.status == 1 ? '展示中' : '不展示' }}</span></el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves v-permission="['role/edit-role']" type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.status == 1"
              v-waves
              v-permission="['role/change-status']"
              size="mini"
              type="warning"
              @click="handleChangeStatus(row,2)"
            >
              取消展示
            </el-button>
            <el-button v-else v-waves v-permission="['role/change-status']" size="mini" type="success"
                       @click="handleChangeStatus(row,1)">
              展示
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <user-info :user-id="userId" :info-visible.sync="infoVisible"/>

    <!-- 新增/编辑用户信息弹框 -->
    <el-dialog :title="textMap[dialogStatus]" width="700px" :visible.sync="dialogFormVisible">

      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px"
               style="width: 550px; margin-left:50px;">

        <el-form-item label="网站名称">
          <el-input v-model="temp.name" placeholder="请填写网站名称"/>
        </el-form-item>

        <el-form-item label="网站链接">
          <el-input v-model="temp.url" placeholder="请填写可通过地址栏访问的链接地址，以http://或https://开头"/>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="temp.remarks" placeholder="请填写备注信息"/>
        </el-form-item>

        <el-form-item label="状态">
          <div>
            <el-radio v-model="temp.status" label="1" border size="small">展示</el-radio>
            <el-radio v-model="temp.status" label="2" border size="small">不展示</el-radio>
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
    edit,
    create
  } from '@/api/friendly-link'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    components: {
      Pagination
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
          name: '展示中',
          key: 1
        },
          {
            name: '不展示',
            key: 2
          }
        ],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改密码',
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
          status: row.status == 1 ? '1' : '2',
          name: row.name,
          url : row.url,
          remarks: row.remarks,
          id: row.id
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
                  message: '保存友情链接成功',
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
                  message: '添加友情链接成功',
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
          status: '1'
        }
      },

      handleChangeStatus(row, status) {
        var message = status === 1 ? '展示友链成功' : '取消展示友链成功'
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

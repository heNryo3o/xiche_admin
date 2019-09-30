<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.mobile" size="medium" prefix-icon="el-icon-search" placeholder="输入发布者手机号搜索" clearable
          @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="4">
        <el-input v-model="listQuery.nickname" size="medium" prefix-icon="el-icon-search" placeholder="输入联系人搜索" clearable
          @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="6">
        <el-date-picker
          v-model="listQuery.date_range"
          type="daterange"
          align="right"
          size="medium"
          unlink-panels
          range-separator="-"
          start-placeholder="招人信息发布开始日期"
          end-placeholder="招人信息发布结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          format="yyyy年 MM月 dd日"
          style="width: 100%;"
        />
      </el-col>
      <el-col :sm="3">
        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="handleFilter">
          搜索
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">

        <el-table-column label="联系人" width="130">
          <template slot-scope="{row}">
            <span>{{ row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号码" width="150">
          <template slot-scope="{row}">
            <span>{{ row.mobile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="岗位" width="150">
          <template slot-scope="{row}">
            <span>{{ row.category_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="预期薪资" width="150">
          <template slot-scope="{row}">
            <span>{{ row.budget }}</span>
          </template>
        </el-table-column>

        <el-table-column label="入职时间" width="150">
          <template slot-scope="{row}">
            <span>{{ row.entry_type_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="简历附件" width="150">
          <template slot-scope="{row}">
            <a :href="row.attach" download="简历附件" target="_blank" >点击下载</a>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="要求" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <span>{{ row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">

            <el-button v-waves v-permission="['seek-job/edit-seek-job']" type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button v-if="row.status == 1" v-waves v-permission="['seek-job/change-status']" size="mini" type="warning"
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

    <!-- 新增/编辑用户信息弹框 -->
    <el-dialog :title="textMap[dialogStatus]" width="700px" :visible.sync="dialogFormVisible">

      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 550px; margin-left:50px;">

        <el-form-item label="岗位分类">
          <div class="block">
            <el-cascader v-model="temp.category" :options="categoryOptions" clearable />
          </div>
        </el-form-item>
        <el-form-item label="找工作内容">
          <el-input v-model="temp.content" type="textarea" resize="vertical" :autosize="{ minRows: 3, maxRows: 10}"
            size="medium" placeholder="请填写找工作信息内容" />
        </el-form-item>

        <el-form-item label="地区">
          <div class="block">
            <el-cascader v-model="temp.area" :options="areaOptions" clearable  />
          </div>
        </el-form-item>
        <el-form-item label="预算">
          <div class="block">
            <el-select v-model="temp.budget" size="medium" clearable>
              <el-option v-for="item in budgetOptions" :key="item.key" :label="item.name" :value="item.key" />
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="期望入职时间">
          <div class="block">
            <el-select v-model="temp.entry_type" size="medium" clearable>
              <el-option v-for="item in entryTypeOptions" :key="item.key" :label="item.name" :value="item.key" />
            </el-select>
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
    edit,
    changeStatus
  } from '@/api/seek-job'
  import {
    getOptions
  } from '@/api/hire-category'
  import areaOptions from '@/assets/area.json'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import store from '@/store'

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
        userVisible: false,
        answerVisible: false,
        questionId: 0,
        userId: 0,
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
        uploadUrl: process.env.VUE_APP_BASE_API + '/system/upload',
        uploadHeaders: {
          Authorization: store.state.user.token
        },
        statusOptions: [{
          name: '展示中',
          key: 1
        }, {
          name: '已禁用',
          key: 2
        }],
        areaOptions:areaOptions,
        categoryOptions: [],
        budgetOptions: [{
            name: '薪资面议',
            key: 1
        }, {
            name: '1000元以下',
            key: 2
        },{
            name: '1000-2000元',
            key: 3
        },{
            name: '2000-3000元',
            key: 4
        },{
            name: '3000-5000元',
            key: 5
        },{
            name: '5000-8000元',
            key: 6
        },{
            name: '8000-12000元',
            key: 7
        },{
            name: '12000-20000元',
            key: 8
        },{
            name: '20000-25000元',
            key: 9
        },{
            name: '25000元以上',
            key: 10
        }],
        entryTypeOptions:[{
            name: '立即',
            key: 1
        }, {
            name: '一周内',
            key: 2
        },{
            name: '两周内',
            key: 3
        },{
            name: '月内',
            key: 4
        }],
        temp: {},
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改找工作信息',
          create: '新增分类'
        },
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          sort: '-id'
        }
      }
    },
    created() {
      this.getList()
      this.getOptions()
    },

    methods: {

      getOptions() {
        getOptions().then(response => {
          this.categoryOptions = response.data.options
        })
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleViewUser(id) {
        this.userId = id
        this.userVisible = true
      },

      handleViewAnswer(id) {
        this.questionId = id
        this.answerVisible = true
      },

      handleChangeStatus(row, status) {
        var message = status === 1 ? '找工作信息启用成功' : '找工作信息禁用成功'
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
        this.temp = Object.assign({}, row) // copy obj
        this.temp.status = this.temp.status === 1 ? '1' : '2'
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
                message: '修改找工作信息成功',
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
          status: '1'
        }
      }

    }
  }
</script>

<style lang="scss">

</style>

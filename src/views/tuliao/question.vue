<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.name" size="medium" prefix-icon="el-icon-search" placeholder="输入问题名称搜索" clearable
          @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="4">
        <el-input v-model="listQuery.mobile" size="medium" prefix-icon="el-icon-search" placeholder="输入发布者手机号搜索"
          clearable @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="4">
        <el-input v-model="listQuery.nickname" size="medium" prefix-icon="el-icon-search" placeholder="输入联系人搜索"
          clearable @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" placeholder="状态" size="medium" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="6">
        <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="medium" unlink-panels
          range-separator="-" start-placeholder="问题发布开始日期" end-placeholder="问题发布结束日期" :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日" style="width: 100%;" />
      </el-col>
      <el-col :sm="3">
        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="handleFilter">
          搜索
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="问题名称" width="200">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="提问者" width="150">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewUser(row.user_id)">{{ row.mobile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="联系人" width="120">
          <template slot-scope="{row}">
            <span>{{ row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column label="分类" width="180">
          <template slot-scope="{row}">
            <span>{{ row.category_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="关注者" width="150">
          <template slot-scope="{row}">
            <span>{{ row.collect_num }}</span>
          </template>
        </el-table-column>

        <el-table-column label="回答数" width="150">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewAnswer(row.id)">{{ row.answer_num }}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" width="180">
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
            <el-button v-waves v-permission="['role/edit-role']" type="primary" size="mini" @click="handleUpdate(row)">
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

    <!-- 新增/编辑用户信息弹框 -->
    <el-dialog :title="textMap[dialogStatus]" width="700px" :visible.sync="dialogFormVisible" :before-close="handleClose">

      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 550px; margin-left:50px;">

        <el-form-item label="问题名称">
          <el-input v-model="temp.name" placeholder="请填写问题名称" />
        </el-form-item>

        <el-form-item label="问题内容">
          <el-input v-model="temp.content" type="textarea" resize="vertical" :autosize="{ minRows: 3, maxRows: 10}"
            size="medium" placeholder="请填写问题内容" />
        </el-form-item>

        <el-form-item label="问题分类">
          <div class="block">
            <el-cascader v-model="temp.category" :options="categoryOptions" clearable />
          </div>
        </el-form-item>

        <el-form-item label="相关文件">
          <span class="demonstration">文件不宜过大，建议小于50M，最多可上传5个</span>
          <el-upload :action="uploadUrl" list-type="picture-card" :on-preview="handlePictureCardPreview" :file-list="attaches"
            :on-remove="handleRemove" :on-success="handleAttachSuccess" :before-upload="beforeUpload" :class="temp.attaches.length > 4 ? 'hide' : ''">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :modal="false">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item label="状态">
          <div>
            <el-radio v-model="temp.status" label="1" border size="medium">展示</el-radio>
            <el-radio v-model="temp.status" label="2" border size="medium">禁用</el-radio>
          </div>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false;">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <user-info :user-id="userId" :info-visible.sync="userVisible" />

    <answer-list :question-id="questionId" :answer-visible.sync="answerVisible" />

  </div>
</template>

<script>
  import {
    getList,
    edit,
    changeStatus
  } from '@/api/question'
  import {
    getOptions
  } from '@/api/question-category'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import store from '@/store'
  import UserInfo from '@/components/User/UserInfo'
  import AnswerList from '@/components/Question/AnswerList'

  export default {
    components: {
      Pagination,
      UserInfo,
      AnswerList
    },
    directives: {
      waves,
      permission
    },
    data() {
      return {
        dialogImageUrl: "",
        dialogVisible: false,
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
        categoryOptions: [],
        temp: {
          attaches: []
        },
        attaches: [],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改分类信息',
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
      handleClose() {
        this.dialogFormVisible = false
        this.attaches = []
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type ===
          'image/bmp'
        const isLt2M = file.size / 1024 / 1024 < 50

        if (!isJPG) {
          this.$message.error('只能上传图片附件！')
        }
        if (!isLt2M) {
          this.$message.error('上传图片附件大小不能超过 50MB!')
        }
        return isJPG && isLt2M
      },
      handleRemove(file, fileList) {
        this.fileChange(fileList)
      },
      handleAttachSuccess(response, file, fileList) {
        this.fileChange(fileList)
      },
      fileChange(fileList) {
        const attaches = []
        if (fileList.length > 0) {
          for (let i = 0; i < fileList.length; i++) {
            console.log(fileList[i])
            attaches[i] = {
              name: fileList[i].name,
              url: fileList[i].response ? fileList[i].response.data.preview_url : fileList[i].url
            }
          }
        }
        this.temp.attaches = attaches
        this.hideUpload = true
        console.log(this.temp.attaches.length)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
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
        var message = status === 1 ? '问题启用成功' : '问题禁用成功'
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
        this.attaches = this.temp.attaches
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
                message: '修改问题信息成功',
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
          attaches: []
        }
      }
    }
  }
</script>

<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>

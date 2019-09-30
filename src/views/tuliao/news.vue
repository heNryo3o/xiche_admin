<template>
  <div class="app-container">
    <div class="table-container">

      <el-row class="filter-container" :gutter="20">
        <el-button v-waves type="success" icon="el-icon-edit" size="medium" @click="handleCreate(2)">
          添加侧边栏模块
        </el-button>
        <el-button v-waves type="success" icon="el-icon-edit" size="medium" @click="handleCreate(4)">
          添加列表模块
        </el-button>
      </el-row>

      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="版块名称" width="200">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewList(row)">{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="类型" width="180">
          <template slot-scope="{row}">
            <span v-if="row.type === 1">banner右侧两个小块</span>
            <span v-if="row.type === 2">右侧栏小模块</span>
            <span v-if="row.type === 3">banner图</span>
            <span v-if="row.type === 4">新闻列表</span>
          </template>
        </el-table-column>

        <el-table-column label="拼音" width="150">
          <template slot-scope="{row}">
            <span>{{ row.pinyin }}</span>
          </template>
        </el-table-column>

        <el-table-column label="编辑管理员" width="120">
          <template slot-scope="{row}">
            <span>{{ row.admin_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="修改时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.updated_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="120">
          <template slot-scope="{row}">
            <el-tag :type="row.status == 1 ? '' : 'danger'" size="small"><span>{{ row.status == 1 ? '展示中' : '已下架' }}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves v-permission="['role/edit-role']" type="success" size="mini" @click="handleUpdate(row)">
              图文链接管理
            </el-button>
            <el-button v-waves v-permission="['role/edit-role']" v-if="row.type !== 3" type="primary" size="mini" @click="handleViewList(row)">
              内容管理
            </el-button>
            <el-button v-if="row.status == 1 && row.type !== 1" v-waves v-permission="['role/change-status']" size="mini"
              type="warning" @click="handleChangeStatus(row,2)">
              禁用
            </el-button>
            <el-button v-else-if="row.type !== 1" v-waves v-permission="['role/change-status']" size="mini" type="success"
              @click="handleChangeStatus(row,1)">
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

        <el-form-item label="模块名称" v-if="temp.type == 1 || temp.type === 2 || temp.type === 4">
          <el-input v-model="temp.name" placeholder="请填写简要描述" />
        </el-form-item>

        <el-form-item label="简要描述" v-if="temp.type == 1 || temp.type === 3">
          <el-input v-model="temp.describe" placeholder="请填写简要描述" />
        </el-form-item>

        <el-form-item label="图片跳转链接" v-if="temp.type == 1 || temp.type === 3">
          <div class="block">
            <el-input v-model="temp.url" placeholder="请填写图片跳转链接" />
          </div>
        </el-form-item>

        <el-form-item label="封面图" v-if="temp.type == 1 || temp.type === 3">
          <el-upload class="avatar-uploader" v-model="temp.thumb" :action="uploadUrl" :headers="uploadHeaders"
            :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="beforeUpload">
            <img v-if="temp.thumb" :src="temp.thumb" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="状态" v-if="temp.type === 2 || temp.type === 3 || temp.type === 4">
          <div>
            <el-radio v-model="temp.status" label=1 border size="medium">展示</el-radio>
            <el-radio v-model="temp.status" label=2 border size="medium">禁用</el-radio>
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

    <news-section-list :listVisible.sync="listVisible" :section-name="sectionName" :section-id="sectionId"></news-section-list>

  </div>
</template>

<script>

  import {
    getSectionList,
    changeSectionStatus,
    editSection,
    createSection
  } from '@/api/news'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import store from '@/store'
  import NewsSectionList from '@/components/News/NewsSectionList'

  export default {
    components: {
      Pagination,
      NewsSectionList
    },
    directives: {
      waves,
      permission
    },
    data() {
      return {
        sectionId: 0,
        sectionName: '',
        listVisible: false,
        previewVisible: false,
        previewImageUrl: '',
        uploadUrl: process.env.VUE_APP_BASE_API + '/system/upload',
        uploadHeaders: {},
        statusOptions: [{
          name: '展示中',
          key: 1
        }, {
          name: '已禁用',
          key: 2
        }],
        categoryOptions: [],
        temp: {},
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改信息',
          create: '新增模块'
        },
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          sort: '-id'
        }
      }
    },
    created() {
      this.uploadHeaders = {
          Authorization: store.state.user.token
        }
      this.getList()
    },

    methods: {

      getList() {
        this.listLoading = true
        getSectionList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },

      handleViewList(row) {
        this.sectionId = row.id
        this.sectionName = row.name
        this.listVisible = true
      },

      handleUploadSuccess(res) {
        this.temp.thumb = res.data.preview_url
      },
      beforeUpload() {

      },
      handlePreview(url) {
        this.previewImageUrl = url
        this.previewVisible = true
      },

      handleChangeStatus(row, status) {
        var message = status === 1 ? '模块启用成功' : '模块禁用成功'
        changeSectionStatus({
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

      handleCreate(type) {
        this.resetTemp(type)
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
            if (this.temp.id > 0) {
              editSection(this.temp).then(response => {
                this.getList()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '修改右侧栏模块成功',
                  type: 'success',
                  duration: 2000
                })
              })
            } else {
              createSection(this.temp).then(response => {
                this.getList()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '新建右侧栏模块成功',
                  type: 'success',
                  duration: 2000
                })
              })
            }
          }
        })
      },

      resetTemp(type) {
        this.temp = {
          id: 0,
          status: '1',
          type: type
        }
      }

    }
  }
</script>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

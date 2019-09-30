<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.product_name" size="medium" prefix-icon="el-icon-search" placeholder="输入产品名称搜索" clearable
          @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" placeholder="状态" size="medium" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="7">
        <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="medium" unlink-panels
          range-separator="-" start-placeholder="创建开始日期" end-placeholder="创建结束日期" :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日" style="width: 100%;" />
      </el-col>
      <el-col :sm="5">
        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves type="success" icon="el-icon-circle-plus-outline" size="medium" @click="handleCreate()">
          发布新产品
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="产品名" width="250">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleUpdate(row)">{{ row.product_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="缩略图" width="150">
          <template slot-scope="{row}">
            <el-image class="table-image" :src="row.thumb" fit="cover" @click="handlePreview(row.thumb)" />
          </template>
        </el-table-column>

        <el-table-column label="产品描述" width="350">
          <template slot-scope="{row}">
            <span>{{ row.detail }}</span>
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

    <el-dialog title="解决方产品信息" width="700px" :modal="false" @close="closeForm" :visible.sync="formVisible">

      <el-form ref="form" :model="temp" label-position="left" label-width="120px" :rules="rules" style="width: 550px; margin-left:50px;">

        <el-form-item label="产品名称" prop="product_name">
          <el-input v-model="temp.product_name" placeholder="请填写产品名称" />
        </el-form-item>

        <el-form-item label="封面图：" prop="thumb">
          <el-upload class="avatar-uploader" v-model="temp.thumb" :action="uploadUrl" :headers="uploadHeaders"
            :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="beforeUpload">
            <img v-if="temp.thumb" :src="temp.thumb" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="产品描述" prop="detail">
          <el-input v-model="temp.detail" placeholder="请填写产品描述" type="textarea" resize="vertical" :autosize="{ minRows: 3, maxRows: 10}"
            size="medium" />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <div>
            <el-radio v-model="temp.status" :label="1" border size="medium">展示中</el-radio>
            <el-radio v-model="temp.status" :label="2" border size="medium">已禁用</el-radio>
          </div>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="closeForm">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="previewVisible" :modal="false">
      <img height="400px" style="margin: auto;" :src="previewImageUrl" fit="contain">
    </el-dialog>

  </div>
</template>

<script>
  import {
    productList,
    editProduct,
    createProduct,
    productStatus
  } from '@/api/solution-company'
  import waves from '@/directive/waves'
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination
    },
    directives: {
      waves,
      permission
    },
    props: ['companyId'],
    data() {
      return {
        rules: {
          product_name: [{
              required: true,
              message: '请填写产品名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
          thumb: [{
            required: true,
            message: '请上传缩略图',
            trigger: 'blur'
          }],
          detail: [{
            required: true,
            message: '请填写产品介绍',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }]
        },
        formVisible: false,
        uploadUrl: process.env.VUE_APP_BASE_API + '/system/upload',
        uploadHeaders: {},
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
        closeForm() {
          this.formVisible = false
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
        },
        temp: {
          'status': 1,
          'thumb': ''
        },
        previewImageUrl: '',
        previewVisible: false
      }
    },
    watch: {
      companyId(val) {
        this.getList()
      }
    },
    mounted() {
      this.getList()
    },

    methods: {
      handleUploadSuccess(res) {
        this.temp.thumb = res.data.preview_url
      },
      beforeUpload() {

      },
      handlePreview(url) {
        this.previewImageUrl = url
        this.previewVisible = true
      },

      getList() {
        this.listLoading = true
        this.listQuery.company_id = this.companyId
        productList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleChangeStatus(row, status) {
        var message = status === 1 ? '产品启用成功' : '产品禁用成功'
        productStatus({
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
      resetTemp() {
        this.temp = {
          status: 1,
          product_name: '',
          thumb: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.formVisible = true
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.formVisible = true
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      },
      updateData() {
        this.temp.company_id = this.companyId
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.temp.id > 0) {
              editProduct(this.temp).then(response => {
                this.getList()
                this.closeForm()
                this.$notify({
                  title: '成功',
                  message: '修改产品信息成功',
                  type: 'success',
                  duration: 2000
                })
              })
            } else {
              createProduct(this.temp).then(response => {
                this.getList()
                this.closeForm()
                this.$notify({
                  title: '成功',
                  message: '创建产品成功',
                  type: 'success',
                  duration: 2000
                })
              })
            }
          } else {
            this.$message({
              message: '请先填写必填项，再进行提交',
              type: 'error'
            })
          }
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      }
    }
  }
</script>

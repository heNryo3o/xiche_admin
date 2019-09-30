<template>
  <div>
    <el-drawer title="解决方信息" size="75%" :visible.sync="infoVisible" :before-close="handleClose" :wrapper-closable="false"
      @open="handleOpen">
      <el-card class="box-card user-wrapper">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="1">
            <div>
              <el-card class="box-card" shadow="hover">
                <el-form ref="form" :model="info" size="medium" label-width="120px" :rules="rules">
                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="企业名称：" prop="company_name">
                        <el-input v-model="info.company_name" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="手机号码：" prop="mobile">
                        <el-input v-model="info.mobile" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="其他联系方式：" prop="other_contact">
                        <el-input v-model="info.other_contact" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="法定代表人：" prop="representative">
                        <el-input v-model="info.representative" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="注册资本：" prop="registered_capital">
                        <el-input v-model="info.registered_capital" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="成立时间：" prop="set_up_at">
                        <el-date-picker v-model="info.set_up_at" class="full-width" type="date" format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :sm="8">
                      <el-form-item label="所在地区：" prop="area">
                        <el-cascader v-model="info.area" :options="areaOptions" class="full-width" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="详细地址：" prop="address">
                        <el-input v-model="info.address" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="电子邮箱：" prop="email">
                        <el-input v-model="info.email" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" class="mb-20">
                    <el-form-item label="封面图：" prop="thumb">
                      <el-upload class="avatar-uploader" v-model="info.thumb" :action="uploadUrl" :headers="uploadHeaders"
                        :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="beforeUpload">
                        <img v-if="info.thumb" :src="info.thumb" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" />
                      </el-upload>
                    </el-form-item>
                  </el-row>
                  <el-divider>擅长领域</el-divider>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="24">
                      <el-form-item label="擅长领域：" prop="good_at">
                        <el-input v-model="info.good_at" type="textarea" resize="vertical" :autosize="{ minRows: 3, maxRows: 10}"
                          size="medium" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-divider>企业简介</el-divider>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="24">
                      <el-form-item label="企业简介：" prop="introduction">
                        <el-input v-model="info.introduction" type="textarea" resize="vertical" :autosize="{ minRows: 5, maxRows: 10}"
                          size="medium" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-divider>相关资质</el-divider>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="24">
                      <el-form-item label="相关资质：" prop="attaches">
                        <el-upload :action="uploadUrl" :headers="uploadHeaders" list-type="picture-card" :on-preview="handlePictureCardPreview"
                          :file-list="attaches" :on-remove="handleRemove" :on-success="handleAttachSuccess">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" :modal="false">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="状态：" prop="status">
                        <el-radio v-model="info.status" :label="1">展示中</el-radio>
                        <el-radio v-model="info.status" :label="2">已禁用</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :sm="2" :offset="10">
                      <el-button @click="handleClose()">取消</el-button>
                    </el-col>
                    <el-col :sm="2">
                      <el-button type="primary" @click="handleSave()">保存</el-button>
                    </el-col>
                  </el-row>

                </el-form>
              </el-card>
            </div>
          </el-tab-pane>

          <el-tab-pane label="产品介绍" name="2" v-if="id > 0">
            <product-list ref="product" :companyId="id"></product-list>
          </el-tab-pane>

        </el-tabs>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
  import {
    getInfo,
    edit,
    create
  } from '@/api/solution-company'
  import ProductList from '@/components/Solution/ProductList'
  import areaOptions from '@/assets/area.json'

  export default {
    name: 'SolutionPerson',
    props: [
      'infoVisible', 'id'
    ],
    components: {
      ProductList
    },
    data() {
      return {
        rules: {
          company_name: [{
              required: true,
              message: '请填写企业名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
          mobile: [{
            required: true,
            message: '请填写手机号码',
            trigger: 'blur'
          }],
          other_contact: [{
            required: true,
            message: '请填写其他联系方式',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '请填写邮箱地址',
            trigger: 'blur'
          }],
          representative: [{
            required: true,
            message: '请填写法定代表人',
            trigger: 'blur'
          }],
          registered_capital: [{
            required: true,
            message: '请填写注册资本',
            trigger: 'blur'
          }],
          set_up_at: [{
            required: true,
            message: '请填写成立时间',
            trigger: 'blur'
          }],
          area: [{
            required: true,
            message: '请选择地区',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请填写详细地址',
            trigger: 'blur'
          }],
          thumb: [{
            required: true,
            message: '请上传封面图',
            trigger: 'blur'
          }],
          good_at: [{
            required: true,
            message: '请填写擅长领域',
            trigger: 'blur'
          }],
          introduction: [{
            required: true,
            message: '请填写企业简介',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }]
        },
        info: {
          'status': 1,
          'attaches': []
        },
        areaOptions: areaOptions,
        activeName: '1',
        uploadUrl: process.env.VUE_APP_BASE_API + '/system/upload',
        uploadHeaders: {},
        previewVisible: false,
        previewImageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        attaches: []
      }
    },
    methods: {
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
        this.info.attaches = attaches
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleUploadSuccess(res) {
        this.info.thumb = res.data.preview_url
      },
      beforeUpload() {

      },
      handlePreview(url) {
        this.previewImageUrl = url
        this.previewVisible = true
      },

      handleClose() {
        this.resetValidate()
        this.attaches = []
        this.$emit('update:infoVisible', false)
      },
      resetValidate() {
        this.$refs['form'].resetFields()
      },
      handleOpen() {

        this.activeName = '1'
        this.attaches = []
        if (this.id > 0) {
          this.getInfo()
        } else {
          this.info = {
            'status': 1,
            'attaches': [],
            'thumb':''
          }
        }
      },
      getInfo() {
        getInfo({
          id: this.id
        }).then(response => {
          this.info = response.data
          this.attaches = this.info.attaches
        })
      },
      handleSave() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.id > 0) {
              edit(this.info).then(response => {
                this.$notify({
                  title: '解决方信息保存成功',
                  message: '成功',
                  type: 'success',
                  duration: 2000
                })
                this.$emit('getList')
                this.handleClose()
              })
            } else {
              create(this.info).then(response => {
                this.$notify({
                  title: '解决方创建成功',
                  message: '成功',
                  type: 'success',
                  duration: 2000
                })
                this.$emit('getList')
                this.handleClose()
              })
            }
          } else {
            this.$message({
              message: '请先填写必填项，再进行提交',
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style>
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

  .el-drawer__body {
    overflow-y: scroll;
  }
</style>

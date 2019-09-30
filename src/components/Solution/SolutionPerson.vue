<template>
  <div>
    <el-drawer title="解决方信息" size="75%" :visible.sync="infoVisible" :before-close="handleClose" :wrapper-closable="false"
      @open="handleOpen">
      <el-card class="box-card user-wrapper">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="1">
            <div>
              <el-card class="box-card" shadow="hover">
                <el-form ref="form" :model="info" size="medium" label-width="100px" :rules="rules">
                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="专家名字：" prop="name">
                        <el-input v-model="info.name" placeholder="请填写专家名字" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="职称：" prop="professional_title">
                        <el-input v-model="info.professional_title" placeholder="请填写职称" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="现任机构：" prop="organization">
                        <el-input v-model="info.organization" placeholder="请填写现任机构" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="邮箱：">
                        <el-input v-model="info.email" placeholder="请填写邮箱" />
                      </el-form-item>
                    </el-col>

                    <el-col :sm="8">
                      <el-form-item label="手机号：">
                        <el-input placeholder="请填写手机号码" v-model="info.mobile" />
                      </el-form-item>
                    </el-col>

                    <el-col :sm="8">
                      <el-form-item label="所在地区：" prop="area">
                        <el-cascader v-model="info.area" :options="areaOptions" placeholder="请选择地区" class="full-width" />
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
                        <el-input v-model="info.good_at" placeholder="请填写擅长领域" type="textarea" resize="vertical" :autosize="{ minRows: 3, maxRows: 10}"
                          size="medium" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-divider>专家简历</el-divider>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="24">
                      <el-form-item label="简历：" prop="resume">
                        <el-input v-model="info.resume" placeholder="请填写简历" type="textarea" resize="vertical" :autosize="{ minRows: 5, maxRows: 10}"
                          size="medium" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-divider>主要成果和获奖</el-divider>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="24">
                      <el-form-item label="主要成果：" prop="achievement">
                        <el-input v-model="info.achievement" placeholder="请填写主要成果" type="textarea" resize="vertical" :autosize="{ minRows: 5, maxRows: 10}"
                          size="medium" />
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
  } from '@/api/solution-person'
  import areaOptions from '@/assets/area.json'

  export default {
    name: 'SolutionPerson',
    props: [
      'infoVisible', 'id'
    ],
    data() {
      return {
        rules: {
          name: [{
              required: true,
              message: '请填写专家名字',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 5,
              message: '长度在 2 到 5 个字符',
              trigger: 'blur'
            }
          ],
          professional_title: [{
            required: true,
            message: '请填写职称',
            trigger: 'blur'
          }],
          organization: [{
            required: true,
            message: '请填写现任机构',
            trigger: 'blur'
          }],
          area: [{
            required: true,
            message: '请选择地区',
            trigger: 'blur'
          }],
          thumb: [{
            required: true,
            message: '请上传缩略图',
            trigger: 'change'
          }],
          good_at: [{
            required: true,
            message: '请填写擅长领域',
            trigger: 'blur'
          }],
          resume: [{
            required: true,
            message: '请填写简历',
            trigger: 'blur'
          }],
          achievement: [{
            required: true,
            message: '请填写主要成果',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }]
        },
        info: {},
        activeName: '1',
        uploadUrl: process.env.VUE_APP_BASE_API + '/system/upload',
        uploadHeaders: {},
        previewVisible: false,
        previewImageUrl: '',
        areaOptions: areaOptions,
      }
    },
    methods: {

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
        this.$refs['form'].resetFields()
        this.$emit('update:infoVisible', false)
      },
      handleOpen() {
        if (this.id > 0) {
          this.getInfo()
        } else {
          this.info = {
            'status': 1,
            'name': '',
            'professional_title': '',
            'thumb': ''
          }
        }
      },
      getInfo() {
        getInfo({
          id: this.id
        }).then(response => {
          this.info = response.data
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

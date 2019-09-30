<template>
  <div>
    <el-drawer
      :title="'项目详情 （ '+offlineId+' ）'"
      size="75%"
      :visible.sync="offlineVisible"
      :before-close="handleClose"
      :wrapper-closable="false"
      @open="handleOpen"
    >
      <el-card class="box-card user-wrapper">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="基本信息" name="1">
            <div>
              <el-card class="box-card" shadow="hover">
                <el-form ref="form" :model="info" size="medium" label-width="100px" :rules="rules">
                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="项目编号：" prop="item_no">
                        <el-input v-model="info.item_no" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="项目名称：" prop="title">
                        <el-input v-model="info.title" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="企业名称：">
                        <el-input v-model="info.company" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="联系人：">
                        <el-input v-model="info.nickname" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="手机号码：">
                        <el-input v-model="info.mobile" />
                      </el-form-item>
                    </el-col>
                  </el-row>



                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="所属分类：" prop="category">
                        <el-cascader
                          v-model="info.category"
                          class="full-width"
                          :options="categoryOptions"
                          :props="{ checkStrictly: true }"
                          clearable
                          @change="handleCategoryChange"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row v-if="tagElementOptions.length > 0 || tagProductOptions.length > 0" :gutter="10" class="mb-20">
                    <el-col v-if="tagElementOptions.length > 0" :sm="8">
                      <el-form-item label="成分标签：">
                        <el-select v-model="info.element_tag" class="full-width" multiple placeholder="请选择">
                          <el-option v-for="item in tagElementOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="tagProductOptions.length > 0" :sm="8">
                      <el-form-item label="工艺标签：">
                        <el-select v-model="info.product_tag" class="full-width" multiple placeholder="请选择">
                          <el-option v-for="item in tagProductOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>



                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="所在地：" prop="area">
                        <el-cascader v-model="info.area" :options="areaOptions" class="full-width" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="详细地址：">
                        <el-input v-model="info.address" />
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

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="24">
                      <el-form-item label="具体描述：" prop="content">
                        <el-input v-model="info.content" type="textarea" resize="vertical" :autosize="{ minRows: 3, maxRows: 10}" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-divider>附件</el-divider>


                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="24">
                      <el-form-item label="附件：" prop="attaches">
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
                      <el-form-item label="是否加急：" prop="status">
                        <el-radio v-model="info.is_urgent" :label="1">是</el-radio>
                        <el-radio v-model="info.is_urgent" :label="2">否</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="上线时间："  prop="published_at">
                        <el-date-picker
                          v-model="info.published_at"
                          type="date"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="到期时间："  prop="end_at">
                         <el-date-picker
                              v-model="info.end_at"
                              type="date"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期">
                            </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="10">
                    <el-col :sm="2" :offset="7">
                      <el-button @click="handleClose()">取消</el-button>
                    </el-col>
                    <el-col :sm="2" :offset="1">
                      <el-button type="primary" @click="handleSave()">保存</el-button>
                    </el-col>


<!--                    <el-col :sm="3" :offset="2">-->
<!--                      <el-button type="success">发布上线</el-button>-->
<!--                    </el-col>-->
<!--                    <el-col :sm="3">-->
<!--                      <el-button type="warning">先去派单</el-button>-->
<!--                    </el-col>-->
<!--                    <el-col :sm="3">-->
<!--                      <el-button type="danger">转线下对接</el-button>-->
<!--                    </el-col>-->


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
} from '@/api/offline'
import {
  relatedTags
} from '@/api/tag'
import areaOptions from '@/assets/area.json'
import categoryOptions from '@/assets/category.json'

export default {
  name: 'OfflineInfo',
  props: [
    'offlineVisible', 'offlineId'
  ],
  data() {
    return {
      rules: {
          item_no: [{
              required: true,
              message: '请填写项目编号',
              trigger: 'blur'
          }],
          title: [{
              required: true,
              message: '请填写项目名称',
              trigger: 'blur'
          }],
          category: [{
              required: true,
              message: '请选择所属分类',
              trigger: 'blur'
          }],
          area: [{
              required: true,
              message: '请选择所在地',
              trigger: 'blur'
          }],
          content: [{
              required: true,
              message: '请填写项目描述',
              trigger: 'blur'
          }],
          published_at: [{
              required: true,
              message: '请选择上线时间',
              trigger: 'blur'
          }],
          end_at: [{
              required: true,
              message: '请选择截止时间',
              trigger: 'blur'
          }],
      },
      keywordVisible: false,
      inputValue: '',
      info: {},
      tagElementOptions: [],
      tagProductOptions: [],
      areaOptions: areaOptions,
      activeName: '1',
      categoryOptions: categoryOptions,
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
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.keywordVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.info.keyword.push(inputValue)
      }
      this.keywordVisible = false
      this.inputValue = ''
    },

    handleCategoryChange() {
      this.getTagOptions(this.info.category)
    },
    getTagOptions(category) {
      relatedTags({
        'category': category
      }).then(response => {
        this.tagElementOptions = response.data.element
        this.tagProductOptions = response.data.product
      })
    },
    handleClose() {
      this.$emit('update:offlineVisible', false)
    },
    handleOpen() {

        if (this.offlineId > 0) {
            this.getInfo()
        } else {
            this.info = {
                'status': 3,
            }
        }
    },
    getInfo() {
      getInfo({
        id: this.offlineId
      }).then(response => {
        this.info = response.data
        this.attaches = this.info.attaches
        this.getTagOptions(response.data.category)
      })
    },
    handleSave() {

      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.offlineId > 0) {
              edit(this.info).then(response => {
                  this.$notify({
                      title: '信息保存成功',
                      message: '保存成功',
                      type: 'success',
                      duration: 2000
                  })
              })
          }else{
              create(this.info).then(response => {
                  this.$notify({
                      title: '信息保存成功',
                      message: '保存成功',
                      type: 'success',
                      duration: 2000
                  })
              })
          }
        }
      })
    },
    handleTabClick(tab) {
      if (tab.name === '2') {
        this.validateInfo()
      }
    }

  }
}
</script>

<style>

   .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }

  .el-drawer__body {
    overflow-y: scroll;
  }

  .el-cascader-menu__wrap {
    height: 300px;
  }

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


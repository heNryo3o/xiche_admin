<template>
  <div class="app-container">
    <el-form ref="postForm" :model="info" class="form-container">
      <div class="edit-container">
        <el-row :gutter="30">
          <el-col :span="17">
            <el-form-item style="margin-bottom: 20px;" prop="title">
              <MDinput v-model="info.title" :maxlength="100" name="name" required>
                新闻标题
              </MDinput>
            </el-form-item>
            <el-form-item prop="content">
              <Tinymce ref="editor" v-model="info.content" :height="460"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>文章设置</span>
              </div>
              <div class="edit-label">
                <span>新闻分类</span>
              </div>
              <div>
                <el-select v-model="info.category" placeholder="请选择分类" style="width: 230px;">
                  <el-option v-for="item in cateOptions" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </div>
              <div class="edit-label">
                <span>发布时间</span>
              </div>
              <div>
                <el-form-item>
                  <el-date-picker v-model="info.published_at" type="datetime" style="width: 230px;"
                                  placeholder="请选择发布时间" value-format="yyyy-MM-dd HH:mm:ss" />
                </el-form-item>
              </div>
              <div class="edit-label">
                <span>新闻状态</span>
              </div>
              <div>
                <el-form-item>
                  <div>
                    <el-radio v-model="info.status" label="1" border size="small">启用</el-radio>
                    <el-radio v-model="info.status" label="2" border size="small">停用</el-radio>
                  </div>
                </el-form-item>
              </div>
              <div class="edit-label" v-if="loaded">
                <span>封面图</span>
              </div>
              <single-upload :fileUrl="info.thumb" v-if="loaded" @uploaded="handleUploaded"/>
              <div class="edit-label">
                <span>SEO设置</span>
              </div>
              <div>
                <el-form-item>
                  <el-input v-model="info.seo_title" placeholder="请填写seo标题"/>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="info.seo_keyword" placeholder="请填写seo关键词"/>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="info.seo_desc" placeholder="请填写seo描述"/>
                </el-form-item>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="24" class="button-group">
            <el-button v-waves v-permission="['admin/edit-admin']" size="small" type="primary" icon="el-icon-check"
                       @click="handleEdit">
              保存
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission' // permission directive
  import MDinput from '@/components/MDinput'
  import Tinymce from '@/components/Tinymce'
  import SingleUpload from '@/components/Upload/SingleUpload'
  import {
    edit,
    create,
    getInfo
  } from '@/api/news'

  export default {
    name: 'NewsEdit',
    components: {
      MDinput,
      Tinymce,
      SingleUpload
    },
    directives: {
      waves,
      permission
    },
    data() {
      return {
        info: {
          id: 0,
          title: '',
          content: '',
          category: '',
          created_at: '',
          thumb: '',
          seo_title: '',
          seo_keyword: '',
          seo_desc: '',
          thumb_url: '',
          status: '1',
          published_at: ''
        },
        loading: false,
        loaded: false,
        cateOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      }
    },
    created() {
      if (this.$route.params.id > 0) {
        this.getInfo(this.$route.params.id)
      } else {
        this.loaded = true
      }
    },
    methods: {
      handleEdit() {
        if (this.info.id > 0) {
          edit(
            this.info
          ).then(response => {
            this.$notify({
              title: '成功',
              message: '编辑新闻成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          create(
            this.info
          ).then(response => {
            this.$notify({
              title: '成功',
              message: '发布新闻成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      },
      handleUploaded(thumb) {
        this.info.thumb = thumb
      },
      getInfo(id) {
        this.loading = true
        getInfo({
          id: id
        }).then(response => {
          this.info = response.data
          this.info.status = this.info.status === 1 ? '1' : '2'
          this.loading = false
          this.loaded = true
        })
      }
    }
  }
</script>

<style>
  .edit-container {
    width: 94%;
    margin: auto;
  }

  .edit-label {
    font-size: 13px;
    margin: 15px 0;
  }
</style>

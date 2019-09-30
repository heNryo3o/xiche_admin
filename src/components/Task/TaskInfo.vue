<template>
  <div>
    <el-drawer
      :title="'需求详情 （ '+taskId+' ）'"
      size="75%"
      :visible.sync="taskVisible"
      :before-close="handleClose"
      :wrapper-closable="false"
      @open="handleOpen"
    >
      <el-card class="box-card user-wrapper">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="基本信息" name="1">
            <div>
              <el-card class="box-card" shadow="hover">
                <el-form ref="form" :model="info" size="medium" label-width="100px">
                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="需求标题：">
                        <el-input v-model="info.title" />
                      </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                      <el-form-item label="联系人：">
                        <el-input v-model="info.linkman" />
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
                      <el-form-item label="企业名称：">
                        <el-input v-model="info.company" />
                      </el-form-item>
                    </el-col>

                    <el-col :sm="8">
                      <el-form-item label="发布地区：">
                        <el-cascader v-model="info.area" :options="areaOptions" class="full-width" />
                      </el-form-item>
                    </el-col>

                    <el-col :sm="8">
                      <el-form-item label="发布时间：">
                        <el-input v-model="info.created_at" readonly />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-divider>分类标签</el-divider>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="需求分类：">
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
                    <el-col :sm="24">
                      <el-form-item label="关键词：">
                        <el-tag v-for="tag in info.keyword" :key="tag" closable :disable-transitions="false" @close="handleCloseTag(tag)">
                          {{ tag }}
                        </el-tag>
                        <el-input
                          v-if="keywordVisible"
                          ref="saveTagInput"
                          v-model="inputValue"
                          class="input-new-tag"
                          size="small"
                          @keyup.enter.native="handleInputConfirm"
                          @blur="handleInputConfirm"
                        />
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新关键词</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-divider>需求描述</el-divider>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="地域要求：">
                        <el-select v-model="info.hold_areas" class="full-width" multiple placeholder="请选择">
                          <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="24">
                      <el-form-item label="背景介绍：">
                        <el-input
                          v-model="info.background"
                          type="textarea"
                          resize="vertical"
                          :autosize="{ minRows: 3, maxRows: 10}"
                          size="medium"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="24">
                      <el-form-item label="具体需求：">
                        <el-input v-model="info.content" type="textarea" resize="vertical" :autosize="{ minRows: 3, maxRows: 10}" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="需求预算/元：">
                        <el-input v-model="info.price" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-divider>需求类型</el-divider>

                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="发布类型：">
                        <el-radio v-model="info.is_company" label="1">企业发布</el-radio>
                        <el-radio v-model="info.is_company" label="2">个人发布</el-radio>
                      </el-form-item>
                    </el-col>

                    <el-col :sm="8">
                      <el-form-item label="需求类型：">
                        <el-radio v-model="info.is_test" label="2">常规需求</el-radio>
                        <el-radio v-model="info.is_test" label="1">测试需求</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" class="mb-20">
                    <el-col :sm="8">
                      <el-form-item label="到期时间：">
                         <el-date-picker
                              v-model="info.expiry_at"
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
                      <el-button>取消</el-button>
                    </el-col>
                    <el-col :sm="2" :offset="1">
                      <el-button type="primary" @click="handleSave()">保存</el-button>
                    </el-col>
                    <el-col :sm="3" :offset="2">
                      <el-button type="success">发布上线</el-button>
                    </el-col>
                    <el-col :sm="3">
                      <el-button type="warning">先去派单</el-button>
                    </el-col>
                    <el-col :sm="3">
                      <el-button type="danger">转线下对接</el-button>
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
  edit
} from '@/api/task'
import {
  relatedTags
} from '@/api/tag'
import areaOptions from '@/assets/area.json'
import categoryOptions from '@/assets/category.json'

export default {
  name: 'TaskInfo',
  props: [
    'taskVisible', 'taskId'
  ],
  data() {
    return {
      keywordVisible: false,
      inputValue: '',
      info: {},
      tagElementOptions: [],
      tagProductOptions: [],
      areaOptions: areaOptions,
      activeName: '1',
      categoryOptions: categoryOptions
    }
  },
  methods: {

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
      this.$emit('update:taskVisible', false)
    },
    handleOpen() {
      this.getInfo()
    },
    getInfo() {
      getInfo({
        id: this.taskId
      }).then(response => {
        this.info = response.data
        this.getTagOptions(response.data.category)
      })
    },
    handleSave() {
      edit(this.info).then(response => {
        this.$notify({
          title: '需求信息保存成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
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
</style>

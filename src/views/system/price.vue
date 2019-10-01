<template>
  <div>
    <el-row :gutter="20" style="text-align: center;width: 90%;margin: auto;padding-top: 30px;">
      <el-form ref="form" :model="form" size="small" label-width="150px">
        <el-col :span="12">

          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>客户价格</span>
            </div>
            <el-form-item label="小型轿车普通洗车">
              <el-input v-model="form.customer_1_1"></el-input>
            </el-form-item>
            <el-form-item label="SUV普通洗车">
              <el-input v-model="form.customer_2_1"></el-input>
            </el-form-item>
            <el-form-item label="MPV普通洗车">
              <el-input v-model="form.customer_3_1"></el-input>
            </el-form-item>
            <el-form-item label="小型轿车内外洗">
              <el-input v-model="form.customer_1_2"></el-input>
            </el-form-item>
            <el-form-item label="SUV内外洗">
              <el-input v-model="form.customer_2_2"></el-input>
            </el-form-item>
            <el-form-item label="MPV内外洗">
              <el-input v-model="form.customer_3_2"></el-input>
            </el-form-item>
            <el-form-item label="小型轿车镀膜">
              <el-input v-model="form.customer_1_3"></el-input>
            </el-form-item>
            <el-form-item label="SUV镀膜">
              <el-input v-model="form.customer_2_3"></el-input>
            </el-form-item>
            <el-form-item label="MPV镀膜">
              <el-input v-model="form.customer_3_3"></el-input>
            </el-form-item>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>洗车工收益</span>
            </div>
            <el-form-item label="小型轿车普通洗车">
              <el-input v-model="form.worker_1_1"></el-input>
            </el-form-item>
            <el-form-item label="SUV普通洗车">
              <el-input v-model="form.worker_2_1"></el-input>
            </el-form-item>
            <el-form-item label="MPV普通洗车">
              <el-input v-model="form.worker_3_1"></el-input>
            </el-form-item>
            <el-form-item label="小型轿车内外洗">
              <el-input v-model="form.worker_1_2"></el-input>
            </el-form-item>
            <el-form-item label="SUV内外洗">
              <el-input v-model="form.worker_2_2"></el-input>
            </el-form-item>
            <el-form-item label="MPV内外洗">
              <el-input v-model="form.worker_3_2"></el-input>
            </el-form-item>
            <el-form-item label="小型轿车镀膜">
              <el-input v-model="form.worker_1_3"></el-input>
            </el-form-item>
            <el-form-item label="SUV镀膜">
              <el-input v-model="form.worker_2_3"></el-input>
            </el-form-item>
            <el-form-item label="MPV镀膜">
              <el-input v-model="form.worker_3_3"></el-input>
            </el-form-item>
          </el-card>
        </el-col>
      </el-form>
    </el-row>
    <div style="text-align: center;margin-top: 20px;">
      <el-button type="primary" size="small" v-waves @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {
    getInfo,
    edit
  } from '@/api/price'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  export default {
    directives: {
      waves,
      permission
    },
    data() {
      return {
        form: {}
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        getInfo(this.listQuery).then(response => {
          this.form = response.data
        })
      },
      edit() {
        edit(this.form).then(reponse => {
          this.$notify({
            title: '成功',
            message: '修改定价成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }
  }
</script>

<style>
</style>

<template>
  <div>
    <el-row :gutter="20" style="text-align: center;width: 90%;margin: auto;padding-top: 30px;">
      <el-form ref="form" :model="form" size="small" label-width="200px">
        <el-col :span="12">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>基础设置</span>
            </div>
            <el-form-item label="洗车工收益比例">
              <el-input v-model="form.rate" placeholder="请输入洗车工收益百分比"></el-input>
            </el-form-item>
            <el-form-item label="异常订单洗车工收益">
              <el-input v-model="form.refund_rate" placeholder="请输入异常订单时洗车工收益百分比"></el-input>
            </el-form-item>
            <el-form-item label="可匹配订单距离范围(公里)">
              <el-input v-model="form.distance" placeholder="请输入可匹配订单距离范围(公里)"></el-input>
            </el-form-item>
            <el-form-item label="新用户优惠券金额">
              <el-input v-model="form.new_coupon" placeholder="请输入新用户优惠券金额"></el-input>
            </el-form-item>
            <el-form-item label="客服电话号码">
              <el-input v-model="form.phone" placeholder="请输入客服电话号码"></el-input>
            </el-form-item>
            <el-form-item label="营业开始时间">
              <el-time-select placeholder="起始时间" v-model="form.start_time" :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '24:00'
                }"
                style="width: 280px;">
              </el-time-select>
            </el-form-item>
            <el-form-item label="营业结束时间">
              <el-time-select placeholder="结束时间" v-model="form.end_time" :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '24:00',
                  minTime: form.start_time
                }"
                style="width: 280px;">
              </el-time-select>
            </el-form-item>
            <el-form-item label="服务范围">
              <el-cascader
              style="width: 280px;"
              v-model="form.chosen_areas"
                  :options="areaOptions"
                  :props="{ multiple: true }"
                  clearable></el-cascader>
            </el-form-item>
          </el-card>
          <el-card shadow="hover" style="margin-top: 20px;">
            <div slot="header" class="clearfix">
              <span>充值设置</span>
            </div>
            <el-row>
              <div style="margin-top: 20px;margin-bottom: 20px;">
                <el-card class="box-card" shadow="hover">
                  <div slot="header" class="clearfix" style="text-align: left;">
                    <el-button v-waves size="mini" type="success" @click="handleAddSku">
                      添加新档位
                    </el-button>
                  </div>
                  <div v-for="(item,index) in form.deposits" :key="index">
                    <div style="margin-bottom: 10px;text-align: left;">
                      <span style="font-size: 17px;font-weight: 600;">档位{{index+1}}</span>
                      <el-button v-waves size="mini" type="danger" style="margin-left: 20px;" @click="handleDelSku(index)">
                        删除档位
                      </el-button>
                    </div>
                    <el-form-item label="充值金额：" label-width="100px">
                      <el-input v-model="item.deposit_money" placeholder="请填写充值金额" style="width: 300px;" />
                    </el-form-item>
                    <el-form-item label="赠送金额：" label-width="100px">
                      <el-input v-model="item.give_money" placeholder="请填写赠送金额" style="width: 300px;" />
                    </el-form-item>
                  </div>
                </el-card>
              </div>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>洗车价格</span>
            </div>
            <el-form-item label="小型轿车普通洗车">
              <el-input v-model="form.customer_1_1"></el-input>
            </el-form-item>
            <el-form-item label="SUV/MPV普通洗车">
              <el-input v-model="form.customer_1_2"></el-input>
            </el-form-item>
            <el-form-item label="小型轿车内外洗">
              <el-input v-model="form.customer_2_1"></el-input>
            </el-form-item>
            <el-form-item label="SUV/MPV内外洗">
              <el-input v-model="form.customer_2_2"></el-input>
            </el-form-item>
            <el-form-item label="小型轿车镀膜">
              <el-input v-model="form.customer_3_1"></el-input>
            </el-form-item>
            <el-form-item label="SUV/MPV镀膜">
              <el-input v-model="form.customer_3_2"></el-input>
            </el-form-item>
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 20px;">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>banner设置</span>
            </div>
            <el-form-item label="c端banner：" label-width="100px">
              <el-upload class="avatar-uploader" v-model="form.c_banner" :action="uploadUrl" :show-file-list="false" :on-success="handleUploadSuccessC">
                <img v-if="form.c_banner" :src="form.c_banner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="b端banner：" label-width="100px">
              <el-upload class="avatar-uploader" v-model="form.b_banner" :action="uploadUrl" :show-file-list="false" :on-success="handleUploadSuccessB">
                <img v-if="form.b_banner" :src="form.b_banner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
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
    import areaOptions from '@/assets/area.json'
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
        form: {
          deposits: [],
          c_banner: '',
          b_banner: ''
        },
        uploadUrl: process.env.VUE_APP_BASE_API + '/system/upload',
        areaOptions: areaOptions
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      handleUploadSuccessC(res) {
        this.form.c_banner = res.data.preview_url
      },
      handleUploadSuccessB(res) {
        this.form.b_banner = res.data.preview_url
      },
      handleDelSku(index) {
        this.form.deposits.splice(index, 1)
      },
      handleAddSku() {
        this.form.deposits.push({
          deposit_money: '',
          give_money: ''
        })
      },
      getInfo() {
        getInfo(this.listQuery).then(response => {
          this.form = response.data
        })
      },
      edit() {
        edit(this.form).then(reponse => {
          this.$notify({
            title: '成功',
            message: '修改系统设置成功',
            type: 'success',
            duration: 2000
          })
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
</style>

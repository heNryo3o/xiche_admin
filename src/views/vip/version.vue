<template>
  <div class="app-container">

    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="会员名称" width="150">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleView(row.uid)">{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="优先推荐" width="130">
          <template slot-scope="{row}">
            <span>{{ row.dispatch_num }}</span>
          </template>
        </el-table-column>

        <el-table-column label="拒绝接单" width="130">
          <template slot-scope="{row}">
            <span>{{ row.deny_dispatch }}</span>
          </template>
        </el-table-column>

        <el-table-column label="通用券" width="130">
          <template slot-scope="{row}">
            <span>{{ row.free_join }}</span>
          </template>
        </el-table-column>

        <el-table-column label="上架服务数" width="130">
          <template slot-scope="{row}">
            <span>{{ row.service_num }}</span>
          </template>
        </el-table-column>

        <el-table-column label="装修等级" width="130">
          <template slot-scope="{row}">
            <span>{{ row.decorate_level }}</span>
          </template>
        </el-table-column>

        <el-table-column label="定向引流" width="130">
          <template slot-scope="{row}">
            <span>{{ row.diversion }}</span>
          </template>
        </el-table-column>

        <el-table-column label="黄金广告位" width="130">
          <template slot-scope="{row}">
            <span>{{ row.advertise }}</span>
          </template>
        </el-table-column>

        <el-table-column label="首页优秀店铺" width="130">
          <template slot-scope="{row}">
            <span>{{ row.home_recommen }}</span>
          </template>
        </el-table-column>

        <el-table-column label="原价" width="150">
          <template slot-scope="{row}">
            <span>{{ row.price }}</span>
          </template>
        </el-table-column>

        <el-table-column label="折后价" width="150">
          <template slot-scope="{row}">
            <span>{{ row.discount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves v-permission="['admin/edit-admin']" type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog title="修改会员权益版本" width="900px" :visible.sync="formVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="140px">

          <el-row :gutter="30">
            <el-col :sm="12" class="mb-30">
              <el-form-item label="优先推荐：">
                <el-input v-model="temp.dispatch_num" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" class="mb-30">
              <el-form-item label="拒绝接单：">
                <el-input v-model="temp.deny_dispatch" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" class="mb-30">
              <el-form-item label="通用券数量：">
                <el-input v-model="temp.free_join" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" class="mb-30">
              <el-form-item label="上架服务数：">
                <el-input v-model="temp.service_num" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" class="mb-30">
              <el-form-item label="装修等级：">
                <el-select v-model="temp.decorate_level" class="full-width" placeholder="请选择装修等级">
                  <el-option v-for="item in decorateOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" class="mb-30">
              <el-form-item label="定向引流期数：">
                <el-input v-model="temp.diversion" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" class="mb-30">
              <el-form-item label="黄金广告位期数：">
                <el-input v-model="temp.advertise" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" class="mb-30">
              <el-form-item label="首页优秀店铺推荐：">
                <el-input v-model="temp.home_recommen" />
              </el-form-item>
            </el-col>
            <el-col v-if="temp.level > 1" :sm="12" class="mb-30">
              <el-form-item label="原价：">
                <el-input v-model="temp.price" />
              </el-form-item>
            </el-col>
            <el-col v-if="temp.level > 1" :sm="12" class="mb-30">
              <el-form-item label="折扣价：">
                <el-input v-model="temp.discount" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="button-group">
            <el-button v-waves @click="formVisible = false">取消</el-button>
            <el-button v-waves type="primary" @click="updateData">保存</el-button>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getList,
  edit
} from '@/api/vip-version'
import waves from '@/directive/waves' // waves directive
import permission from '@/directive/permission'

export default {

  directives: {
    waves,
    permission
  },
  data() {
    return {
      decorateOptions: [{
        label: '基础装修',
        value: 1
      },
      {
        label: '精装修',
        value: 2
      },
      {
        label: '私人订制',
        value: 3
      }
      ],
      list: [],
      rules: {},
      temp: {},
      listLoading: true,
      formVisible: false
    }
  },
  created() {
    this.getList()
  },

  methods: {

    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          edit(this.temp).then(response => {
            this.getList()
            this.formVisible = false
            this.$notify({
              title: '成功',
              message: '修改会员权益成功',
              type: 'success',
              duration: 2000
            })
          })
        }
        console.log(valid)
      })
    }

  }
}
</script>

<style lang="scss">

</style>

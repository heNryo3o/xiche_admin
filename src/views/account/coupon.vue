<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="6">
        <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="medium" unlink-panels
          range-separator="-" start-placeholder="发放开始日期" end-placeholder="发放结束日期" :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日" style="width: 100%;" />
      </el-col>
      <el-col :sm="5">
        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves type="primary" size="medium" @click="handleCreate">
          发放优惠券
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="发放金额" width="200">
          <template slot-scope="{row}">
            <span>{{ row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发放时间" width="250">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="{row}">
            <el-button v-waves size="mini" type="danger" @click="destroy(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="发放优惠券" width="700px" :visible.sync="showCreateDialog">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="优惠券金额" prop="money">
          <el-input v-model="temp.money" />
        </el-form-item>

        <el-form-item label="过期时间" prop="end_at">
          <el-date-picker v-model="temp.end_at" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="showCreateDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="createCoupon()">
          确认
        </el-button>
      </div>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
  import {
    couponIndex,
    couponCreate,
    couponDestroy
  } from '@/api/account'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    components: {
      Pagination
    },
    directives: {
      waves,
      permission
    },
    data() {
      return {
        temp: {},
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
        typeOptions: [{
            name: '充值',
            key: 1
          },
          {
            name: '购买商品',
            key: 2
          }
        ],
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          sort: '-id'
        },
        userVisible: false,
        userId: 0,
        showCreateDialog: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      destroy(id) {
        couponDestroy({
          id: id
        }).then(response => {
          this.$notify({
            title: '成功',
            message: '删除优惠券成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      },
      getList() {
        this.listLoading = true
        couponIndex(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },

      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },

      handleViewUser(id) {
        this.userId = id
        this.userVisible = true
      },

      handleCreate() {
        this.showCreateDialog = true
      },
      createCoupon() {
        couponCreate({
          money: this.temp.money,
          end_at: this.temp.end_at
        }).then(response => {
          this.$notify({
            title: '成功',
            message: '发放优惠券成功',
            type: 'success',
            duration: 2000
          })
          this.showCreateDialog = false
          this.getList()
        })
      }

    }
  }
</script>

<style lang="scss">

</style>

<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input
          v-model="listQuery.title"
          size="small"
          prefix-icon="el-icon-search"
          placeholder="输入新闻标题搜索"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" size="small" placeholder="新闻状态" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="6">
        <el-date-picker
          v-model="listQuery.publish_range"
          size="small"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="发布开始日期"
          end-placeholder="发布结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          format="yyyy年 MM月 dd日"
          style="width: 100%;"
        />
      </el-col>
      <el-col :sm="11">
        <el-button v-waves type="primary" icon="el-icon-search" size="small" @click="handleFilter">
          搜索
        </el-button>
        <router-link :to="'/operation/news-edit/0'" style="margin-left: 10px;">
          <el-button v-waves v-permission="['admin/edit-admin']" size="small" type="success" icon="el-icon-edit">
            发布新闻
          </el-button>
        </router-link>
      </el-col>
    </el-row>

    <div class="table-container">
      <el-table
        v-loading="listLoading"
        size="mini"
        sort-change="handleSortChange"
        :data="list"
        border
        fit
        highlight-current-row
        style="font-size: 14px;"
        @sort-change="sortChange"
      >

        <el-table-column label="新闻标题" prop="username" width="280">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
            <el-tag v-if="row.sticky == 1" size="mini">置顶</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="分类名称" width="180">
          <template slot-scope="{row}">
            {{ row.category_name }}
          </template>
        </el-table-column>

        <el-table-column label="发布者" width="160">
          <template slot-scope="{row}">
            {{ row.admin_name }}
          </template>
        </el-table-column>

        <el-table-column label="浏览次数" width="120">
          <template slot-scope="{row}">
            <span>{{ row.browse }}</span>
          </template>
        </el-table-column>

        <el-table-column label="当前状态" width="140">
          <template slot-scope="{row}">
            <div v-if="row.status == 1">
              <el-tag size="small"><span>启用中</span></el-tag>
            </div>
            <div v-else>
              <el-tag size="small" type="danger"><span>已禁用</span></el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.published_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="340px" fixed="right" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <router-link :to="'/operation/news-edit/'+row.id">
              <el-button v-waves v-permission="['admin/edit-admin']" type="primary" size="mini">
                编辑
              </el-button>
            </router-link>
            <el-button
              v-if="row.sticky==1"
              v-waves
              v-permission="['admin/set-permission']"
              size="mini"
              type="warning"
              style="margin-left: 10px;"
              @click="handleSetSticky(row,2)"
            >
              取消置顶
            </el-button>
            <el-button
              v-else
              v-waves
              v-permission="['admin/set-permission']"
              size="mini"
              type="warning"
              style="margin-left: 10px;"
              @click="handleSetSticky(row,1)"
            >
              置顶
            </el-button>
            <el-button
              v-if="row.status == 1"
              v-waves
              v-permission="['admin/change-status']"
              size="mini"
              type="warning"
              @click="handleChangeStatus(row.id,2)"
            >
              禁用
            </el-button>
            <el-button v-else v-waves v-permission="['admin/change-status']" size="mini" type="success" @click="handleChangeStatus(row.id,1)">
              启用
            </el-button>
            <el-button v-waves v-permission="['admin/delete-admin']" size="mini" type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import {
  getList,
  cateOptions,
  changeStatus,
  setSticky,
  destroy
} from '@/api/news'
import waves from '@/directive/waves' // waves directive
import permission from '@/directive/permission' // permission directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: {
    Pagination
  },
  directives: {
    waves,
    permission
  },
  data() {
    return {
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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '-id'
      },
      newsCateOptions: [],
      statusOptions: [{
        name: '启用中',
        key: 1
      },
      {
        name: '已禁用',
        key: 2
      }
      ],
      temp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑新闻',
        create: '发布新闻'
      }
    }
  },
  created() {
    this.getList()
    this.getNewsCateOptions()
  },
  methods: {
    sortChange(data) {
      const {
        prop,
        order
      } = data
      if (order === 'ascending') {
        this.listQuery.sort = '+' + prop
      } else {
        this.listQuery.sort = '-' + prop
      }
      this.handleFilter()
    },
    getNewsCateOptions() {
      cateOptions().then(response => {
        this.newsCateOptions = response.data
      })
    },

    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        status: '1'
      }
    },

    handleChangeStatus(id, status) {
      var message = status === 1 ? '启用新闻成功' : '禁用新闻成功'
      changeStatus({
        id: id,
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

    handleSetSticky(row, status) {
      var message = status === 1 ? '置顶新闻成功' : '取消置顶新闻成功'
      setSticky({
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

    handleDelete(row) {
      this.$confirm('此操作将永久删除该新闻, 是否继续?', '删除新闻提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        destroy({
          id: row.id
        }).then(response => {
          this.$notify({
            title: '成功',
            message: '已成功删除新闻',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss">

</style>

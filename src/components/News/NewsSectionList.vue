<template>
  <div>
    <el-drawer :title="sectionName" size="75%" :visible.sync="listVisible" :before-close="handleClose" @open="handleOpen">
      <el-card class="box-card user-wrapper">

        <el-row class="filter-container" :gutter="10">
          <el-col :sm="5">
            <el-input v-model="listQuery.title" size="medium" prefix-icon="el-icon-search" placeholder="请输入新闻标题搜索"
              clearable @keyup.enter.native="handleFilter" />
          </el-col>

          <el-col :sm="3">
            <el-select v-model="listQuery.status" placeholder="状态" size="medium" clearable>
              <el-option label="展示中" :value="1" />
              <el-option label="已下架" :value="2" />
            </el-select>
          </el-col>

          <el-col :sm="6">
            <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="medium" unlink-panels
              range-separator="-" start-placeholder="添加开始日期" end-placeholder="添加结束日期" value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日"
              style="width: 100%;" />
          </el-col>

          <el-col :sm="10">
            <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="getList">
              搜索
            </el-button>
          </el-col>
        </el-row>
        <el-row class="filter-container">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>添加新文章</span>
            </div>

            <el-autocomplete v-model="news_keyword" style="width: 400px;margin-right: 20px;" value-key="title"
              :fetch-suggestions="querySearchAsync" placeholder="请输入新闻标题" @select="handleSelect" />

            <el-button v-waves type="success" icon="el-icon-circle-plus-outline" @click="addNews">
              添加
            </el-button>

          </el-card>
        </el-row>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
          <el-table-column label="新闻标题" width="350">
            <template slot-scope="{row}">
              <span>{{ row.news_title }}</span><el-tag size="mini" type="danger" v-if="row.sticky === 1">置顶</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="添加时间" width="180">
            <template slot-scope="{row}">
              <span>{{ row.created_at }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作人" width="180">
            <template slot-scope="{row}">
              <span>{{ row.admin_name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="120">
            <template slot-scope="{row}">
              <el-tag :type="row.status == 1 ? '' : 'danger'" size="small"><span>{{ row.status == 1 ? '展示中' : '已下架' }}</span></el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" min-width="200">
            <template slot-scope="{row}">
              <el-button v-waves v-permission="['role/edit-role']" v-if="row.sticky === 1" type="warning" size="mini" @click="setSticky(row.id,2)">
                取消置顶
              </el-button>
              <el-button v-waves v-permission="['role/edit-role']" v-else type="primary" size="mini" @click="setSticky(row.id,1)">
                置顶
              </el-button>
              <el-button v-if="row.status == 1" v-waves v-permission="['role/change-status']" size="mini" type="warning"
                @click="handleChangeStatus(row,2)">
                下架
              </el-button>
              <el-button v-else v-waves v-permission="['role/change-status']" size="mini" type="success" @click="handleChangeStatus(row,1)">
                上架
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
          @pagination="getList" />

      </el-card>
    </el-drawer>

    <el-dialog title="编辑回答信息" width="700px" :visible.sync="formVisible">

      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 550px; margin-left:50px;">

        <el-form-item label="回答内容">
          <el-input v-model="temp.content" type="textarea" resize="vertical" :autosize="{ minRows: 3, maxRows: 10}"
            size="medium" placeholder="请填写回答内容" />
        </el-form-item>

        <el-form-item label="状态">
          <div>
            <el-radio v-model="temp.status" label="1" border size="medium">展示</el-radio>
            <el-radio v-model="temp.status" label="2" border size="medium">禁用</el-radio>
          </div>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="formVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getNewsSectionList,
    addNewsToList,
    getList,
    changeSectionListStatus,
    setSectionListSticky
  } from '@/api/news'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: 'NewsSectionList',
    components: {
      Pagination
    },
    directives: {
      waves,
      permission
    },
    props: [
      'listVisible', 'sectionId', 'sectionName'
    ],
    data() {
      return {
        news_keyword: '',
        list: [],
        listLoading: true,
        formVisible: false,
        temp: {},
        listQuery: {
          page: 1,
          limit: 10,
          sort: '-id',
          section_id: 0
        },
        total: 0,
        userVisible: false,
        userId: 0,
        answerId: 0,
        replyVisible: false,
        chosenNewsId: 0
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:listVisible', false)
      },
      handleOpen() {
        this.getList()
      },
      handleViewUser(id) {
        this.userId = id
        this.userVisible = true
      },
      handleViewReply(id) {
        this.answer_id = id
        this.replyVisible = true
      },
      getList() {
        this.listLoading = true
        this.listQuery.section_id = this.sectionId
        getNewsSectionList(this.listQuery).then(response => {
          this.list = response.data.list
          this.listLoading = false
        })
      },
      handleChangeStatus(row, status) {
        var message = status === 1 ? '资讯上架成功' : '资讯下架成功'
        changeSectionListStatus({
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
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.status = this.temp.status === 1 ? '1' : '2'
        this.dialogStatus = 'update'
        this.formVisible = true
        this.$nextTick(() => {

        })
      },
      querySearchAsync(queryString, cb) {
        getList({
          title: this.news_keyword
        }).then(response => {
          var suggests = response.data.list
          cb(suggests)
        })
      },
      handleSelect(item) {
        this.chosenNewsId = item.id
      },
      setSticky(id, status) {
        var message = status === 1 ? '资讯设置推荐成功' : '资讯取消推荐成功'
        setSectionListSticky({
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
      addNews() {
        if (this.chosenNewsId > 0) {

          addNewsToList({
            news_id: this.chosenNewsId,
            news_section_id: this.sectionId
          }).then(response => {
            this.getList()
            this.formVisible = false
            this.$notify({
              title: '成功',
              message: '添加文章成功',
              type: 'success',
              duration: 2000
            })
          })

        } else {
          this.$notify({
            title: '添加失败',
            message: '请先选择一篇文章',
            type: 'fail',
            duration: 2000
          })
        }
      }
    }
  }
</script>

<style>
  .user-wrapper {
    width: 94%;
    margin: auto;
  }
</style>

<template>
  <div>
    <el-drawer title="线下对接报名列表" size="80%" :visible.sync="offlineJoinVisible" :before-close="handleClose" @open="handleOpen">
      <el-card class="box-card user-wrapper">
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
          <el-table-column label="姓名" width="100">
            <template slot-scope="{row}">
              <span>{{ row.nickname }}</span>
            </template>
          </el-table-column>

          <el-table-column label="手机号" width="150">
            <template slot-scope="{row}">
              <span class="link-type" @click="handleViewUser(row.user_id)">{{ row.mobile }}</span>
            </template>
          </el-table-column>

          <el-table-column label="企业名" width="120">
            <template slot-scope="{row}">
              <span>{{ row.company }}</span>
            </template>
          </el-table-column>

          <el-table-column label="店名" width="130">
            <template slot-scope="{row}">
              <span>{{ row.reply_num }}</span>
            </template>
          </el-table-column>

          <el-table-column label="vip" width="130">
            <template slot-scope="{row}">
              <span>{{ row.reply_num }}</span>
            </template>
          </el-table-column>

          <el-table-column label="报名时间" width="180">
            <template slot-scope="{row}">
              <span>{{ row.created_at }}</span>
            </template>
          </el-table-column>

          <el-table-column label="不匹配原因" width="130">
            <template slot-scope="{row}">
              <span>{{ row.reason }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="130">
            <template slot-scope="{row}">
              <span>{{ row.reply_num }}</span>
            </template>
          </el-table-column>

          <el-table-column label="供方来源" width="130">
            <template slot-scope="{row}">
              <span>{{ row.reply_num }}</span>
            </template>
          </el-table-column>

          <!--          <el-table-column label="状态" width="120">
                      <template slot-scope="{row}">
                        <el-tag :type="row.status == 1 ? '' : 'danger'" size="small"><span>{{ row.status == 1 ? '展示中' : '已下架' }}</span></el-tag>
                      </template>
                    </el-table-column> -->

          <el-table-column label="操作" min-width="200">
            <template slot-scope="{row}">
              <el-button v-waves v-permission="['role/edit-role']" type="primary" size="mini" @click="handleUpdate(row)">
                修改
              </el-button>
              <!--              <el-button v-if="row.status == 1" v-waves v-permission="['role/change-status']" size="mini" type="warning"
                              @click="handleChangeStatus(row,2)">
                              禁用
                            </el-button>
                            <el-button v-else v-waves v-permission="['role/change-status']" size="mini" type="success" @click="handleChangeStatus(row,1)">
                              展示
                            </el-button> -->
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

        <!--        <el-form-item label="状态">
                  <div>
                    <el-radio v-model="temp.status" label="1" border size="medium">展示</el-radio>
                    <el-radio v-model="temp.status" label="2" border size="medium">禁用</el-radio>
                  </div>
                </el-form-item> -->

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

    <user-info :user-id="userId" :info-visible.sync="userVisible" />

  </div>
</template>

<script>
    import {
        getList,
        edit,
        changeStatus
    } from '@/api/offline-join'
    import waves from '@/directive/waves' // waves directive
    import permission from '@/directive/permission'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import UserInfo from '@/components/User/UserInfo'

    export default {
        name: 'offlineJoinList',
        props: [
            'offlineJoinVisible', 'offlineId'
        ],
        components: {
            Pagination,
            UserInfo
        },
        directives: {
            waves,
            permission
        },
        data() {
            return {
                list: [],
                listLoading: true,
                formVisible: false,
                temp: {},
                listQuery: {
                    page: 1,
                    limit: 10,
                    sort: '-id'
                },
                total: 0,
                userVisible: false,
                userId: 0,
                answerId: 0,
                replyVisible: false
            }
        },
        methods: {
            handleClose() {
                this.$emit('update:offlineJoinVisible', false)
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
                getList({
                    question_id: this.questionId
                }).then(response => {
                    this.list = response.data.list
                    this.listLoading = false
                })
            },
            handleChangeStatus(row, status) {
                var message = status === 1 ? '回答启用成功' : '回答禁用成功'
                changeStatus({
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

            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        edit(this.temp).then(response => {
                            this.getList()
                            this.formVisible = false
                            this.$notify({
                                title: '成功',
                                message: '修改问题信息成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
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

<template>
  <div class="container" style="width:100%;">
    <!--工具栏-->
    <div class="toolbar" style="float:left; padding:18px;">
        <el-form :inline="true" :model="filters" size="small">
            <!--新增按钮-->
            <el-form-item>
               <kt-button label="新增" perms="sys:user:add" type="primary" @click="handleAdd" />    
            </el-form-item>
            <!--删除按钮-->
            <el-form-item>
                <kt-button label="删除" perms="sys:user:add" type="danger" @click="handleOneDelete" />
            </el-form-item>
        </el-form>
    </div>
    <!--表格内容栏-->
    <KtTable permsEdit="sys:user:edit" permsDelete="sys:user:delete"
        :data="pageResult" :columns="columns" 
        @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </KtTable>
    <!--新增界面-->
    <el-dialog :title="operation?'注册Focus Cloud用户':'修改Focus Cloud用户'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
        <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
            <el-form-item label="用户名" prop="loginName">
                <el-input v-model="dataForm.loginName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="dataForm.sex"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realName">
                <el-input v-model="dataForm.realName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
                <el-input v-model="dataForm.nickName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phoneNumber">
                <el-input v-model="dataForm.phoneNumber" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="dataForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="个性签名" prop="signature">
                <el-input v-model="dataForm.signature" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>

        <!--编辑界面-->
    <el-dialog :title="operation?'注册Focus Cloud用户':'修改Focus Cloud用户'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
        <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
            <el-form-item label="密码" prop="password">
                <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="dataForm.sex"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realName">
                <el-input v-model="dataForm.realName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
                <el-input v-model="dataForm.nickName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phoneNumber">
                <el-input v-model="dataForm.phoneNumber" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="dataForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="个性签名" prop="signature">
                <el-input v-model="dataForm.signature" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmitList" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>

    
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import qs from 'qs';
export default {
    components:{
            KtTable,
            KtButton
    },
    data() {
        return {
            filters: {
                name: ''
            },
            columns: [
                {prop:"loginName", label:"用户名", minWidth:40, sortable:"true"},
                {prop:"nickName", label:"昵称", minWidth:40, sortable:"true"},
                {prop:"realName", label:"姓名", minWidth:40, sortable:"true"},
                {prop:"phoneNumber", label:"电话", minWidth:40, sortable:"true"},
                {prop:"signature", label:"个性签名", minWidth:40, sortable:"true"},
                {prop:"email", label:"邮箱", minWidth:40, sortable:"true"},
                {prop:"creatDate", label:"创建时间", minWidth:40, sortable:"true"}
            ],
            pageRequest: { pageNum: 1, pageSize: 8 },
            pageResult: {},
            operation: false, // true:新增, false:编辑
            editDialogVisible: false, // 新增编辑界面是否显示
            editLoading: false,
            dataFormRules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ]
            },
            // 新增编辑界面数据
            dataForm: {
                password: 'Hydra825',
                sex: false,
                realName: 'xiaoyu',
                nickName: 'xiaoyu',
                phoneNumber: 18709214367,
                email: 'test@qq.com',
                signature: '安静只是一种表达',
            },
            deptData: [],
            deptTreeProps: {
                label: 'name',
                children: 'children'
            }
        }
    },
    methods: {
       // 获取分页数据
        findPage: function () {
            this.$api.user.findPage().then((res) => {
                this.pageResult = res.data
                this.pageResult.pageNum = res.data.pageNum
                this.pageResult.pageNum = res.data.pageSize
                this.pageResult.totalSize = res.data.total
                  //分页展示总数据
                this.pageResult.content = res.data.list
            })
        },
        // 删除用户
        handleOneDelete: function () {
            this.$api.user.handleOneDelete().then((res) => {            
                 if(res.status == 500){
                    this.$message({ message: '删除失败', type: 'error' })
                }else if(res.status == 200){
                    this.$message({ message: '删除成功', type: 'success' })
                }
            })
        },
        // 批量删除
        handleDelete: function (data) {
            this.$api.user.batchDelete(data.params).then(data.callback)
        },
        // 显示新增界面
        handleAdd: function () {
            this.editDialogVisible = true
            this.operation = true
            this.dataForm = {
                loginName: 'xiaoyuyu',
                password: 'Hydra825',
                sex: 'false',
                realName: 'xiaoyu',
                nickName: 'xiaoyu',
                phoneNumber: 18709214367,
                email: 'test@qq.com',
                signature: '安静只是一种表达',
                imageId: 'null'
            }
        },
        // 显示编辑界面
        handleEdit: function (params) {
            this.editDialogVisible = true
            delete params.row.loginName
            this.operation = false
            this.dataForm = Object.assign({}, params.row)
        },
        // 用户新增按钮
        editSubmit: function () {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true
                        let params = Object.assign({}, this.dataForm)
                        this.$api.user.save(qs.stringify(params)).then((res) => {
                            this.editLoading = false
                            if(res.status == 500){
                               this.$message({ message: res.data, type: 'error' })
                               return
                            }
                            this.$message({ message: '提交成功', type: 'success' })
                            this.$refs['dataForm'].resetFields()
                            this.editDialogVisible = false
                            this.findPage(null)
                        })
                    })
                }
            })
        },
        // 用户编辑按钮
        editSubmitList: function () {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true
                        let params = Object.assign({}, this.dataForm)
                        this.$api.user.editUser(qs.stringify(params)).then((res) => {
                            this.editLoading = false
                            if(res.status == 500){
                               this.$message({ message: res.data, type: 'error' })
                               return
                            }
                            this.$message({ message: '提交成功', type: 'success' })
                            this.$refs['dataForm'].resetFields()
                            this.editDialogVisible = false
                            this.findPage(null)
                        })
                    })
                }
            })
        },
        // 获取部门列表
        findDeptTree: function () {
            this.$api.dept.findDeptTree().then((res) => {
                this.deptData = res.data
            })
        },
        // 菜单树选中
          deptTreeCurrentChangeHandle (data, node) {
            this.dataForm.deptId = data.id
            this.dataForm.deptName = data.name
          }
    },
    mounted() {
        this.findDeptTree()
    }
}
</script>

<style scoped>

</style>
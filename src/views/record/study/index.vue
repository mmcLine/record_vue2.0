<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="学习内容" v-model="listQuery.studyContent"> </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    <el-button class="filter-item"  v-if="studyManager_btn_add"  style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" label="序号" width="65"  v-if="false"> <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template> </el-table-column>
    <el-table-column width="200" align="center" label="学习内容"> <template scope="scope">
        <span>{{scope.row.studyContent}}</span>
      </template> </el-table-column>
       <el-table-column width="200" align="center" label="目标"> <template scope="scope">
        <span>{{scope.row.aim}}</span>
      </template> </el-table-column>
       <el-table-column width="160" align="center" label="开始学习日期"> <template scope="scope">
        <span>{{scope.row.startDate}}</span>
      </template> </el-table-column>
       <el-table-column width="160" align="center" label="预计完成日期"> <template scope="scope">
        <span>{{scope.row.endDate}}</span>
      </template> </el-table-column>
       <el-table-column width="160" align="center" label="实际完成日期"> <template scope="scope">
        <span>{{scope.row.achieveDate}}</span>
      </template> </el-table-column>
       <el-table-column width="200" align="center" label="完成情况"> <template scope="scope">
        <span>{{scope.row.result}}</span>
      </template> </el-table-column>
    <el-table-column align="center" label="操作" width="150"> <template scope="scope">
        <el-button v-if="studyManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑
        </el-button>
        <el-button v-if="studyManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
        </el-button>
      </template> </el-table-column>
  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="学习内容" prop="studyContent">
        <el-input v-model="form.studyContent" placeholder="请输入学习内容"></el-input>
      </el-form-item>
        <el-form-item label="学习目标" prop="aim">
        <el-input v-model="form.aim" placeholder="请输入学习目标"></el-input>
      </el-form-item>
        <el-form-item label="开始学习日期" prop="startDate">
       <el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" 
       @change="form.startDate=$event"></el-date-picker>
      </el-form-item>
        <el-form-item label="预计完成日期" prop="endDate">
       <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" 
       @change="form.endDate=$event"></el-date-picker>
      </el-form-item>
        <el-form-item label="实际完成日期" prop="achieveDate">
       <el-date-picker type="date" placeholder="选择日期" v-model="form.achieveDate" 
       @change="form.achieveDate=$event"></el-date-picker>
      </el-form-item>
       <el-form-item label="完成情况" prop="aim">
        <el-input v-model="form.result" placeholder="请输入完成情况"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
      <el-button v-else type="primary" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj
} from 'api/record/study/index';

import { mapGetters } from 'vuex';
export default {
  name: 'order',
  data() {
    return {
      form: {
        studyContent: '',
        aim:'',
        startDate:undefined,
        endDate:undefined,
        achieveDate:undefined,
        result:''

      },
      rules: {
        studyContent: [
          {
            required: true,
            message: '请输入学习内容',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
      },
      orgOptions:[],
      dialogFormVisible: false,
      dialogStatus: '',
      studyManager_btn_edit: false,
      studyManager_btn_del: false,
      studyManager_btn_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0
    }
  },
  created() {
    this.getList();
    this.studyManager_btn_edit = this.elements['tradeTypeManager:btn_edit'];
    this.studyManager_btn_del = this.elements['tradeTypeManager:btn_del'];
    this.studyManager_btn_add = this.elements['tradeTypeManager:btn_add'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      this.listLoading = true;
      page(this.listQuery)
        .then(response => {
          this.list = response.data.rows;
          this.total = response.data.total;
          this.listLoading = false;
        })
    },
    getAllOrg(){
       this.listLoading = true;
      listAll()
        .then(response => {
          this.orgOptions=response;
          this.listLoading = false;
        })
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      getObj(row.id)
        .then(response => {
          this.form = response.data;
          this.dialogFormVisible = true;
          this.dialogStatus = 'update';
        });
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              const index = this.list.indexOf(row);
              this.list.splice(index, 1);
            });
        });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form)
            .then(() => {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
            })
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.form = {
         studyContent: '',
        aim:'',
        startDate:undefined,
        endDate:undefined,
        achieveDate:undefined,
        result:''
      };
    }
  }
}
</script>

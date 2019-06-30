<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="消费事项" v-model="listQuery.name"> </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    <el-button class="filter-item"  v-if="orderManager_btn_add"  style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" >
    <el-table-column align="center" label="序号" v-if="false"> <template scope="scope" >
          <span>{{scope.row.id}}</span>
        </template> </el-table-column>
    <el-table-column width="200" align="center" label="消费事项"> <template scope="scope">
        <span>{{scope.row.name}}</span>
      </template> </el-table-column>
    <el-table-column width="150" align="center" label="消费日期"> <template scope="scope">
            <span>{{scope.row.tradeDate}}</span>
          </template> </el-table-column>
     <el-table-column width="100" align="center" label="交易类型"> <template scope="scope">
            <span>{{scope.row.tradeTypeName}}</span>
          </template> </el-table-column>
     <el-table-column width="100" align="center" label="消费金额"> <template scope="scope">
        <span>{{scope.row.amt}}</span>
      </template> </el-table-column>
       <el-table-column width="100" align="center" label="备注"> <template scope="scope">
        <span>{{scope.row.remarks}}</span>
      </template> </el-table-column>
    <el-table-column width="180" align="center" label="创建时间"> <template scope="scope">
          <span>{{scope.row.crtTime}}</span>
        </template> </el-table-column>
    <el-table-column align="center" label="操作" width="150"> <template scope="scope">
        <el-button v-if="orderManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑
        </el-button>
        <el-button v-if="orderManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
        </el-button>
      </template> </el-table-column>
  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="消费事项" prop="name">
        <el-input v-model="form.name" placeholder="请输入消费事项" style="width:350px;"></el-input>
      </el-form-item>
      <el-form-item label="消费类型">
        <el-select class="filter-item" v-model="form.tradeType" placeholder="请选择">
          <el-option v-for="item in  tradeTypeOptions" :key="item.id" :label="item.typeName" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="消费日期" prop="tradeDate">
       <el-date-picker type="date" placeholder="选择日期" v-model="form.tradeDate" 
       @change="form.tradeDate=$event"></el-date-picker>
      </el-form-item>
        <el-form-item label="消费金额" prop="amt" style="width:380px;">
       <el-input v-model="form.amt" placeholder="请输入消费金额"></el-input>
      </el-form-item>
        <el-form-item label="备注" prop="remarks">
       <el-input v-model="form.remarks" placeholder="请输入备注"></el-input>
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
} from 'api/record/order/index';
import {
  listAll
} from 'api/record/tradetype/index';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      form: {
        name: '',
        amt: undefined,
        tradeDate:undefined,
        tradeType:undefined,
        remarks:undefined,
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入消费事项',
            trigger: 'blur'
          }
        ],
        amt:[
          {
            required:true,
            message:'请输入金额',
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
      tradeTypeOptions:[],
      dialogFormVisible: false,
      dialogStatus: '',
      orderManager_btn_edit: false,
      orderManager_btn_del: false,
      orderManager_btn_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0
    }
  },
  created() {
    this.getList();
    this.getAllTradeType();
    this.orderManager_btn_edit = this.elements['orderManager:btn_edit'];
    this.orderManager_btn_del = this.elements['orderManager:btn_del'];
    this.orderManager_btn_add = this.elements['orderManager:btn_add'];
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
    getAllTradeType(){
       this.listLoading = true;
      listAll()
        .then(response => {
          this.tradeTypeOptions=response;
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
        name: '',
        amt: undefined,
        tradeDate:undefined,
        tradeType:undefined,
        remarks:undefined,
      };
    }
  }
}
</script>

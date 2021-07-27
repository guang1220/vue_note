<template>
  <div>
    <el-container>
      <el-main>
        <p class="aside-p">文件夹</p>
        <div class="left-aside-content">
          <el-checkbox-group v-model="checkList">
            <el-collapse>
              <el-collapse-item :name="item.id" class="collapse-item" v-for="(item,index) in folderList" :key="index">
                <template slot="title">
                  <el-checkbox :label="item.id">&nbsp;</el-checkbox>
                  <span>{{ item.name }}</span>
                </template>
                <div>
                  <ul>
                    <li v-for="(note,index) in item.notes" :key="index" class="note-list" @click="noteListClick(note)">
                      <P>{{ note.title }}</P>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-checkbox-group>
        </div>
      </el-main>
      <el-footer height="80px">
        <div class="left-aside-footer">
          <el-button size="small" icon="el-icon-edit" @click="editBtn">编辑</el-button>
          <el-button size="small" icon="el-icon-delete" @click="delBtn">删除</el-button>
          <el-button size="small" @click="addFormVisible=true"><i class="el-icon-plus"></i>添加</el-button>
        </div>
      </el-footer>
    </el-container>

    <!--编辑表单-->
    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <p>重命名</p>
      <el-input v-model="name" autocomplete="off" placeholder="请输入名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateFolder">确 定</el-button>
      </div>
    </el-dialog>
    <!--    新增表单-->
    <el-dialog title="新建" :visible.sync="addFormVisible">
      <p>文件夹命名</p>
      <el-input v-model="name" autocomplete="off" placeholder="请输入名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFolder">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {deleteFolder, getFolder, updateFolder, addFolder, getFolderWithNote} from "../network";

export default {
  name: "LeftAsideMain",
  data() {
    return {
      checkList: [],
      folderList: [],
      editFormVisible: false,
      addFormVisible: false,
      name: '',
    }
  },
  created() {
    getFolderWithNote().then(res => {
      if (res.data) {
        this.folderList = res.data
      }
    })
  },
  methods: {
    delBtn() {
      if (this.checkList.length === 0) return
      this.$confirm('此操作将永久删除该文件夹, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteFolder(this.checkList).then(res => {
          if (res.data === this.checkList.length) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$router.go(0)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
      });
    },
    editBtn() {
      if (this.checkList.length !== 1) return
      this.editFormVisible = true
    },
    updateFolder() {
      if (this.checkList.length !== 1 || this.name === undefined || this.name === '') return
      this.editFormVisible = false
      let params = new URLSearchParams();
      params.append('id', this.checkList[0])
      params.append('name', this.name)
      this.name = ''
      updateFolder(params).then(res => {
        if (res.data === 1) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.$router.go(0)
        } else {
          this.$message({
            type: 'error',
            message: '修改失败!'
          });
        }
      })
    },
    addFolder() {
      this.addFormVisible = false
      let params = new URLSearchParams();
      params.append('name', this.name)
      this.name = ''
      addFolder(params).then(res => {
        if (res.data === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.$router.go(0)
        } else {
          this.$message({
            type: 'error',
            message: '添加失败!'
          });
        }
      })
    },
    noteListClick(note) {
      this.$store.commit("setCurrentNoteId", note.id);

      this.$emit('show', note);
    }
  }
}
</script>

<style lang="css" scoped>
@import "../assets/css/left_aside.css";

</style>

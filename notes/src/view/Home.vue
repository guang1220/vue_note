<template>
  <div>
    <el-container>
      <el-header height="80px">
        <Header @search="search"/>
      </el-header>

      <el-container>
        <el-aside width="400px">
          <LeftAside @show="showNote"/>
        </el-aside>

        <el-container>
          <el-main>
            <div>
              <ul class="search-ul"  v-if="!show">
                <li v-for="(item,index) in noteList" :key="index" class="note-list" @click="noteListClick(item)">
                  <P>{{ item.title }}</P>
                  <span>创建: {{ item.createTime }}</span> <span>修改: {{ item.alterTime }}</span>
                  <div class="li-content">{{ item.content }}</div>
                </li>
              </ul>
              <div class="main-content" v-if="show">
                <p>{{currentNote.title}}</p>
                <mavon-editor :ishljs="true" fontSize="18px" v-model="currentNote.content" ref="md"
                              @save="save" :toolbars="{}" style="min-height: 710px;" v-show="isEdit"/>
                <article id="article-main-page" class="article" ref="article" v-html="currentNote.html"
                         v-show="!isEdit" style="font-size: 20px">
                </article>
              </div>
            </div>
          </el-main>
          <el-footer height="80px">
            <div class="footer-content">
              <ul>
                <li>
                  <el-button @click="back"><i class="el-icon-back"></i>&nbsp;返回</el-button>
                </li>
                <li>
                  <el-button @click="isEdit=true"><i class="iconfont icon-xiugai"></i>&nbsp;&nbsp;修改内容</el-button>
                </li>
                <li>
                  <el-button @click="renameBtn"><i class="iconfont icon-zhongmingming"></i>&nbsp;&nbsp;重命名</el-button>
                </li>
                <li>
                  <el-button @click="moveBtn"><i class="iconfont icon-yidong"></i>&nbsp;&nbsp;移动</el-button>
                </li>
                <li>
                  <el-button @click="delBtn"><i class="iconfont icon-shanchu"></i>&nbsp;&nbsp;删除</el-button>
                </li>
                <li>
                  <el-button @click="addBtn"><i class="iconfont icon-xinzeng"></i>&nbsp;&nbsp;新增</el-button>
                </li>
              </ul>
            </div>
          </el-footer>
        </el-container>

      </el-container>

    </el-container>

    <!--    新增表单-->
    <el-dialog title="Note" :visible.sync="addFormVisible">
      <p>文章标题</p>
      <el-input v-model="title" autocomplete="off" placeholder="请输入文章标题"></el-input>
      <p>请选择文件夹</p>
      <el-select v-model="selectedValue" placeholder="请选择">
        <el-option v-for="item in folder" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNote">确 定</el-button>
      </div>
    </el-dialog>
    <!--移动表单-->
    <el-dialog title="Note" :visible.sync="moveFormVisible">
      <p>当前要移动的文件为:<strong style="font-size: 20px"> {{currentNote.title}}</strong></p>
      <p>请选择要移动到的文件夹</p>
      <el-select v-model="selectedValue" placeholder="请选择">
        <el-option v-for="item in folder" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="moveFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="moveNote">确 定</el-button>
      </div>
    </el-dialog>
<!--删除表单-->
    <el-dialog title="Note" :visible.sync="delFormVisible">
      <p>当前要删除的文件为:<strong style="font-size: 20px"> {{currentNote.title}}</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="delNote">确 定</el-button>
      </div>
    </el-dialog>
<!--    重命名表单-->
    <el-dialog title="Note" :visible.sync="renameFormVisible">
      <p>当前重命名的文件为:<strong style="font-size: 20px"> {{currentNote.title}}</strong></p>
      <el-input placeholder="请输入内容" v-model="reName" clearable>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="renameFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="rename">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {deleteNote, addNote, getFolder, updateNote, getNote} from "../network";
import {mapGetters} from 'vuex'
import {mavonEditor} from 'mavon-editor'
import Header from "../components/Header";
import LeftAside from "../components/LeftAside";

export default {
  name: "Home",
  components: { LeftAside, Header,mavonEditor},
  computed: {
    ...mapGetters([
      'currentNoteId',
    ])
  },

  data() {
    return {
      currentNote: {},
      show: false,
      isEdit: false,
      addFormVisible: false,
      moveFormVisible: false,
      delFormVisible:false,
      renameFormVisible:false,
      title: '',
      folder: [],
      selectedValue: '',
      noteList: [],
      reName:''
    };
  },
  methods: {
    back() {
      if (this.isEdit) this.isEdit = false;
      else if (this.show) this.show = false
    },
    delBtn() {
      if(this.currentNote.title===undefined) return
      this.delFormVisible=true
    },
    delNote(){
      this.delFormVisible=false
      deleteNote(this.currentNoteId).then(res => {
        if (res.data === 1) {
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
    },
    addBtn() {
      if (this.folder.length === 0) {
        getFolder().then(res => {
          if (res.data) {
            this.folder = res.data;
            this.addFormVisible = true;
          }
        })
      } else this.addFormVisible = true;
    },
    moveBtn() {
      if(this.currentNote.title===undefined) return
      if (this.folder.length === 0) {
        getFolder().then(res => {
          if (res.data) {
            this.folder = res.data;
            this.moveFormVisible = true;
          }
        })
      } else this.moveFormVisible = true;
    },
    addNote() {
      if (this.title === undefined || this.title === '') return
      this.addFormVisible = false
      let params = new URLSearchParams();
      params.append("title", this.title);
      params.append("folderId", this.selectedValue);
      addNote(params).then(res => {
        //返回新增note
        if (res.data) {
          this.currentNote = res.data
          this.$store.commit("setCurrentNoteId", res.data.id)
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          // this.$router.go(0)
          this.show = true;
          this.isEdit=true;
        } else {
          this.$message({
            type: 'error',
            message: '添加失败!'
          });
        }
      })
    },
    renameBtn(){
      if(this.currentNote.title===undefined) return
      this.renameFormVisible=true
    },
    moveNote() {
      this.moveFormVisible = false
      let params = new URLSearchParams();
      params.append("id", this.currentNoteId);
      params.append("folderId", this.selectedValue);
      updateNote(params).then(res => {
        if (res.data === 1) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.$router.go(0);
        } else {
          this.$message({
            type: 'error',
            message: '修改失败!'
          });
        }
      })

    },
    search(key) {
      this.show=false
      getNote(key).then(res => {
        if (res.data) {
          this.noteList = res.data;
        }
      })
    },
    noteListClick(item) {
      this.$store.commit("setCurrentNoteId", item.id);
      this.currentNote=item
      this.show = true
    },
    showNote(note) {
      this.currentNote = note;
      this.show = true
    },
    save(value, render) {
      let params = new URLSearchParams();
      params.append('id', this.currentNoteId);
      params.append('content', value);
      params.append('html', render);
      this.currentNote.html=render
      updateNote(params).then(res => {
        if (res.data === 1) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          // this.$router.go(0)
        } else {
          this.$message({
            type: 'error',
            message: '修改失败!'
          });
        }
      })
    },
    rename(){
      let params = new URLSearchParams();
      params.append('id', this.currentNoteId);
      params.append('title', this.reName);
      updateNote(params).then(res => {
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
    }
  }
}
</script>

<style lang="css" scoped>
@import "../assets/css/home.css";
</style>



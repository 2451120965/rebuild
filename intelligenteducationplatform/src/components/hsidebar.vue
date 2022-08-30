<template>
    <div class="sidebar">
        <div class="sidebar-item" :class="{ 'active-side': showedit }" @click="openedit">
           <i class="sdide-item-icon el-icon-edit-outline"></i>
           <span class="item-menu-title">布置作业</span>
           <i
              class="sdide-item-icon el-icon-arrow-down"
              :class="{ 'downtoup': showedit, 'uptodown': !showedit }"
           >
           </i>
        </div>
        <div class="edit-content" :class="{ 'noactive-sidebar-item': !showedit }">
           <div
              class="edit-item"
              @click.capture.stop="toedit(index)"
              v-for="(item, index) in editList"
              :key="index"
           >
              <p
                 class="edit-guide-item"
                 :class="{
                    'edit-guide-title': item.guidetitle,
                    'active-edit-item': !item.guidetitle && editIndex === index
                 }"
              >
                 {{ item.label }}
              </p>
           </div>
        </div>
        <div class="sidebar-item" :class="{ 'active-side': showcorrect }" @click="opencorrect">
           <i class="sdide-item-icon iconfont icon-zuoyepigai"></i>
           <span class="item-menu-title">批改作业</span>
           <i
              class="sdide-item-icon el-icon-arrow-down"
              :class="{ 'downtoup': showcorrect, 'uptodown': !showcorrect }"
           >
           </i>
        </div>
        <div class="correct-content" :class="{ 'noactive-sidebar-item': !showcorrect }">
           <div
              class='correct-item'
              v-for="item in classList"
              :key="item.id"
              @click.capture.prevent="lookClassHomework(item)"
              :class="{ 'active-correct-item': hclassid === item.id }"
           >
              <el-tooltip v-show=" item.label.length > 6" effect="light" :content="item.label" placement="right">
                 <p class="correct-guide-item">{{ item.label | classNamesubstring }}</p>
              </el-tooltip>
              <p class="correct-guide-item" v-show="item.label.length <= 6">{{ item.label }}</p>
           </div>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
     name:'hsiderbar',
     props: {
  
     },
     data() {
        return {
           editList:[
              {
                 label:'线上作业',
                 guidetitle: true,
                 id:0
              },
              {
                 label:'题库作业',
                 id:1
              },
              {
                 label:'在线试卷',
                 id:2
              },
              {
                 label:'线下作业',
                 guidetitle: true,
                 id:3
              },
              {
                 label:'任务',
                 id:4
              },
              {
                 label:'试卷',
                 id:5
              },
              {
                 label:'作文',
                 id:6
              }
           ],
           showedit: false,
           showcorrect: false,
           hclassid: 999999,
           editIndex: null
        }
     },
     computed:{
        classList() {
           return this.$store.state.session.classList;
        },
     },
     filters: {
        //限制班级名字长度显示字数为5个汉字
        classNamesubstring(classname) {
           if ( classname.length > 6 ) {
              let classnamesubstring =  classname.substr(0,5)+'…'
              return classnamesubstring
           } else return classname
        },
     },
     watch: {
        "$route"(n, o) {
           if(this.$store.state.session.frombuzhi) {
              this.$store.commit("session/frombuzhi", false);
              this.showedit = false;
              this.showcorrect = true;
              this.lookClassHomework(this.classList[0]);
           }
        }
     },
     created() {
        let hsidebarIndex = sessionStorage.getItem("hsidebar");
        let hclassid = sessionStorage.getItem("hclassid");
        let editIndex = sessionStorage.getItem("editIndex");
        if(editIndex) { // 选中布置的作业类型
           this.editIndex = editIndex * 1;
        }
        if(hsidebarIndex * 1 === 0) {
           this.showedit = true;
        } else {
           this.showcorrect = true;
        }
        if(hclassid && this.classList) { // 选中查看的班级
           let index = this.classList.findIndex((item, index) => {
              return item.id === hclassid * 1;
           });
           if(index > -1) this.hclassid = hclassid * 1;
        }
     },
     methods: {
        openedit() {
           this.showedit = !this.showedit;
           if(this.showedit) {
              this.toedit(this.editIndex);
              sessionStorage.setItem("hsidebar", 0);
              this.showcorrect = false;
           }
        },
        opencorrect() {
           this.showcorrect = !this.showcorrect;
           if(this.showcorrect) {
              sessionStorage.setItem("hsidebar", 1);
              this.showedit = false;
              if(this.$route.name !== "assigndetail") { // 切换查看班级
                 this.$router.push('/homework/assigndetail');
              }
           }
        },
        lookClassHomework(item) {
           sessionStorage.setItem("hclassid", item.id);
           this.$store.commit('session/hclassid', item);
           this.hclassid = item.id;
           if(this.$route.name !== "assigndetail") { // 切换查看班级
              this.$router.push('/homework/assigndetail');
           }
        },
        toedit(index) {
           if(![0,3].includes(index)) {
              this.editIndex = index;
              sessionStorage.setItem("editIndex", index);
           }
           if(index === 1) {
              if(!this.$route.path.includes('/bankoperation')) this.$router.push('/homework/bankoperation')
           } else if(index === 2) {
              if(!this.$route.path.includes('/paperpractise')) this.$router.push('/homework/paperpractise')
           } else if(index === 4) {
              if(!this.$route.path.includes('/assigntask')) this.$router.push('/homework/assigntask')
           } else if(index === 5) {
              if(!this.$route.path.includes('/paperkindLists')) this.$router.push('/homework/paperkindLists')
           } else if(index === 6) {
              if(!this.$route.path.includes('/assignLetter')) this.$router.push('/homework/assignLetter')
           }
        }
     }
  }
  </script>
  
  <style lang='scss' scoped>
     .downtoup {
        transform: rotate(-180deg);
        transition: all .3s;
     }
     .uptodown {
        transform: rotate(0);
        transition: all .3s;
     }
     .sidebar {
        width: 160px;
        display: block;
        background-color:#324157;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        padding-bottom: 60px;
        overflow-y: auto;
        &::-webkit-scrollbar {
           width: 10px; /*滚动条宽度*/
           height: 10px; /*滚动条高度*/
        }
        &::-webkit-scrollbar-track {
           /*滚动条的背景区域的内阴影*/
           box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
           /*滚动条的背景区域的圆角*/
           border-radius: 5px;
           /*滚动条的背景颜色*/
           background-color: #324157;
        }
        &::-webkit-scrollbar-thumb {
           /*滚动条的内阴影*/
           box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
           /*滚动条的圆角*/
           border-radius: 5px;
           /*滚动条的背景颜色*/
           background-color: #415572;
        }
        .sidebar-item {
           height: 54px;
           cursor: pointer;
           display: flex;
           justify-content: center;
           align-items: center;
           // &:hover {
           //    background-color: #435674;
           // }
           .sdide-item-icon {
              font-size: 15px;
              color: rgb(191, 203, 217);
           }
           .item-menu-title {
              font-size: 16px;
              color: rgb(191, 203, 217);
              margin-left: 5px;
              margin-right: 10px;
           }
        }
        .edit-content {
           transition: all .3s;
           overflow: hidden;
           .edit-item {
              .edit-guide-item {
                 padding-left: 60px;
                 padding-top: 10px;
                 padding-bottom: 10px;
                 font-size: 15px;
                 cursor: pointer;
                 color: #fff;
              }
              .edit-guide-title {
                 font-size: 14px;
                 color: #5e6b85;
                 padding: 10px 0 10px 45px;
                 cursor: default;
              }
              .active-edit-item {
                 color: #5cb6ff;
              }
           }
        }
        .correct-content {
           transition: all .3s;
           overflow: hidden;
           .correct-item {
              .correct-guide-item {
                 display: inline-block;
                 padding-left: 45px;
                 padding-top: 20px;
                 font-size: 15px;
                 cursor: pointer;
                 color: #fff;
              }
           }
           .active-correct-item {
              .correct-guide-item {
                 color: #5cb6ff !important;
              }
           }
        }
        .noactive-sidebar-item {
           height: 0;
           transition: all .3s;
        }
        .active-side {
           background-color: #324157;
        }
     }
  </style>
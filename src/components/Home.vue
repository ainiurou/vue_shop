<template>
<el-container class="home-container">
  <!-- 头部区域 -->
  <el-header>
    <div>
      <img src="" alt="">
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
  <el-container>
    <!-- 侧边栏区域 -->
    <el-aside :width="isCollapse?'64px':'200px'" >
      <div class="togglebutton" @click="toggleCollapse">|||</div>
      <!--只开一个菜单，侧边的折叠与展开 -->
      <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath"> 
        <el-submenu :index="item.id + ''" width="200px" v-for="item in menulist" :key="item.id">
          <!-- 这个 template 是一级菜单的内容模板 -->
          <template slot="title">
            <i :class="iconObj[item.id]"></i>
            <span>{{ item.authName }}</span>
          </template>
      <!-- 在一级菜单中，可以嵌套二级菜单 -->
          <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)" > 
            <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ subItem.authName}}</span>
            </template>
          </el-menu-item> 
        </el-submenu> 
      </el-menu>
      </el-aside>
        <!-- 右侧主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
      <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    logOut(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
//获取所有的菜单
async getMenuList(){
   const{ data:res}= await this.$http.get('menus')
  if (res.meta.status !==200) return this.$message.error(res.meta.msg)
  this.menulist = res.data
  console.log(res)
},
//点击按钮切换菜单的折叠与展开
toggleCollapse(){
  this.isCollapse = !this.isCollapse
},
//保持连接的激活状态
saveNavState(activePath){
  window.sessionStorage.setItem('activePath',activePath)
  this.activePath = activePath
}
  },
created() {
this.getMenuList(),
this.activePath = window.sessionStorage.getItem('activePath')
},
   data() {
       return{
      menulist:[],
      iconObj:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      },
      //是否折叠
      isCollapse:false,
      activePath :''     
       }
   } 
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%
}

.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  color:#fff;
  font-size: 20px;
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #EAEDF1;
}
.togglebutton{
  background-color: #4a5064;
  font-size:10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer
}
.iconfont{
  margin-right: 20px;
}

</style>

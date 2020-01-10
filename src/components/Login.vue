<template >
 <div class="login_container">
     <div class="login_box">
<!-- 头像区域 -->
    <div class="avatar_box">
<img src="../assets/logo.png" alt="">
    </div>
    <!-- 登陆表单区域 -->
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
<!-- 用户名 -->
<el-form-item prop="username">
    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
</el-form-item>
<!-- 密码 -->
<el-form-item prop="password">
    <el-input v-model="loginForm.password" prefix-icon ="iconfont icon-3702mima" type="password"></el-input>
</el-form-item>
<!-- 按钮区域 -->
<el-form-item class="btns">
    <el-button type="primary" @click="login">登陆</el-button>
    <el-button type="info" @click="resetLoginForm">重置</el-button>
</el-form-item>
    </el-form>
     </div>
</div>
</template>
<script>
export default {
    data(){
        return{
//登陆表单的数据绑定对象
loginForm:{
    username:'admin',
    password:'123456'
},
//表单的验证规则对象
loginFormRules:{
    username: [
        {required: true, message:'请输入', trigger: 'blur'},
        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    //验证密码是否合法
    password: [
        {required: true, message:'请输入', trigger: 'blur'},
        {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
    ]
}
        }
    },
    methods: {
        //点击重置按钮，重置登录表单
        resetLoginForm() {
            //console.log(this.$refs.loginFormRef)
            this.$refs.loginFormRef.resetFields()
        },
        login() {
            // validate方法返回boolean,project;Function(callback,Function(boolean,project));
            this.$refs.loginFormRef.validate(async valid =>{
                if (!valid) return;
                // 从AXIOS中返回的真实数据在data中，重新把返回值res赋值给data，
                // 通过axios传过来的是一个promise，所以用async,await,简化
                const { data: res } = await this.$http.post('login',this.loginForm);
                if (res.meta.status !==200) return this.$message.error('登陆失败！');
                this.$message.success('登陆成功!');
                window.sessionStorage.setItem('token', res.data.token)
                this.$router.push('/home')
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}
.login_box {
    background-color: #fff;
    border-radius: 3px;
    height: 300px;
    width: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-225px,-150px);

.avatar_box {
    height: 130px;
    width: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    padding: 10px;
    //h-shadow:水平阴影位置，v-shadow:垂直阴影的位置，blur:模糊距离,
    //spread:阴影的尺寸，color:阴影的颜色
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-76px,-76px);
    background-color: #fff;
    img{
        height: 100%;
        width:100%;
        border-radius: 50%;
    }
}
}
.login_form {
    position:absolute;
    bottom:0;
    width:100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;  // 弹性布局 
    justify-content: flex-end;
}





</style>
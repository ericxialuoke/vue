<template>
    <div class="poster">
        <el-form class="login-container" label-position="left"
                 label-width="0px">
            <h3 class="login_title">系统登录</h3>
            <el-form-item>
                <el-input type="text" v-model="loginForm.username"
                          auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="loginForm.password"
                          auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    username:'admin',
                    password:'123'
                },
                responseResult:[]
            }
        },
        methods:{
            login(){
                this.$axios.post('/login',{
                    username:this.loginForm.username,
                    password:this.loginForm.password
                }).then((response)=>{
                   if(response.data.code==200)
                   {
                       this.$store.commit('login',this.loginForm)
                       var path = this.$route.query.redirect
                       this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                   }

                })
            }
        }
    }
</script>

<style scoped>
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .poster{
        background:url("../assets/eva.jpg");
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
    }
</style>

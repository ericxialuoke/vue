<template>
    <el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item  v-for="(item,index) in navList" :key="index" :index="item.name">
            {{item.navItem}}
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "NavMenu",
        data() {
        return{
            navList:[
                {name: '/index', navItem: '首页'},
                {name: '/jotter', navItem: '笔记本'},
                {name: '/library', navItem: '图书馆'},
                {name: '/admin', navItem: '个人中心'}
            ]
        }
    }
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <el-input v-model="input">
        </el-input>
        <el-button>搜索</el-button>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        data(){
            return{
                input:''
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <el-menu
            @select="handleSelect"
            default-active="0"
            class="categories"
            active-text-color="red">
        <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">全部</span>
        </el-menu-item>
        <el-menu-item v-for="(item,index) in categories" :key="index" :index="item.id.toString()">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.name}}</span>
        </el-menu-item>

    </el-menu>
</template>

<script>
    export default {
        name: "SideMenu",
        data() {
            return{
                categories:[]
            }
        },
        created() {
            this.loadCategories()
        },
        methods:{
          loadCategories(){
              this.$axios.get('/categories').then((response)=>{
                  this.categories=response.data
              })
          },
            handleSelect(index){
              this.$emit('indexSelect',index)
            }
        }
    }
</script>

<style scoped>
.categories{

}
</style>

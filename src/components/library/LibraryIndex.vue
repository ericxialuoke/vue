<template>
    <el-container>
        <el-aside>
            <side-menu @indexSelect="listByCategory"></side-menu>
        </el-aside>
        <el-main>
            <books ref="booksArea"></books>
        </el-main>
    </el-container>
</template>

<script>
    import SideMenu from "./SideMenu";
    import Books from "./Books";
    export default {
        name: "LibraryIndex",
        components:{
            SideMenu,
            Books
        },
        methods:{
            listByCategory(value){
                // var cid=this.$refs.sideMenu.$refs.menu.index
                const url='/categories/'+value+'/books'
                this.$axios.get(url).then((response)=>{
                    this.$refs.booksArea.books=response.data
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>

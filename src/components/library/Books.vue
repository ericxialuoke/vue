<template>
    <div>
        <el-row style="height: 840px">
                    <search-bar></search-bar>
            <el-tooltip v-for="(item,index) in books" :key="index" effect="dark" placement="right">
                <p slot="content" style="font-size: 12px">{{item.title}}</p>
                <p slot="content" style="font-size: 12px">
                    <span>{{item.author}}/</span>
                    <span>{{item.date}}/</span>
                    <span>{{item.press}}</span>
                </p>
                <p slot="content" style="width: 300px;line-height: 17px">{{item.abs}}</p>
                <el-card style="width: 135px;height: 233px;margin-bottom: 20px;margin-right: 20px;float:left" :body-style="{padding: '10px'}" shadow="hover">
                    <div style="cursor: pointer" @click="editBook(item)">
                        <img :src="item.cover" alt="封面">
                    </div>
                    <div>
                        <div style="font-size: 12px; text-align: left">{{item.title}}</div>
                        <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
                    </div>
                    <div style="font-size: 12px; text-align: left">{{item.author}}</div>
                </el-card>
            </el-tooltip>
            <edit-form @onSubmit="loadBooks" ref="editOrUpdate"></edit-form>
        </el-row>
        <el-row>
            <el-pagination
                    :current-page="1"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000">
            </el-pagination>
        </el-row>
    </div>

</template>

<script>
    import EditForm from "./EditForm";
    import SearchBar from "./SearchBar";
    export default {
        name: "Books",
        components: {
            EditForm,
            SearchBar
        },
        // component:{
        //     EditForm
        // },
        data(){
            return{
                books:[]
            }
        },
        created() {
        this.loadBooks()
    },
        methods:{
            loadBooks() {
                this.$axios.get('/books').then((response)=>{
                    // console.log(response.data)
                    this.books=response.data
                })
            },
            deleteBook(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.$axios.post('/delete',{id:id}).then(()=>{
                        this.loadBooks()
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'已取消删除'
                    })
                })
            },
            editBook(item){
                this.$refs.editOrUpdate.dialogFormVisible=true
                this.$refs.editOrUpdate.form={
                    id: item.id,
                    title: item.title,
                    author: item.author,
                    date: item.date,
                    press: item.press,
                    cover: item.cover,
                    abs: item.abs,
                    category:{
                        id: item.category.id,
                        name: item.category.name
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
img{
    width: 115px;
    height: 172px;
}
    .el-icon-delete{
        float: right;
        cursor: pointer;
    }
</style>

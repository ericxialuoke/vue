<template>
    <div>
        <i class="el-icon-circle-plus-outline" @click="dialogFormVisible = true"></i>
        <el-dialog title="修改/增加图书" :visible.sync="dialogFormVisible" @close="clear">
            <el-form :model="form" style="text-align: left">
                <el-form-item label="书名" :label-width="formLabelWidth">
                    <el-input v-model="form.title" auto-complete="off" placeholder="不加《》"></el-input>
                </el-form-item>
                <el-form-item label="作者" :label-width="formLabelWidth">
                    <el-input v-model="form.author" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="出版日期" :label-width="formLabelWidth">
                    <el-input v-model="form.date" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版社" :label-width="formLabelWidth">
                    <el-input v-model="form.press" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="封面" :label-width="formLabelWidth">
                    <el-input v-model="form.cover" auto-complete="off"></el-input>
                    <image-upload @onUpload="onUpload" ref="imageUpload"></image-upload>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.abs" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="书籍分类" :label-width="formLabelWidth">
                    <el-select v-model="form.category.id" placeholder="请选择书籍分类">
                        <el-option v-for="(item,index) in categories" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="height: 0">
                    <el-input type="hidden" v-model="form.id" auto-complete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ImageUpload from "./ImageUpload";
    export default {
        name: "EditForm",
        components:{
          ImageUpload
        },
        data(){
            return{
                dialogFormVisible:false,
                formLabelWidth: '120px',
                form: {
                    id:'',
                    title: '',
                    author: '',
                    date: '',
                    press: '',
                    cover: '',
                    abs: '',
                    category:{
                        id:'',
                        name:''
                    }
                },
                categories:[]
            }
        },
        created() {
            this.loadCategories();
        },
        methods:{
            loadCategories(){
                this.$axios.get('/categories').then((response)=>{
                    this.categories=response.data
                })
            },
            onSubmit(){
                this.$axios.post('/books',{
                    id: this.form.id,
                    title: this.form.title,
                    author: this.form.author,
                    date: this.form.data,
                    press: this.form.press,
                    cover: this.form.cover,
                    abs: this.form.abs,
                    category: this.form.category
                }).then(()=>{
                    this.dialogFormVisible=false
                    this.$emit('onSubmit')
                })
            },
            clear(){
                this.form={
                    id:'',
                    title: '',
                    author: '',
                    date: '',
                    press: '',
                    cover: '',
                    abs: '',
                    category:{
                        id:'',
                        name:''
                    }
                }
                this.$refs.imageUpload.$refs.upload.clearFiles()
            },

            onUpload(){
                console.log(this.form.cover+this.$refs.imageUpload.url)
                this.form.cover=this.$refs.imageUpload.url
            }
        }
    }
</script>

<style scoped>
.el-icon-circle-plus-outline{
    cursor:pointer;
    float: left;
    font-size: 100px;
    margin: 50px 20px;
}
</style>

<template>
    <el-upload
            action="http://localhost:8443/api/covers"
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
    export default {
        name: "ImageUpload",
        data() {
            return {
                fileList: [],
                url: ''
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleSuccess(response,file){
                this.url = response
                this.$emit('onUpload')
                this.$message.success('文件上传成功')
            },
            beforeUpload(file){
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isPG = (isJPG || isPNG);
                const isLt2M = file.size / 1024 / 1024 < 5;

                if (!isPG) {
                    this.$message.error('上传头像图片只能是 JPG 或者 png 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                return isPG && isLt2M;
            }
        }
    }
</script>

<style scoped>

</style>

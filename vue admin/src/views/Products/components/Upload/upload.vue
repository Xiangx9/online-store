<template>
  <el-upload class="upload-demo" v-model:file-list="fileList" list-type="picture-card" :http-request="Upload"
    :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img lazy w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
  <el-progress :text-inside="true" :stroke-width="26" :percentage="percent" />
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { client, getFileNameUUID, } from './ali-oss'
import { defineEmits, defineProps } from 'vue'
const emit = defineEmits(['GetUrl'])
const props = defineProps({
  Image: {
    type: Array,
    default: () => ([])
  },
})
const fileList = toRef(props, 'Image')

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
// 上传前
const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 5

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
  } else if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 5MB!')
  }
  return isJPG && isLt2M
}

const percent = ref(0)
const Upload = async (file: any) => {
  // commonUpload(file);
  multipartUpload(file);
}

// 普通上传
const commonUpload = async (file) => {
  const fileName = file.file.name;
  client().put(`Date/${fileName}`, file.file).then(result => {
    console.log(`上传结果`, result)
  }).catch(err => {
    console.log(`上传结果err`, err);
  });
}
//分片上传
const multipartUpload = async (file) => {
  let fileName = file.file.name
  const { res } = await client().multipartUpload(`Date/${fileName}`, file.file, {
    progress: async function (p) {
      console.log('上传进度', p);
      percent.value = Math.floor(p * 100).toFixed(0);
    },
  })
  emit('GetUrl', { name: fileName, url: res.requestUrls[0] })
}

// 删除
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  client().delete(`Date/${uploadFile.name}`).then(res => {
    console.log(`删除结果`, res)
  }).catch(err => {
    console.log(`删除结果err`, err)
  });
}

</script>

<style scoped lang="scss"></style>
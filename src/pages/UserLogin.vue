<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

const router = useRouter();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  console.log('submit', userAccount.value+":"+userPassword.value);
  const user = await myAxios.post("/user/login",{
    userAccount:userAccount.value,
    userPassword:userPassword.value,
  })
  console.log('user',user)
  if (user.code === 0 && user.data){
    Toast.success("登录成功");
    router.replace("/");
  }else {
    Toast.fail("登录失败："+user.message);
  }

}

</script>

<style scoped>

</style>
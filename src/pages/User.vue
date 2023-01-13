<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="onEdit(user.id,'username','昵称',user.username)" />
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit" >
      <img style="height: 50px" :src="user.avatarUrl" />
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="onEdit(user.id,'gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="onEdit(user.id,'phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="onEdit(user.id,'email','邮箱',user.email)"/>
    <van-cell title="时间" :value="user.createTime" />
  </template>
  <van-button round block type="primary" @click="onLogout">
    注销
  </van-button>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const user = ref();

onMounted(async () => {
  const res = await getCurrentUser(1);
  if (res){
    user.value = res;
  }else {
    Toast.fail("未登入");
    router.replace("/login");
  }
})

const router = useRouter();

const onEdit = (id:string, editKey:string, currentValue:string ,ediName:string) => {
  router.push({
    path: '/user/edit',
    query: {
      id,
      editKey,
      currentValue,
      ediName,
    }
  })
}

const onLogout = () => {
  const i = myAxios.post('/user/logout');
  console.log("/user/logout",i);
  if (i){
    Toast.success("注销成功");
    router.replace("/login");
  }else {
    Toast.fail("注销失败");
  }
}

</script>

<style scoped>

</style>
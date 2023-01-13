<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索为空" />
</template>

<script setup lang="ts">

import {onMounted, ref} from 'vue';
import {useRoute , useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const router = useRouter();
const searchText = ref('');

const {tags} = route.query;
const userList = ref();

onMounted(async () => {
  const res = await getCurrentUser(1);
  if (res){

  }else {
    Toast.fail("未登入");
    router.replace("/login");
  }

  const userListData = await myAxios.get('/user/recommend', {
    params: {
      pageSize: 8,
      pageNum: 1,
    }
  })
      .then(function (response) {
        console.log("/user/search/tags succeed",response);
        return response?.data?.records;
      })
      .catch(function (error) {
        console.error("/user/search/tags error",error);
        Toast.fail("请求失败");
        return error;
      })
  console.log(userListData);
  if (userListData){
    userListData.forEach(user => {
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
});

</script>

<style scoped>

</style>
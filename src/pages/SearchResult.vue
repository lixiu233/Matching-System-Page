<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索为空" />
</template>

<script setup >

import {onMounted, ref} from 'vue';
import {useRoute , useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import qs from 'qs';

const route = useRoute();
const searchText = ref('');

const {tags} = route.query;
const userList = ref();

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params,{indices : false})
    }
  })
    .then(function (response) {
      console.log("/user/search/tags succeed",response);
      Toast.success("搜索成功");
      return response?.data;
    })
    .catch(function (error) {
      console.error("/user/search/tags error",error);
      Toast.fail("搜索失败");
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
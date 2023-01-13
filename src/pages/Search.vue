<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>

  <van-row gutter="5" style="padding: 0 5px">
    <van-col v-for="tag in activeIds" >
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
      {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tafList"
  />
  <div style="margin: 16px">
    <van-button block round type="primary" @click="onSearchResult">搜索</van-button>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import {getCurrentUser} from "../services/user.js";
import {Toast} from "vant";

const router = useRouter();

const searchText = ref('');

const origin = [
  {
    text: '爱好',
    children: [
      { text: '篮球', id: '篮球' },
      { text: '足球', id: '足球' },
      { text: '羽毛球', id: '羽毛球' },
      { text: '乒乓球', id: '乒乓球' },
    ],
  },
  {
    text: '技术',
    children: [
      { text: 'java', id: 'java' },
      { text: 'python', id: 'python' },
      { text: 'php', id: 'php' },
      { text: 'c++', id: 'c++' },
    ],
  }];

let tafList = ref(origin);

onMounted(async () => {
  const res = await getCurrentUser(1);
  if (res){

  }else {
    Toast.fail("未登入");
    router.replace("/login");
  }
})

const onSearch = () => {
  tafList.value = origin.map(parenTag => {
    const tempChildren = [...parenTag.children];
    const tempParentTag = {...parenTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
    return tempParentTag;
  })
};

const onCancel = () => {
  searchText.value = '';
  tafList.value = origin;
};

const activeIds = ref([]);
const activeIndex = ref(0);

const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  });
}


const onSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags:activeIds.value
    }
  })
}

</script>

<style scoped>

</style>
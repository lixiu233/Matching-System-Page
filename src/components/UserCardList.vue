<template>
  <van-card
      v-for="user in props.userList"
      currency=""
      :price="user.profile"
      :tag="user.gender"
      :desc="user.email"
      :title="user.username"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">{{ tag }}</van-tag>
    </template>
    <template #footer>
      <van-button size="mini">按钮</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">

import {UserType} from "../models/user";

interface UserCardLisProps {
  userList:UserType[];
}
const props = withDefaults(defineProps<UserCardLisProps>(),{
  // @ts-ignore
  userList: [] as UserType[],
});
// const props = defineProps<UserCardLisProps>();

</script>

<style scoped>

</style>
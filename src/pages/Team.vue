<template>
交友
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {getCurrentUser} from "../services/user";
import {Toast} from "vant";
import {useRouter} from "vue-router";


const router = useRouter();

onMounted(async () => {
  const res = await getCurrentUser(1);
  if (res){

  }else {
    Toast.fail("未登入");
    router.replace("/login");
  }
})
</script>

<style scoped>

</style>
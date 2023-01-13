<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.ediName"
          :name="editUser.editKey"
          :label="editUser.currentValue"
          :placeholder="placeholder"
          :rules="[{ required: true, message: '请输入' }]"
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
import { ref } from 'vue';
import {useRoute,useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {setCurrentUserStates} from "../states/user";
import {getCurrentUser} from "../services/user";

const route = useRoute();
const router = useRouter();
const editUser = ref({
  id: route.query.id,
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  ediName: route.query.ediName,
});
const placeholder = `请输入${editUser.value.ediName}`;
console.log(route.query)
const onSubmit = async () => {
  const res = await myAxios.post('/user/update',{
    id : editUser.value.id,
    [editUser.value.editKey as string] : editUser.value.ediName,
  })
  if (res.code === 0 && res.data) {
    Toast.success("修改成功");
    getCurrentUser(0);
    router.back();
  }else {
    Toast.fail("修改失败")
  }
};
</script>

<style scoped>

</style>
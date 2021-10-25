<template>
  <div>
    <template v-if="users.length>0"
    >
    <v-card
        v-for="(user,index) in users"
        :key="index"
        outlined
        class="mt-10"
        :to="`/user/${user.id}`"
    >
      <v-avatar
          class="ma-3"
          size="33"
      >
        <img :src="user.avatar" alt="用户头像">
      </v-avatar>
      <span class="ml-2" v-html="user.highlight"></span>
    </v-card>
    </template>
    <h3 v-else class="mt-10 text-center">未搜索到此用户</h3>
  </div>
</template>

<script>
import {searchName} from "../../api/common";

export default {
  name: "UserView",
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    searchName() {
      if (!this.keyword)return
      searchName(this.keyword, 0, 10).then((res) => {
        if (res.data.list.length > 0) {
          this.users = res.data.list
        }
      })
    }
  },
  watch:{
    keyword() {
      console.log('change kw')
      this.searchName()
    }
  },
  created() {
    this.searchName()
  }
}
</script>

<style scoped>

</style>

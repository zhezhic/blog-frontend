<template>
  <v-text-field
      v-model.trim="userEmail"
      :rules="emailRules"
      counter
      label="邮箱"
      required
      clearable
  ></v-text-field>
</template>

<script>
export default {
  name: "EmailField",
  props:['email'],
  data:()=>({
    userEmail: '',
    emailRules: [
      v => !!v || '请输入邮箱',
      v => /.+@.+\..+/.test(v) || '邮箱不合法',
    ],
  }),
  mounted() {
    this.userEmail=this.email
  },
  watch:{
    userEmail(value) {
      this.$emit('update:email', value)
    }
  },
}
</script>

<style scoped>

</style>

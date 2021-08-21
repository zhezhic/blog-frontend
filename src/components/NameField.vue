<template>
  <v-text-field
      v-model.trim="userName"
      :rules="nameRules"
      counter="10"
      label="昵称"
      clearable
      required
  ></v-text-field>
</template>

<script>
export default {
  name: "NameField",
  props: ['name'],
  data: () => ({
    userName: '',
    nameRules: [
      v => !!v || '请输入昵称',
      v => (v && v.length >= 3) || '昵称不能小于3位',
      v => (v && v.length <= 10) || '昵称不能大于10位',
    ],
  }),
  mounted() {
    this.userName = this.name
  },
  watch: {
    userName(value) {
      this.$emit('update:name', value)
    }
  },
}
</script>

<style scoped>

</style>

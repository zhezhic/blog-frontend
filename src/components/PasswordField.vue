<template>
  <v-text-field
      v-model.trim="pwd"
      :append-icon="appendIcon"
      :rules="passwordRules"
      :type="type"
      counter
      :label="label || `密码`"
      @click:append="showPassword"
  ></v-text-field>
</template>

<script>
export default {
  name: "PasswordField",
  props:['password','label'],
  data:()=>({
    pwd: '',
    isShow: false,
    appendIcon: 'mdi-eye-off-outline',
    type:'password',
    passwordRules: [
      v => !!v || '请输入密码',
      v => /[0-9A-Za-z!@#]{6,}/.test(v) || '密码必须大于6位,不能包含特殊字符',
      v => (v && v.length <= 30) || '昵称不能大于30位',
    ],
  }),
  watch:{
    pwd(value) {
      this.$emit('update:password', value)
    }
  },
  methods:{
    showPassword() {
      if (this.isShow) {
        this.appendIcon = 'mdi-eye-off-outline';
        this.type = 'password'
        this.isShow=false
      }else{
        this.appendIcon = 'mdi-eye-outline';
        this.type = 'text'
        this.isShow=true
      }
    }
  }
}
</script>

<style scoped>

</style>

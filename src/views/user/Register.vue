<template>
  <v-card
      :loading="loading"
      class="mx-auto my-16"
      max-width="500"
  >
    <template slot="progress">
      <v-progress-linear
          color="deep-purple"
          height="5"
          indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>
      <v-spacer></v-spacer>
      注册
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider class="mx-4 primary"></v-divider>

    <v-card-text>
      <v-form
          ref="form"
          v-model="valid"
      >
        <v-text-field
            v-model="userInfo.name"
            :counter="10"
            :rules="nameRules"
            label="昵称"
            required
        ></v-text-field>
        <v-text-field
            v-model="userInfo.password"
            :rules="passwordRules"
            counter
            label="密码"
        ></v-text-field>
        <v-text-field
            v-model="userInfo.email"
            :rules="emailRules"
            label="邮箱"
            required
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
          class="mr-10"
          color="primary lighten-2"
          width="100%"
          @click="submit"
          :disabled="!valid"
      >
        注册
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {register} from "../../api/user/register";
export default {
  name: "Register",
  data: () => ({
    userInfo: {
      name: '',
      password: '',
      email: ''
    },
    loading: false,
    valid: true,
    nameRules: [
      v => !!v || '请输入昵称',
      v => (v && v.length <= 10) || '昵称不能大于10位',
    ],
    passwordRules: [
      v => !!v || '请输入密码',
      v => /[0-9A-Za-z!@#]{6,}/.test(v) || '密码必须大于6位,不能包含特殊字符',
    ],
    emailRules: [
      v => !!v || '请输入邮箱',
      v => /.+@.+\..+/.test(v) || '邮箱不合法',
    ],
  }),

  methods: {
    submit() {
      this.loading = true
      this.valid=false
      register(this.userInfo).then(response =>{
        console.log('register/response',response)
        this.$store.commit('successTip',response.message)
        this.loading=false;
        this.valid=true
        if (response.code === 200) {
          this.$router.push('login')
          return
        }
      }).catch(error =>{
        console.log('register/error',error)
        this.$store.commit('errorTip',error)
        this.loading=false;
        this.valid=true
      })
    },
  },
}
</script>

<style scoped>

</style>

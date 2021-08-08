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
      登陆
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider class="mx-4 primary"></v-divider>

    <v-card-text>
      <v-form
          ref="form"
          v-model="valid"
      >
        <v-text-field
            v-model="userInfo.email"
            :rules="emailRules"
            label="邮箱"
            required
        ></v-text-field>

        <v-text-field
            v-model="userInfo.password"
            :counter="6"
            :rules="passwordRules"
            label="密码"
            required
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
          :disabled="!valid"
          class="ml-10"
          color="primary lighten-2"
          width="186"
          @click="login"
      >
        登陆
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          class="mr-10"
          color="grey lighten-2"
          width="186"
          to="/register"
      >
        注册
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        email: '',
        password: '',
      },
      loading: false,
      valid: true,
      emailRules: [
        v => !!v || '请输入邮箱',
        v => /.+@.+\..+/.test(v) || '邮箱不合法',
      ],
      passwordRules: [
        v => !!v || '请输入密码',
        v => (v && v.length >= 6) || '密码必须大于6位',
      ],
    }
  },
  methods: {
    login() {
      this.loading = true
      this.valid = false
      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>

<style scoped>

</style>

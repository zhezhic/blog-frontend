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
        <EmailField :email.sync="userInfo.email"></EmailField>
        <PasswordField :password.sync="userInfo.password" @keydown.enter.native="submit"></PasswordField>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
          :disabled="!valid"
          class="ml-10"
          color="primary lighten-2"
          width="186"
          @click="submit"
      >
        登陆
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          class="mr-10"
          color="grey lighten-2"
          to="/register"
          width="186"
      >
        注册
      </v-btn>
    </v-card-actions>
  </v-card>


</template>

<script>
import PasswordField from "../../components/form/PasswordField";
import EmailField from "../../components/form/EmailField";

export default {
  name: "Login",
  components: {
    PasswordField,
    EmailField
  },
  data() {
    return {
      userInfo: {
        email: '',
        password: '',
      },
      passwordField: {
        isShow: false,
        appendIcon: 'mdi-eye-off-outline',
        type: 'password'
      },
      loading: false,
      valid: true,
    }
  },
  methods: {
    submit() {
      if (this.valid) {
        this.loading = true;
        this.valid = false
        this.$store.dispatch('user/login', this.userInfo).then(() => {
          this.$store.dispatch('user/getInfo')
          this.$router.push('/home')
        }).catch(() => {
        }).finally(()=>{
          this.loading = false;
          this.valid = true
        })
      }

    },
  },
}
</script>

<style scoped>

</style>

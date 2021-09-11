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
        <NameField :name.sync="userInfo.name"></NameField>
        <PasswordField :password.sync="userInfo.password"></PasswordField>
        <EmailField :email.sync="userInfo.email"  @keydown.enter.native="submit"></EmailField>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
          :disabled="!valid"
          class="mr-10"
          color="primary lighten-2"
          width="100%"
          @click="submit"
      >
        注册
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import {register} from "../../api/user/register";
import PasswordField from "../../components/PasswordField";
import NameField from "../../components/NameField";
import EmailField from "../../components/EmailField";
export default {
  name: "Register",
  components:{
    PasswordField,
    NameField,
    EmailField
  },
  data: () => ({
    userInfo: {
      name: '',
      password: '',
      email: ''
    },
    loading: false,
    valid: true,
  }),

  methods: {
    submit() {
      if (this.valid) {
        this.loading = true
        this.valid = false
        register(this.userInfo).then(response => {
          this.loading = false;
          this.valid = true
          if (response.code === 200) {
            this.$router.push('login')
          }
        }).catch(() => {
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

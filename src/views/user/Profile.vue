<template>
  <v-container class="mt-15">
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <v-card>
          <!--          头像-->
          <div class="avatar text-center">
            <span @click.stop="editAvatar.dialog=true">
              <v-badge
                  avatar
                  class="pointer"
                  color="none"
                  offset-y="90"
                  overlap
              >
              <template v-slot:badge>
                <v-icon color="primary" size="30">mdi-image-edit</v-icon>
              </template>
              <v-avatar color="success" size="100">
                <img :src="userInfo.avatar" alt="用户头像">
              </v-avatar>
            </v-badge>
            </span>

            <!--            修改头像dialog-->
            <v-dialog
                v-model="editAvatar.dialog"
            >
              <v-card>
                <v-card-title>
                  更换头像
                  <v-spacer></v-spacer>
                  <v-btn text @click.stop="editAvatar.dialog=false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <div class="img-input">
                  <v-form v-model="editAvatar.valid">
                    <v-file-input
                        v-model="editAvatar.avatar"
                        :loading="editAvatar.loading"
                        :rules="editAvatar.avatarRule"
                        accept="image/png, image/jpeg"
                        chips
                        placeholder="选择一张jpg/png格式的头像"
                        prepend-icon="mdi-image"
                        show-size
                        truncate-length="30"
                    ></v-file-input>
                  </v-form>

                </div>
                <div class="text-center">
                  <v-btn :disabled="!editAvatar.valid" class="mb-5" color="primary" @click="uploadImg">上传
                  </v-btn>
                </div>
              </v-card>
            </v-dialog>
            <div>{{ userInfo.name }}</div>
          </div>
          <!--          历史详情-->
          <div class="ml-2">
            <v-icon small>
              mdi-email
            </v-icon>
            <span class="text-caption grey--text">&nbsp;&nbsp;&nbsp;{{ userInfo.email }}</span>
          </div>
          <div class="ml-2">
            <v-icon small>
              mdi-calendar-multiselect
            </v-icon>
            <span class="text-caption grey--text">&nbsp;&nbsp;&nbsp;193天</span>
          </div>
          <v-divider class="mx-2"></v-divider>
          <div class="text-caption ml-2 my-2 mt-4 grey--text">累计发表了8篇文章</div>
          <v-divider class="mx-2"></v-divider>
          <div class="text-caption ml-2 my-2 grey--text">累计获得了44个评论</div>
          <v-divider class="mx-2"></v-divider>
        </v-card>
      </v-col>
      <!--      个人资料-->
      <v-col cols="12" md="6" sm="12">
        <v-card>
          <v-card-title class="text-subtitle-1">
            <v-spacer></v-spacer>
            个人资料
            <v-spacer></v-spacer>

          </v-card-title>
          <v-tabs
              v-model="tab"
          >
            <v-tab href="#tab-1">
              <v-icon small>mdi-card-account-details-outline</v-icon>
              <span>&nbsp;基本资料</span>
            </v-tab>
            <v-tab href="#tab-2">
              <v-icon small>mdi-lock</v-icon>
              <span>&nbsp;密码</span>
            </v-tab>
          </v-tabs>
          <!--          基本资料-->
          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-form
                  v-model="profile.valid"
                  class="ma-4"
              >
                <NameField :name.sync="profile.name"></NameField>
                <EmailField :email.sync="profile.email"></EmailField>
                <v-text-field
                    v-model.trim="profile.intro"
                    autocomplete="off"
                    class="mt-3"
                    clearable
                    counter
                    label="个人介绍"
                    outlined
                    placeholder="说点什么吧"
                ></v-text-field>
                <v-btn
                    :disabled="isDisabled"
                    class="mb-2"
                    color="primary"
                    @click="submitProfile"
                    :loading="profile.loading"
                >保存</v-btn>
              </v-form>
            </v-tab-item>
            <!--            密码-->
            <v-tab-item value="tab-2">
              <v-form
                  v-model="password.valid"
                  class="ma-4"
              >
                <PasswordField :label="`原密码`" :password.sync="password.originPassword"></PasswordField>
                <PasswordField :label="`新密码`" :password.sync="password.newPassword"></PasswordField>
                <PasswordField :label="`确认密码`" :password.sync="password.confirmPassword"></PasswordField>
                <v-btn
                    :disabled="!password.valid"
                    :loading="password.loading"
                    class="my-2"
                    color="primary"
                    @click="submitPassword"
                >修改</v-btn>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {updateAvatar, updatePassword, updateProfile} from "../../api/user/user";
import {mapState} from "vuex";
import PasswordField from "../../components/form/PasswordField";
import NameField from "../../components/form/NameField";
import EmailField from "../../components/form/EmailField";

export default {
  name: "Profile",
  components: {
    PasswordField,
    NameField,
    EmailField
  },
  data() {
    return {
      editAvatar: {
        valid: false,
        dialog: false,
        avatar: null,
        avatarRule: [
          v => !!v || '请选择头像',
          v => !v || v.size < 2000000 || '头像大小不能超过2mb',
        ],
        loading: false
      },
      tab: null,
      profile: {
        name: '',
        email: '',
        intro: '',
        valid: false,
        disabled: true,
        loading: false,
      },
      password: {
        originPassword: '',
        newPassword: '',
        confirmPassword: '',
        valid: false,
        loading:false
      },
    }
  },
  mounted() {
    this.profile.name = this.userInfo.name
    this.profile.email = this.userInfo.email
    this.profile.intro = this.userInfo.intro
  },
  computed: {
    ...mapState('user', ['userInfo']),
    isDisabled: {
      get() {
        const {name, email, intro} = this.userInfo;
        if (this.profile.name !== name || this.profile.email !== email || this.profile.intro !== intro) {
          return false
        }
        return this.profile.disabled
      },
      set(value) {
        this.profile.disabled = value
      }
    },
  },
  methods: {
    uploadImg() {
      if (this.editAvatar.valid) {
        this.editAvatar.loading = true
        this.editAvatar.valid=false
        const formData = new FormData();
        formData.append('file', this.editAvatar.avatar)
        updateAvatar(formData).then(() => {
          this.editAvatar.loading = false
          this.editAvatar.dialog = false
          this.$router.go(0)
        }).catch(() => {
          this.editAvatar.loading = false
        })
      }
    },
    submitProfile() {
      if (this.profile.valid) {
        this.profile.loading=true
        updateProfile(this.profile).then(() => {
          this.$store.dispatch('user/getInfo')
          this.profile.loading=false
        }).catch(()=>{
          this.profile.loading=false
        })
      }
    },
    submitPassword() {
      if (this.password.valid && this.password.originPassword !== this.password.confirmPassword) {
        if (this.password.newPassword === this.password.confirmPassword) {
          this.password.loading=true
          updatePassword(this.password).then(() => {
            this.$router.push('/home')
            this.$store.commit('user/clearUserState')
          }).catch(()=>{
            this.password.loading=false
          })
        } else {
          this.$store.commit('warningTip', '两次密码不一致')
        }
      }else {
        this.$store.commit('warningTip', '新密码无变化')
      }
    }
  }
}
</script>

<style scoped>

.img-input {
  width: 400px;
  margin: 0 auto;
}
</style>

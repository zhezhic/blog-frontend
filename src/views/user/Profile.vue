<template>
  <v-container class="mt-15">
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <v-card>
          <!--          头像-->
          <div class="avatar text-center">
            <span @click.stop="uploadIAvatar.dialog=true">
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
              <v-avatar size="100" color="success">
                <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="用户头像">
                <span v-if="!userInfo.avatar" class="white--text">{{ userInfo.name.split('')[0] }}</span>
              </v-avatar>
            </v-badge>
            </span>

            <!--            修改头像dialog-->
            <v-dialog
                v-model="uploadIAvatar.dialog"
            >
              <v-card>
                <v-card-title>
                  更换头像
                  <v-spacer></v-spacer>
                  <v-btn text @click.stop="uploadIAvatar.dialog=false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <div class="img-input">
                  <v-form ref="imgForm" v-model="uploadIAvatar.avatarValid">
                    <v-file-input
                        v-model="uploadIAvatar.avatar"
                        :loading="uploadIAvatar.loading"
                        :rules="uploadIAvatar.avatarRule"
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
                  <v-btn :disabled="!uploadIAvatar.avatarValid" class="mb-5" color="primary" @click="uploadImg">上传
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
      <!--      2-->
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
          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-form
                  ref="form"
                  class="mx-4"
              >
                <v-text-field
                    v-model.trim="profile.name"
                    :counter="10"
                    :rules="nameRules"
                    label="昵称"
                    required
                ></v-text-field>
                <v-text-field
                    v-model.trim="profile.email"
                    :rules="emailRules"
                    label="邮箱"
                    required
                ></v-text-field>
                <v-text-field
                    v-model.trim="profile.intro"
                    class="mt-3"
                    label="个人介绍"
                    outlined
                    placeholder="说点什么吧"
                ></v-text-field>
                <v-btn :disabled="profile.valid" class="mb-2" color="primary" @click="submitProfile">保存</v-btn>
              </v-form>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <v-form
                  ref="form"
              >
                <v-text-field
                    v-model.trim="userInfo.password"
                    :counter="6"
                    :rules="passwordRules"
                    label="密码"
                    required
                    type="password"
                ></v-text-field>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {addAvatar} from "../../api/user/profile";
import {mapState} from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      uploadIAvatar: {
        dialog: false,
        avatar: null,
        avatarValid: false,
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
        valid: true,
      },
      password: {
        originPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
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
    }
  },
  created() {
    this.profile.name = this.userInfo.name
    this.profile.email = this.userInfo.email
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
  methods: {
    uploadImg() {
      if (this.uploadIAvatar.avatarValid) {
        this.uploadIAvatar.loading = true
        const formData = new window.FormData();
        formData.append('file', this.uploadIAvatar.avatar)
        addAvatar(formData).then(res => {
          this.$store.commit('successTip', res.message)
          this.uploadIAvatar.loading = false
          this.uploadIAvatar.dialog = false
          this.$router.go(0)
          console.log('upload/img/', res)
        }).catch(err => {
          console.log('upload/img/', err)
          this.uploadIAvatar.loading = false
        })
      }
    },
    submitProfile() {

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

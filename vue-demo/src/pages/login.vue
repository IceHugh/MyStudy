<template>
  <div class="page">
    <butler-header :header-title="title"></butler-header>
    <div class="head-info">登录</div>
    <div class="input-box">
      <div class="icon-box">
        <img class="input-icon" src="../assets/images/phone-icon.png"/>
      </div>
      <input class="input-fill" type="text" name="inputMobilePhoneNumber" v-model.trim="username" placeholder="请输入用户名" maxlength="11"/>
    </div>
    <div class="input-box">
      <div class="icon-box">
        <img class="input-icon-lock" src="../assets/images/lock_icon.png"/>
      </div>
      <input class="input-fill" type="password" name="inputVerifyCode" v-model.trim="password" placeholder="请输入密码" maxlength="12"/>
    </div>
    <button class="btn-large" @click="login">提交</button>
  </div>
</template>

<style lang="scss" scoped>
@import '../style/pages/login.scss';
</style>

<script>
import ButlerHeader from '@/components/butler-header/butler-header.vue';
import {required} from 'vuelidate/lib/validators';
export default {
  name: 'login',
  components: {
    ButlerHeader
  },
  data() {
    return {
      title: '登录',
      username: '',
      password: '',
    }
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    }
  },
  methods: {
    login() {
      let { username, password } = this.$v;
      if ( !username.required || !password.required ) {
        return;
      }
      this.$store.dispatch({
        type: 'login',
        userMsg: {
          username: this.username,
          password: this.password,
        }
      })
    }
  }
}
</script>

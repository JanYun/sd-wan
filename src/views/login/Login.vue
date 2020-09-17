<template>
  <a-spin :spinning="spinning" class="containters">
    <div class="login-con">
      <div class="login-top">
        <div class="logo"></div>
        <div class="title">CMCC SDWAN</div>
      </div>
      <div class="input-wrap">
        <a-form-model :model="inforDate" :rules="rulesFrom" hideRequiredMark>
          <a-form-model-item prop="username" ref="username">
            <a-input v-model="inforDate.username" placeholder="User Name" />
          </a-form-model-item>
          <a-form-model-item prop="password" ref="password">
            <a-input-password
              v-model="inforDate.password"
              type="password"
              placeholder="Password"
            />
          </a-form-model-item>
        </a-form-model>
        <div class="login-btn">
          <a-button
            type="primary"
            html-type="submit"
            @click="userlogin('rulesFrom')"
            >Login</a-button
          >
        </div>
        <div class="controls-link">
          <a href="resetpassword" class="link">Forgot Password</a>
        </div>
      </div>
    </div>
  </a-spin>
</template>
<script>
import { login, getUserInfo } from 'apis/common';
import { mapMutations } from 'vuex';
export default {
  data() {
    const validatorPassword = (rules, value, cb) => {
      if (!value) {
        cb(new Error('Enter Password'));
      } else {
        cb();
      }
    };
    return {
      spinning: false,
      inforDate: {
        // 用户名
        username: '',
        // 用户密码
        password: ''
      },
      register: 'http://192.168.1.27:9004/#/register',
      rulesFrom: {
        username: [
          { required: true, message: 'Enter Username', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: 'No more than 20 characters',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: validatorPassword,
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations('common', ['set_token', 'set_user_info']),

    async userlogin() {
      this.spinning = true;
      const userData = {
        username: this.inforDate.username,
        userPassword: this.inforDate.password
      };
      const { success, msg, data } = await login(userData);
      this.spinning = false;
      if (!success) {
        if (msg === '已登录，无需重新登录') {
          this.$router.replace(this.$route.query.redirect);
        }
        return this.$message.error(msg);
      }
      const token = data;
      this.set_token(token);
      // 跳转到原页面
      const res = await getUserInfo(token);
      const userInfo = res.data;
      this.set_user_info(userInfo);
      this.$message.success('登陆成功!');
      if (!this.$route.query.redirect) {
        this.$router.go(-1);
      }
      this.$router.replace('/');
    }
  }
};
</script>
<style lang="scss" scoped>
.containters {
  background: #0d496a url('~@/assets/images/login/waves.png') no-repeat center;
  background-attachment: fixed;
  background-size: contain;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .login-con {
    width: 450px;
    height: 320px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 111;
    background: #0b3d59;
    border-radius: 25px;
    overflow: hidden;
    .login-top {
      height: 75px;
      font-size: 18px;
      border-radius: 25px 25px 0 0;
      background: #fff;
      border: 1px solid;
      position: relative;
      &::before {
        position: absolute;
        content: '';
        width: 2px;
        height: 60px;
        background-color: #ccc;
        left: 200px;
        top: 8px;
      }
      .logo {
        width: 200px;
        height: 75px;
        background: url(~@/assets/images/login/versa-logo.png) no-repeat 30px
          20px;
        float: left;
      }
      .title {
        font-size: 18px;
        color: #0090bc;
        line-height: 75px;
        width: 240px;
        float: right;
        text-align: center;
      }
    }
    .input-wrap {
      padding: 35px 95px 0;
      /deep/ {
        .ant-form-explain {
          font-size: 11px;
          color: #ee6978;
          line-height: 24px;
          padding-left: 10px;
        }
        input {
          background-color: #0b3d59;
          border: 2px solid #4b768e !important;
          box-shadow: none;
          color: #a5b0b8;
          width: 244px;
          height: 15px;
          font-size: 12px !important;
          line-height: 26px;
          display: block;
          height: 30px;
          width: 100%;
        }
      }
      .login-btn {
        padding-left: 189px;
        button {
          font-family: open_sansregular;
          font-weight: 500;
          min-width: 70px;
          border-color: #5aa2d0;
          background-color: #0090bc;
          background-image: none;
        }
      }
      .controls-link {
        text-align: right;
      }
      .controls-link .link {
        color: #7bb7d4;
        font-size: 12px;
      }
    }
  }
}
</style>

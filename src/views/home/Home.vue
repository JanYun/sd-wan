<template>
  <div id="home">
    <div id="components-layout-demo-basic">
      <a-layout>
        <!-- 头部区域 -->
        <a-layout-header
          class="nav-wrap"
          :style="{ padding: '5px 15px 0 5px', lineHeight: 'normal' }"
        >
          <!-- 头部top区 -->
          <a-row type="flex" justify="space-between" align="top">
            <!-- 头部左侧logo -->
            <a-col>
              <a href="/versa"><div class="versa-logo icon-task"></div></a>
            </a-col>
            <!-- 头部右侧导航区 -->
            <a-col class="pull-right">
              <a-row type="flex" justify="space-between" align="top">
                <a-col class="task-iconbtn" title="Tasks">
                  <a-icon type="home" />
                </a-col>
                <a-col class="info-iconbtn" title="Information">
                  <a-icon type="home" />
                </a-col>
                <!-- 导航下拉组件内容 -->
                <a-col>
                  <a-dropdown>
                    <a
                      class="ant-dropdown-link"
                      @click="e => e.preventDefault()"
                    >
                      Shanghai ( cmcc_shanghai )
                      <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                      <a-menu-item>1st menu item</a-menu-item>
                      <a-menu-item>2nd menu item</a-menu-item>
                      <a-sub-menu key="test" title="sub menu">
                        <a-menu-item>3rd menu item</a-menu-item>
                        <a-menu-item>4th menu item</a-menu-item>
                      </a-sub-menu>
                      <a-sub-menu title="disabled sub menu" disabled>
                        <a-menu-item>5d menu item</a-menu-item>
                        <a-menu-item>6th menu item</a-menu-item>
                      </a-sub-menu>
                    </a-menu>
                  </a-dropdown>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <!-- 头部bottom -->
          <a-row
            class="nav-bottom"
            type="flex"
            justify="space-between"
            align="center"
          >
            <a-col class="nav-bottom-item">
              <router-link class="link-btn" to="/workflows"
                >Workflows</router-link
              >
              <router-link class="link-btn" to="/administration"
                >Administration</router-link
              >
            </a-col>
            <a-col>
              Commit Template
            </a-col>
          </a-row>
        </a-layout-header>
        <!-- 主体区域 -->
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home'
};
</script>
<style lang="scss" scoped>
.nav-wrap {
  background-color: #36536b;
  .versa-logo {
    height: 34px;
    width: 180px;
    background: url('~@/assets/images/home/logo.png') no-repeat;
    background-size: contain;
    position: relative;
  }
  .pull-right {
    width: 305px;
  }
  .nav-bottom-item {
    padding: 1px 0 3px 197px;
    .link-btn {
      font-size: 14px;
      color: #fff;
      transition: all 0.3s;
      margin-right: 35px;
      line-height: 20px;
      padding: 0 5px;
      &:hover {
        color: #a5a8ad;
      }
    }
    .router-link-active {
      color: #0f2c3e;
      background: #a7d054;
      border-radius: 4px;
      &:hover {
        color: #0f2c3e;
      }
    }
  }
}
</style>

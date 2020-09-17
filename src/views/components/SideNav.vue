<template>
  <a-layout-sider v-model="collapsed" width="182px" :trigger="null" collapsible>
    <a-menu theme="light" mode="inline" :default-selected-keys="['1']">
      <a-menu-item
        class="menu-item"
        :key="index"
        v-for="(item, index) in navCon"
      >
        <router-link :to="item.path">
          <a-icon type="user" />
          <span>{{ item.title }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  props: {
    navCon: {
      type: Array,
      requried: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.menu-item {
  padding: 0;
}
</style>

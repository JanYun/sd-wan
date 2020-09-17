<template>
  <a-layout>
    <SideNav :navCon="navCon" />
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
import SideNav from '@/views/components/SideNav';
export default {
  data() {
    return {
      navCon: [
        {
          title: 'Organizations',
          path: '/administration/Organize'
        },
        {
          title: 'Organization Users',
          path: '/administration/organize-users'
        }
      ]
    };
  },
  components: {
    SideNav
  }
};
</script>

<style lang="scss" scoped></style>

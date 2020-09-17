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
          title: 'Templates',
          path: '/workflows/templates'
        },
        {
          title: 'Spoke Groups',
          path: '/workflows/spoke-groups'
        },
        {
          title: 'Devices',
          path: '/workflows/devices'
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

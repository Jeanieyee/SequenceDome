<template>
  <div class="app-wrapper">
    <router-view />
  </div>
</template>

<script>
// import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  data() {
    return {
      routerName: ''
    }
  },
  // mixins: [ResizeMixin],
  computed: {
  },
  watch: {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  /*margin-left: 200px;*/
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth + $subSideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>

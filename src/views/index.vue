<template>
  <div class="page-container">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        First section ...
      </div>
      <div class="section">
        Second section ...
      </div>
    </full-page>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: {
          licenseKey: 'YOUR_KEY_HEERE',
          menu: '#menu',
          anchors: ['page1', 'page2'],
          sectionsColor: ['#fff', '#fff', '#fff']
        }
      }
    }
  }
</script>

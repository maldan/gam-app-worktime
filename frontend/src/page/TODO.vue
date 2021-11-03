<template>
  <div class="main">
    <!-- Note list -->
    <List style="margin-top: 10px" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import List from '../component/todo/List.vue';

export default defineComponent({
  components: { List },
  async mounted() {},
  methods: {},
  data: () => {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
}
</style>

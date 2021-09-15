<template>
  <div class="main">
    <Header />

    <div class="body">
      <List />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../component/Header.vue';
import List from '../component/project/List.vue';
import Input from '../gam_sdk_ui/vue/component/Input.vue';
import Button from '../component/Button.vue';
import Moment from 'moment';
import { RestApi } from '../util/RestApi';

export default defineComponent({
  components: { Header, History, List, Input, Button },
  async mounted() {},
  methods: {},
  data: () => {
    return {
      currentDate: new Date(),
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  height: 100%;
  padding: 10px;

  .body {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 60px);

    .result {
      .list {
        height: calc(100% - 25px);
        overflow-y: auto;

        .item {
          padding: 5px;
          color: #999999;
          border-bottom: 1px solid #383838;
        }
      }
    }
  }
}
</style>

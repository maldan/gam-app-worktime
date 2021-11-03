<template>
  <div class="main">
    <div class="body">
      <History :date="currentDate" />
      <ui-block title="schedule">
        <ui-schedule
          :map="$store.state.work.yearMap"
          :max="21600"
          :date="$store.state.work.date"
          :yearRange="[-4, -3, -2, -1, 0]"
          formatValue="time"
          color="#007eff"
          @select="$store.dispatch('work/setDate', $event)"
        />
      </ui-block>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import History from '../component/main/History.vue';

export default defineComponent({
  components: { History },
  async mounted() {
    this.$store.dispatch('work/setDate', new Date());
  },
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
  height: calc(100% - 110px);
  padding: 10px;
  padding-top: 0;

  .body {
    margin-top: 10px;
    display: flex;
    height: calc(100% - 110px);
  }
}
</style>

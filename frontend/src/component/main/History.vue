<template>
  <div class="task_list">
    <div class="task" v-for="(x, i) in $store.state.work.history" :key="x">
      <Task
        @edit="(isShowEditForm = true), (itemId = $event)"
        :item="x"
        :nextItem="$store.state.work.history[i + 1]"
        :date="date"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Task from './Task.vue';

export default defineComponent({
  props: {
    date: Object,
  },
  components: { Task },
  async mounted() {},
  methods: {},
  data: () => {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.task_list {
  overflow-y: auto;
  height: max-content;
  max-height: 100%;
}
</style>

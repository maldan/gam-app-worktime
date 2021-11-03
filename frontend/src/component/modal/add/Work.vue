<template>
  <div :class="$style.window">
    <ui-input
      placeholder="Name..."
      style="margin-bottom: 10px"
      v-model="$store.state.modal.data.name"
    />
    <ui-textarea
      placeholder="Description..."
      style="margin-bottom: 10px"
      v-model="$store.state.modal.data.description"
    />

    <ui-input
      icon="calendar"
      placeholder="Start..."
      style="margin-bottom: 10px"
      v-model="$store.state.modal.data.start"
    />
    <ui-input
      placeholder="Stop..."
      style="margin-bottom: 10px"
      v-model="$store.state.modal.data.stop"
      icon="calendar"
      functionIcon="stopwatch"
      :functionClick="getCurrentDate"
    />

    <div style="display: flex">
      <ui-button @click="$store.dispatch('modal/close')" text="Cancel" style="margin-right: 5px" />
      <ui-button
        @click="$store.dispatch('modal/ok')"
        text="Add"
        icon="plus"
        style="margin-left: 5px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {},
  components: {},
  async mounted() {},
  methods: {},
  data() {
    return {
      image: '',
    };
  },
});
</script>

<style lang="scss" module>
.window {
  min-width: 320px;
}
</style>

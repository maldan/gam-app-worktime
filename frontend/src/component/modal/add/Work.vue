<template>
  <div :class="$style.window">
    <ui-input placeholder="Name..." :class="$style.field" v-model="$store.state.modal.data.name" />
    <ui-textarea
      placeholder="Description..."
      :class="$style.field"
      v-model="$store.state.modal.data.description"
    />

    <ui-input
      icon="calendar"
      placeholder="Start..."
      :class="$style.field"
      v-model="$store.state.modal.data.start"
    />
    <ui-input
      placeholder="Stop..."
      :class="$style.field"
      v-model="$store.state.modal.data.stop"
      icon="calendar"
      functionIcon="stopwatch"
      :functionClick="getCurrentDate"
    />

    <div class="button_group">
      <ui-button @click="$store.dispatch('modal/close')" text="Cancel" />
      <ui-button @click="$store.dispatch('modal/ok')" text="Add" icon="plus" />
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

  .field {
    margin-bottom: 10px;
  }
}
</style>

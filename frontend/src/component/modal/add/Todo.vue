<template>
  <div :class="$style.window">
    <ui-input
      placeholder="Priority..."
      :class="$style.field"
      v-model="$store.state.modal.data.priority"
    />
    <ui-textarea
      placeholder="Description..."
      :class="$style.field"
      v-model="$store.state.modal.data.description"
    />
    <ui-input
      icon="calendar"
      placeholder="Created..."
      :class="$style.field"
      type="datetime"
      v-model="$store.state.modal.data.created"
    />
    <ui-input
      icon="calendar"
      placeholder="Deadline..."
      :class="$style.field"
      type="datetime"
      v-model="$store.state.modal.data.deadline"
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

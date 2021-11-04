<template>
  <div :class="$style.window">
    <ui-input placeholder="Name..." :class="$style.field" v-model="$store.state.modal.data.name" />
    <ui-textarea
      placeholder="Description..."
      :class="$style.field"
      v-model="$store.state.modal.data.description"
    />
    <ui-input
      placeholder="Price per hour..."
      :class="$style.field"
      v-model="$store.state.modal.data.pricePerHour"
    />
    <ui-input
      icon="circle_filled"
      :iconColor="$store.state.modal.data.color"
      placeholder="Color..."
      :class="$style.field"
      v-model="$store.state.modal.data.color"
    />
    <ui-input
      icon="calendar"
      placeholder="Created..."
      :class="$style.field"
      v-model="$store.state.modal.data.created"
    />
    <div class="button_group">
      <ui-button @click="$store.dispatch('modal/close')" text="Cancel" />
      <ui-button @click="$store.dispatch('modal/ok')" text="Save" icon="check" />
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

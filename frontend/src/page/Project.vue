<template>
  <div :class="$style.main">
    <ui-block
      :class="$style.block"
      title="project list"
      icon="plus"
      :scrollY="true"
      @iconClick="
        $store.dispatch('modal/show', {
          name: 'add/project',
          data: {
            name: '',
            description: '',
            pricePerHour: '800',
            color: '#fefefe',
            created: $root.moment($store.state.main.date).format('YYYY-MM-DD HH:mm:ss'),
          },
          onSuccess: () => {
            $store.dispatch('project/add');
          },
        })
      "
    >
      <div :class="$style.item" v-for="item in $store.state.project.list" :key="item.id">
        <div :class="$style.icons">
          <ui-button
            @click="
              $store.dispatch('modal/show', {
                name: 'add/project',
                data: {
                  ...item,
                  created: $root.moment(item.created).format('YYYY-MM-DD HH:mm:ss'),
                },
                onSuccess: () => {
                  $store.dispatch('project/add');
                },
              })
            "
            icon="copy"
            size="compact-square"
            :class="$style.icon"
          />
          <ui-button
            @click="
              $store.dispatch('modal/show', {
                name: 'edit/project',
                data: {
                  ...item,
                  created: $root.moment(item.created).format('YYYY-MM-DD HH:mm:ss'),
                },
                onSuccess: () => {
                  $store.dispatch('project/update');
                },
              })
            "
            icon="pencil"
            size="compact-square"
            :class="$style.icon"
          />
          <ui-button
            @click="
              $store.dispatch('modal/show', {
                name: 'approve',
                data: {
                  title: `Remove '${item.name}' project?`,
                },
                onSuccess: () => {
                  $store.dispatch('project/remove', item.id);
                },
              })
            "
            icon="trash"
            size="compact-square"
            :class="$style.icon"
          />
        </div>

        <div :class="$style.field"><span>Name</span> {{ item.name }}</div>
        <div :class="$style.field"><span>Description</span> {{ item.description }}</div>
        <div :class="$style.field"><span>Price per hour</span> {{ item.pricePerHour }}</div>
        <div :class="$style.field" :style="{ color: item.color }">
          <span>Color</span> {{ item.color }}
        </div>
        <div :class="$style.field">
          <span>Created</span> {{ $root.moment(item.created).format('DD MMM YYYY') }}
        </div>
      </div>
    </ui-block>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  async mounted() {
    this.$store.dispatch('project/getList');
  },
  methods: {},
  data: () => {
    return {
      currentDate: new Date(),
    };
  },
});
</script>

<style lang="scss" module>
@import '../gam_sdk_ui/vue/style/size.scss';
@import '../gam_sdk_ui/vue/style/color.scss';

.main {
  padding: $gap-base;
  height: calc(100% - 50px);
  box-sizing: border-box;
  display: flex;

  .block {
    flex: 1;
    min-height: 0;

    .item {
      position: relative;
      padding: $gap-base;
      background-color: $gray-medium;
      margin-bottom: $gap-base;

      .field {
        display: flex;
        align-items: center;
        margin-bottom: $gap-base;
        color: $text-gray;

        &:last-child {
          margin-bottom: 0;
        }

        > span {
          background: $gray-dark;
          color: $text-gray;
          font-size: 14px;
          padding: 3px 7px;
          border-radius: 4px;
          width: 140px;
          display: block;
          margin-right: $gap-base;
          text-transform: uppercase;
        }
      }

      .icons {
        display: flex;
        position: absolute;
        right: $gap-base;
        top: $gap-base;

        .icon {
          margin-left: $gap-base;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>

<template>
  <div :class="$style.block">
    <div :class="$style.header">
      <div :class="$style.left">
        {{ item.name }}
      </div>
      <div :class="$style.right">{{ $root.moment(item.start).format('HH:mm') }}</div>
      <div :class="$style.right2">
        {{
          $root
            .moment()
            .startOf('day')
            .seconds($root.moment(item.stop).diff($root.moment(item.start), 'seconds'))
            .format('HH:mm')
        }}
      </div>
    </div>
    <div :class="$style.body">
      <div :class="$style.name">
        <div v-html="item.description.replace(/\n/g, '<br>')"></div>

        <ui-button :class="$style.button" icon="pencil" size="empty" style="margin-left: auto" />
        <ui-button
          @click="
            $store.dispatch('modal/show', {
              name: 'approve',
              data: {
                title: 'Remove this task?',
              },
              onSuccess: () => {
                $store.dispatch('work/remove', item.id);
              },
            })
          "
          :class="$style.button"
          icon="trash"
          size="empty"
        />
      </div>
    </div>
    <div :class="$style.gap" v-if="gap()">{{ gap() }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Moment from 'moment';

export default defineComponent({
  props: {
    item: Object,
    nextItem: Object,
    date: Object,
  },
  components: {},
  async mounted() {},
  methods: {
    gap() {
      if (!this.item) {
        return null;
      }
      if (
        !this.nextItem &&
        Moment(this.date).format('YYYY-MM-DD') !== Moment(new Date()).format('YYYY-MM-DD')
      ) {
        return null;
      }

      const a = new Date(this.item.stop).getTime() / 1000;
      const b = new Date(this.nextItem?.start || new Date()).getTime() / 1000;
      if (b - a < 60 * 5) {
        return null;
      }
      return Moment.utc(Moment.duration(b - a, 'seconds').asMilliseconds()).format('HH:mm');
    },
  },
  data: () => {
    return {};
  },
});
</script>

<style lang="scss" module>
.block {
  font-size: 15px;
  margin-bottom: 5px;

  .header {
    display: flex;

    .left,
    .right,
    .right2 {
      padding: 5px 10px;
      border-radius: 6px 6px 0 0;
      color: #b1b1b1;
      background: #80808045;
      font-weight: bold;

      span {
        color: #bdbdbd;
        font-style: italic;
        font-weight: 300;
      }
    }

    .left {
      color: #7be01e;
    }

    .right {
      margin-left: auto;
    }

    .right2 {
      margin-left: 10px;
      color: #caef58;
    }
  }

  .body {
    padding: 10px 15px;
    background: #80808045;
    border-radius: 0 0 6px 6px;
    color: #b1b1b1;

    .name {
      display: flex;
      color: #ffe10c;

      .button {
        margin-left: 15px;
      }
    }

    .component {
      margin-top: 10px;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 5px;
      font-size: 14px;

      > div {
        display: flex;

        span {
          color: #828282;
          margin-right: auto;
        }
        flex: 1;
        background: #80808045;
        padding: 5px 10px;
      }
    }
  }

  .gap {
    background: #80808045;
    padding: 3px 10px;
    text-align: center;
    border-radius: 4px;
    margin-top: 25px;
    margin-bottom: 25px;
    color: #7be01e;
    position: relative;
    width: max-content;
    margin-left: auto;
    margin-right: auto;

    &::before {
      content: '|';
      position: absolute;
      left: 50%;
      top: -22px;
      color: #828282;
    }

    &::after {
      content: '|';
      position: absolute;
      left: 50%;
      bottom: -20px;
      color: #828282;
    }
  }
}
</style>

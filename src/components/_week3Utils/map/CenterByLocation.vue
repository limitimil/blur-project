<template>
  <div class="right-bottom-absolute">
    <div class="children-right-align children-display-block">
      <div class="tooltip" v-if="showTooltip">
        <img src="@/assets/icon/gps/week3/tooltip.svg">
        <div>定位目前位置</div>
      </div>
      <a href="javascript:;" @click="toMyLocation">
        <img
          src="@/assets/icon/gps/week3/locationCta.svg"
          style="max-width: 65px"
          @mouseleave="handleLeave"
          @mouseover="handleHover"
          ref="cta"
          class="cta">
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'LayoutDefault',

  components: {
  },

  setup() {
    const cta = ref(null)
    const proxy = ref(null)
    const showTooltip = ref(false)
    return {
      showTooltip,
      handleHover: () => {
        showTooltip.value = true
      },
      handleLeave: () => {
        showTooltip.value = false
      },
      cta,
      proxy,
    }
  },
}

</script>
<style scoped lang="less">
/* TODO: location information should not define in this component */
.right-bottom-absolute {
  position: absolute;
  bottom: 0;
  right: 0;
}
.tooltip {
  position: relative;
  width: 108px;
  height: 53px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  div {
    max-width: 100%;
    width: fit-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
}
.children-right-align {
  * {
    right: 0;
  }
  img {
    float: right;
  }
}
.children-display-block {
  * {
    display: block;
  }
}
</style>

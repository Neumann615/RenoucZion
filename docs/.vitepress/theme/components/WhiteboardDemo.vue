<template>
  <div id="whiteboard-demo">
    <div ref="a"></div>
  </div>
</template>

<script>
import {initWhiteBoard,} from "../plugins/whiteboard/whiteboard";
import {onMounted, ref} from "vue"

export default {
  name: "WhiteboardDemo",
  setup() {
    let a = ref("")
    onMounted(() => {
      initWhiteBoard(a.value)
    })
    return {
      a
    }
  }
}
</script>
<style>
@import "../plugins/whiteboard/style.css";
</style>
<style scoped>
#whiteboard-demo {
  width: 100%;
  height: 700px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, .1);
}
</style>
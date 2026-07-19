<script setup lang="ts">
import { VPTeamMembers } from "vitepress/theme";
import { creators, siteName } from "../../config/data";
</script>

<template>
  <div class="home-page">
    <div class="vp-doc">
      <h2>贡献者</h2>
      <div class="creators-wrapper">
        <VPTeamMembers size="small" :members="creators" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding-top: 60px;
}
.home-page h2 {
  text-align: center;
}
.creators-wrapper {
  padding-top: 12px;
}
</style>

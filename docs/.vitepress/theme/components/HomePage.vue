<script setup lang="ts">
import { VPTeamMembers } from "vitepress/theme";
import { creators, siteName } from "../../config/data";
</script>

<template>
  <div style="padding-top: 60px">
    <div class="vp-doc">
      <h2 style="text-align: center">贡献者</h2>
      <div style="padding-top: 12px">
        <VPTeamMembers size="small" :members="creators" />
      </div>
    </div>
  </div>
</template>

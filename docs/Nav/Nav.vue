<script setup lang="ts">
import { inBrowser } from "vitepress";
import { ref } from "vue";
import type { NavLink } from "../.vitepress/theme/type";
import { NAV_DATA } from "./data";

const RECENT_LINKS_KEY = "rz-recent-links-key";

const getItems = () => {
  if (!inBrowser) {
    return [];
  }
  const value = localStorage.getItem(RECENT_LINKS_KEY);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return [];
    }
  }
  return [];
};

const items = ref<NavLink[]>(getItems());

const handleClick = (data: NavLink) => {
  let newData = items.value.filter((item) => item.link !== data.link);
  newData.unshift(data);
  if (newData.length > 4) {
    newData = newData.slice(0, 4);
  }
  localStorage.setItem(RECENT_LINKS_KEY, JSON.stringify(newData));
  items.value = newData;
};
</script>

<template>
  <NavLinks
    v-if="items.length"
    title="最近使用"
    @nav-click="handleClick"
    :items="items"
  />
  <NavLinks v-for="item in NAV_DATA" v-bind="item" @nav-click="handleClick" />
</template>

<script setup lang="ts">
import { inBrowser } from "vitepress";
import { ref } from "vue";
import type { NavLink } from "../.vitepress/theme/type";
import { NAV_DATA } from "./data";

const RECENT_LINKS_KEY = "rz-recent-links-key";
const MAX_RECENT = 4;

const getItems = () => {
  if (!inBrowser) {
    return [];
  }
  try {
    const value = localStorage.getItem(RECENT_LINKS_KEY);
    if (value) {
      return JSON.parse(value);
    }
  } catch (e) {
    // localStorage unavailable or corrupted data
  }
  return [];
};

const items = ref<NavLink[]>(getItems());

const handleClick = (data: NavLink) => {
  if (!data.link) return;
  let newData = items.value.filter((item) => item.link !== data.link);
  newData.unshift(data);
  if (newData.length > MAX_RECENT) {
    newData = newData.slice(0, MAX_RECENT);
  }
  items.value = newData;
  try {
    localStorage.setItem(RECENT_LINKS_KEY, JSON.stringify(newData));
  } catch (e) {
    // localStorage unavailable — in-memory state is still updated
  }
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

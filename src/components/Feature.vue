<template>
  <slot v-if="enabled"></slot>
  <slot v-if="enabled" name="on"></slot>
  <slot v-if="!enabled" name="off"></slot>
</template>

<script setup>
import { useFeature } from "src/features/useFeature";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

const { enabled } = useFeature(props.name);
</script>

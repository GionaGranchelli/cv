<template>
  <nav class="view-toggle" aria-label="CV view">
    <NuxtLink
      to="/"
      class="seg"
      :class="{ active: current === 'terminal' }"
      :aria-current="current === 'terminal' ? 'page' : undefined"
    >Terminal</NuxtLink>
    <NuxtLink
      to="/plain"
      class="seg"
      :class="{ active: current === 'plain' }"
      :aria-current="current === 'plain' ? 'page' : undefined"
    >Plain</NuxtLink>
  </nav>
</template>

<script setup lang="ts">
defineProps<{ current: 'terminal' | 'plain' }>()
</script>

<style scoped>
.view-toggle {
  position: fixed;
  top: 14px;
  right: 14px;
  z-index: 50;
  display: flex;
  width: 200px;
  padding: 3px;
  background: rgba(8, 20, 13, 0.9);
  border: 1px solid rgba(99, 255, 154, 0.25);
  border-radius: 999px;
}

.seg {
  flex: 1;
  display: grid;
  place-items: center;
  height: 26px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--muted);
  transition: color 0.2s, background 0.2s;
}

.seg:hover {
  color: var(--text);
}

.seg.active {
  background: var(--accent);
  color: #04140a;
}

@media (max-width: 480px) {
  .view-toggle {
    top: 10px;
    right: 50%;
    transform: translateX(50%);
    width: 176px;
  }

  .seg {
    height: 22px;
    font-size: 0.64rem;
  }
}
</style>

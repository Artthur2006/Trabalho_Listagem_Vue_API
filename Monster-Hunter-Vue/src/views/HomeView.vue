<script setup lang="ts">

import MonsterCard from '@/components/cards/MonsterCard.vue'

import { useMonsters } from '@/composables/useMonsters'

const {
  loading,
  error,

  currentPage,
  totalPages,

  nextPage,
  previousPage,

  paginatedMonsters

} = useMonsters()

</script>

<template>

  <section class="home-view">

    <h1 class="page-title">
      Monster Hunter Compendium
    </h1>

    <div v-if="loading" class="feedback-message">
      Loading monsters...
    </div>

    <div v-else-if="error" class="feedback-message error">
      {{ error }}
    </div>

    <div v-else class="monster-list">

      <MonsterCard v-for="monster in paginatedMonsters" :key="monster.monster_id" :monster="monster" />

    </div>

    <div class="pagination" v-if="!loading">

      <button @click="previousPage" :disabled="currentPage === 1">
        Previous
      </button>

      <span>
        Page {{ currentPage }}
        of {{ totalPages }}
      </span>

      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>

    </div>

  </section>

</template>

<style scoped>
.home-view {
  padding: 2rem;
}

.page-title {
  margin-bottom: 2rem;
}

.feedback-message {
  font-size: 1.2rem;
}

.error {
  color: #ff6b6b;
}

.monster-list {
  display: grid;
  gap: 1rem;
}

.pagination {
  margin-top: 2rem;

  display: flex;
  align-items: center;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;

  border: none;

  border-radius: 8px;

  cursor: pointer;
}

button:disabled {
  opacity: 0.5;

  cursor: not-allowed;
}
</style>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '../services/api'
import type { Monster } from '../types/monter'

const monsters = ref<Monster[]>([])

async function fectchMonsters(): Promise<void> {
  try {
    const response = await api.get('/monsters')

    monsters.value = response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fectchMonsters()
})
</script>

<template>
  <div>
    <h2>Monster List</h2>

    <div v-for="monster in monsters" :key="monster.id">
      {{ monster.name }}
    </div>
  </div>
</template>

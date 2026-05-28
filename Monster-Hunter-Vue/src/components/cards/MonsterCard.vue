<script setup lang="ts">

import type { Monster } from '@/types/monster'

defineProps<{
    monster: Monster
}>()

</script>

<template>

    <article class="monster-card">

        <img
            :src="monster.image_url"
            :alt="monster.name"
            class="monster-image"
        />

        <div class="monster-content">

            <h2>
                {{ monster.name }}
            </h2>

            <p class="monster-subtitle">
                {{ monster.another_name }}
            </p>

            <p class="monster-category">
                {{ monster.category }}
            </p>

        </div>

    </article>

</template>

<style scoped>

.monster-card {
    display: flex;
    gap: 1rem;

    padding: 1rem;

    border-radius: 12px;

    background: #1e1e1e;

    border: 1px solid #333;
}

.monster-image {
    width: 120px;
    height: 120px;

    object-fit: cover;

    border-radius: 8px;
}

.monster-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.monster-subtitle {
    color: #999;
}

.monster-category {
    margin-top: 0.5rem;

    color: #ffb347;
}

</style>
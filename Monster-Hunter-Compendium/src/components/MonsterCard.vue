<script lang="ts">
import { translatedMonsters, translatedCategories } from '@/utils/translator';

export default {
    name: 'MonsterCard',
    props: {
        monster: {
            type: Object,
            required: true
        }
    },
    computed: {
        monsterName(): string {
            if (this.monster && this.monster.name) {
                const termoJapones = this.monster.name;
                return translatedMonsters[termoJapones]?.nome || termoJapones;
            }
            return '';
        },
        monsterCategory(): string {
            if (this.monster && this.monster.category) {
                const catJapones = this.monster.category;
                return translatedCategories[catJapones] || catJapones;
            }
            return 'Não informada';
        }
    },
    methods: {
        seeDetails() {
            if (this.monster) {
                this.$router.push({
                    name: 'monster-details',
                    params: { id: this.monster.monster_id }
                });
            }
        }
    }
}
</script>

<template>
    <div class="card h-100 w-100 shadow-sm border-0 transition-card" style="background-color: #f8f9fa;">
        <img v-if="monster && monster.image_url" :src="monster.image_url" :alt="monsterName" class="card-img-top p-3"
            style="height: 180px; object-fit: contain;" />

        <div class="card-body d-flex flex-column text-center">
            <h5 class="card-title fw-bold mb-3">{{ monsterName }}</h5>

            <p class="card-text text-muted mb-4">
                <small><strong>Categoria:</strong></small><br>
                {{ monsterCategory }}
            </p>

            <button type="button" class="btn btn-primary mt-auto fw-semibold w-100 shadow-none" @click="seeDetails()">
                Ver Detalhes
            </button>
        </div>
    </div>
</template>

<style scoped>
.transition-card {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.transition-card:hover {
    transform: translateY(-5px);
    box-shadow: 0.5rem 1rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>
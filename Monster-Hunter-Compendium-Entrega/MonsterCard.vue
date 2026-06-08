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
    <div class="card h-100 w-100 mh-quest-card">
        <div class="mh-card-frame">
            <div class="mh-img-border-frame">
                <div class="mh-img-inner-bg">
                    <img v-if="monster && monster.image_url" :src="monster.image_url" :alt="monsterName" class="card-img-top p-2 mh-monster-img" />
                </div>
            </div>
            
            <div class="card-body d-flex flex-column text-center pt-3 px-1">
                <h5 class="mh-card-title">{{ monsterName }}</h5>

                <div class="mh-divider"></div>

                <p class="card-text text-muted mb-3">
                    <span class="mh-label">CATEGORIA</span><br>
                    <span class="mh-value">{{ monsterCategory }}</span>
                </p>

                <button type="button" class="btn btn-mh-action mt-auto" @click="seeDetails()">
                    Ver Detalhes
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Montserrat:wght@500;700&display=swap');

.mh-quest-card {
    background-color: #f7f3e9;
    border: 2px solid #8c7647;
    border-radius: 4px;
    padding: 6px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.mh-card-frame {
    border: 1px solid #dcd1b4;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px;
}

.mh-quest-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 20px rgba(43, 37, 25, 0.35);
    border-color: #c49a45;
}

.mh-img-border-frame {
    border: 2px solid #5c4e31;
    padding: 3px;
    background-color: #decfa8;
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.mh-img-inner-bg {
    background-color: #ffffff;
    border: 1px solid #a39472;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1px;
}

.mh-monster-img {
    height: 150px; 
    object-fit: contain;
    filter: drop-shadow(1px 3px 4px rgba(0,0,0,0.15));
    transition: transform 0.3s ease;
}

.mh-quest-card:hover .mh-monster-img {
    transform: scale(1.05);
}

.mh-card-title {
    font-family: 'Cinzel', serif;
    color: #2c2519;
    font-weight: 700;
    font-size: 1.15rem;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
}

.mh-divider {
    height: 2px;
    background: linear-gradient(to right, transparent, #8c7647, transparent);
    margin: 6px 0 10px 0;
}

.mh-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 1px;
    font-weight: 700;
    color: #8c7647;
}

.mh-value {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: #4a3f2c;
    font-size: 0.9rem;
}

.btn-mh-action {
    font-family: 'Montserrat', sans-serif;
    background-color: #362f24;
    border: 1px solid #c49a45;
    color: #e3dec3;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    padding: 10px;
    border-radius: 3px;
    text-transform: uppercase;
    transition: all 0.2s ease;
}

.btn-mh-action:hover {
    background-color: #c49a45;
    color: #1a1710;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { translatedMonsters, translatedCategories, translatedTitles } from '@/utils/translator'

interface Ranking {
    ranking: string;
    vote_year: string;
}

interface BGM {
    name: string;
    url: string;
}

interface MonsterDetails {
    monster_id: string;
    name: string;
    another_name: string;
    category: string;
    title: string[];
    ranking: Ranking[];
    image_url: string;
    bgm: BGM[];
}

export default defineComponent({
    name: 'MonsterDetailsView',

    data() {
        return {
            monster: null as MonsterDetails | null,
            id: '' as string,
            loading: true
        }
    },

    mounted() {
        const paramId = this.$route.params.id;
        this.id = Array.isArray(paramId) ? paramId[0] : paramId;
        this.buscarDetalhes();
    },

    computed: {
        monsterName(): string {
            if (this.monster && this.monster.name) {
                return translatedMonsters[this.monster.name]?.nome || this.monster.name;
            }
            return '';
        },
        monsterApelido(): string {
            if (this.monster && this.monster.name) {
                return translatedMonsters[this.monster.name]?.apelido || this.monster.another_name;
            }
            return '';
        },
        monsterCategory(): string {
            if (this.monster && this.monster.category) {
                return translatedCategories[this.monster.category] || this.monster.category;
            }
            return '';
        }
    },

    methods: {
        traduzirJogo(jogoJapones: string): string {
            return translatedTitles[jogoJapones] || jogoJapones;
        },
        async buscarDetalhes() {
            this.loading = true;
            try {
                const resposta = await axios.get(`https://api.mh-api.com/v1/monsters/${this.id}`);
                
                if (Array.isArray(resposta.data)) {
                    this.monster = resposta.data[0];
                } else if (resposta.data && (resposta.data as any).monster) {
                    this.monster = (resposta.data as any).monster;
                } else {
                    this.monster = resposta.data;
                }
            } catch (erro) {
                console.error("Erro na requisição de detalhes:", erro);
            } finally {
                this.loading = false;
            }
        }
    }
});
</script>

<template>
    <div class="container d-flex flex-column align-items-center mt-4">
        <b-card v-if="!loading && monster" class="shadow p-4 text-center mb-4" style="max-width: 650px; width: 100%;">
            <h2 class="fw-bold mb-1">{{ monsterName }}</h2>
            <h5 class="text-muted mb-4">Título: {{ monsterApelido }}</h5>

            <img class="img-monster mb-4" :src="monster.image_url" :alt="monsterName"
                style="height: 220px; object-fit: contain;" />

            <div class="row text-start mb-4 bg-light p-3 rounded mx-0">
                <div class="col-6 mb-2">
                    <strong>Categoria:</strong> <br>
                    <span class="text-secondary">{{ monsterCategory }}</span>
                </div>
                <div class="col-6 mb-2">
                    <strong>Ranking Oficial:</strong> <br>
                    <span class="text-secondary" v-if="monster.ranking && monster.ranking.length > 0">
                        {{ monster.ranking[0].ranking }}º Lugar ({{ monster.ranking[0].vote_year }})
                    </span>
                    <span class="text-muted" v-else>Não ranqueado</span>
                </div>
            </div>

            <div class="text-start mb-4 mx-2">
                <h6 class="fw-bold mb-2">Jogos Recentes (Aparições):</h6>
                <div class="d-flex flex-wrap gap-1">
                    <span v-for="title in monster.title" :key="title" class="badge bg-primary text-wrap">
                        {{ traduzirJogo(title) }}
                    </span>
                </div>
            </div>

            <div v-if="monster.bgm && monster.bgm.length > 0" class="text-start mb-4 mx-2">
                <h6 class="fw-bold mb-2">Trilha Sonora:</h6>
                <div v-for="(music, index) in monster.bgm" :key="index"
                    class="p-2 border rounded d-flex justify-content-between align-items-center bg-white">
                    <span class="small text-truncate me-2">🎵 {{ music.name }}</span>
                    <a :href="music.url" target="_blank"
                        class="btn btn-danger btn-sm text-nowrap fw-semibold shadow-none">
                        Ouvir no YouTube
                    </a>
                </div>
            </div>

            <b-button variant="secondary" class="mt-2 w-100 fw-semibold shadow-none" @click="$router.back()">
                Voltar para a Lista
            </b-button>
        </b-card>

        <div v-else class="text-muted mt-5 text-center">
            <div class="spinner-border text-primary mb-2" role="status"></div>
            <br>Carregando dados completos do monstro...
        </div>
    </div>
</template>

<style scoped>
.img-monster {
    max-width: 100%;
    margin: 0 auto;
    display: block;
}
.badge {
    font-size: 0.85rem;
    padding: 0.4em 0.65em;
}
</style>
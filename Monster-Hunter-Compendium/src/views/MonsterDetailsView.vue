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
    <div class="mh-details-wrapper">
        <div class="container d-flex flex-column align-items-center pt-4 pb-5">
            
            <div v-if="!loading && monster" class="mh-guide-book shadow">
                <div class="mh-book-inner">
                    
                    <div class="mh-header-block text-center mb-3">
                        <h2 class="mh-guide-title">{{ monsterName }}</h2>
                        <h5 class="mh-guide-subtitle" v-if="monsterApelido">Conhecido como: {{ monsterApelido }}</h5>
                    </div>

                    <div class="mh-divider-heavy"></div>

                    <div class="mh-img-frame mb-4">
                        <img class="img-monster" :src="monster.image_url" :alt="monsterName" />
                    </div>

                    <div class="row text-start mb-4 mh-info-shelf mx-0">
                        <div class="col-6 py-3 px-3 border-end border-custom-dark">
                            <span class="mh-shelf-label">CATEGORIA</span>
                            <div class="mh-shelf-value mh-highlight-amber">{{ monsterCategory }}</div>
                        </div>
                        <div class="col-6 py-3 px-3">
                            <span class="mh-shelf-label">RANKING DA GUILDA</span>
                            <div class="mh-shelf-value" v-if="monster.ranking && monster.ranking.length > 0">
                                🏆 {{ monster.ranking[0].ranking }}º Lugar <small class="text-muted">({{ monster.ranking[0].vote_year }})</small>
                            </div>
                            <div class="mh-shelf-value text-muted italic" v-else>Não ranqueado</div>
                        </div>
                    </div>

                    <div class="text-start mb-4 px-1">
                        <h6 class="mh-section-heading">Histórico de Aparições (Guilda)</h6>
                        <div class="d-flex flex-wrap gap-2 pt-2">
                            <span v-for="title in monster.title" :key="title" class="badge mh-game-badge">
                                ⚔️ {{ traduzirJogo(title) }}
                            </span>
                        </div>
                    </div>

                    <div v-if="monster.bgm && monster.bgm.length > 0" class="text-start mb-5 px-1">
                        <h6 class="mh-section-heading">Tema de Combate Cadastrado</h6>
                        <div class="mh-audio-list pt-1">
                            <div v-for="(music, index) in monster.bgm" :key="index" class="mh-audio-player-box mt-2">
                                <span class="mh-music-name">🎵 {{ music.name }}</span>
                                <a :href="music.url" target="_blank" class="btn btn-mh-yt">
                                    Ouvir Battle Theme
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="px-1">
                        <button class="btn btn-mh-back w-100" @click="$router.back()">
                            Voltar ao Painel da Lista
                        </button>
                    </div>

                </div>
            </div>

            <div v-else class="text-center mt-5 mh-details-loading">
                <div class="spinner-border text-warning mb-3" role="status"></div>
                <br><span class="mh-loading-text">Descriptografando pergaminhos do monstro...</span>
            </div>

        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=Montserrat:wght@400;500;600;700&display=swap');

/* Wrapper Geral */
.mh-details-wrapper {
    background-color: #171b1f;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
}

/* Container do Livro */
.mh-guide-book {
    background-color: #f7f3e9;
    border: 2px solid #8c7647;
    border-radius: 4px;
    padding: 6px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3) !important;
}

.mh-book-inner {
    border: 1px solid #dcd1b4;
    padding: 24px 16px;
}

/* Tipografia e Alinhamentos */
.mh-header-block {
    line-height: 1.2;
}

.mh-guide-title {
    font-family: 'Cinzel', serif;
    color: #2c2519;
    font-weight: 800;
    font-size: 1.85rem;
    margin-bottom: 4px;
}

.mh-guide-subtitle {
    font-family: 'Montserrat', sans-serif;
    color: #705e38;
    font-style: italic;
    font-size: 0.95rem;
    font-weight: 500;
}

/* Divisor */
.mh-divider-heavy {
    height: 2px;
    background: linear-gradient(to right, transparent, #8c7647, transparent);
    margin: 16px 0;
}

/* Moldura da Imagem */
.mh-img-frame {
    background-color: #ffffff;
    border: 1px solid #dcd1b4;
    padding: 12px;
    border-radius: 2px;
    box-shadow: inset 0 0 8px rgba(0,0,0,0.05);
}

.img-monster {
    max-height: 220px;
    object-fit: contain;
    display: block;
    margin: 0 auto;
    max-width: 100%;
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.12));
}

/* Painel de Informações (Shelf) */
.mh-info-shelf {
    background-color: #f0eae1;
    border: 1px solid #dcd1b4;
    border-radius: 3px;
}

.border-custom-dark {
    border-color: #d1c5a5 !important;
}

.mh-shelf-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    color: #8c7647;
    letter-spacing: 1px;
    display: block;
    margin-bottom: 2px;
}

.mh-shelf-value {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.95rem;
    color: #4a3f2c;
    font-weight: 600;
    line-height: 1.3;
}

.mh-highlight-amber {
    color: #8c6d2b;
}

/* Cabeçalhos de Seção */
.mh-section-heading {
    font-family: 'Cinzel', serif;
    font-weight: 700;
    color: #2c2519;
    font-size: 1rem;
    border-bottom: 1px solid #dcd1b4;
    padding-bottom: 6px;
    margin-bottom: 12px;
}

/* Badges de Jogos */
.mh-game-badge {
    background-color: #362f24;
    color: #e3dec3;
    border: 1px solid #c49a45;
    font-weight: 600;
    font-size: 0.8rem;
    padding: 6px 10px;
    border-radius: 3px;
}

/* Linha de Trilha Sonora */
.mh-audio-player-box {
    background-color: #ffffff;
    border: 1px solid #dcd1b4;
    border-radius: 3px;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mh-music-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: #4a3f2c;
    padding-right: 10px;
}

/* Botões do Ecossistema */
.btn-mh-yt {
    font-family: 'Montserrat', sans-serif;
    background-color: #8c3535;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.75rem;
    text-transform: uppercase;
    border: 1px solid #6e2424;
    padding: 6px 12px;
    border-radius: 3px;
    transition: background-color 0.2s ease;
}

.btn-mh-yt:hover {
    background-color: #b34242;
    color: #ffffff;
}

.btn-mh-back {
    font-family: 'Montserrat', sans-serif;
    background-color: #362f24;
    border: 1px solid #c49a45;
    color: #e3dec3;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    padding: 12px;
    border-radius: 3px;
    text-transform: uppercase;
    transition: all 0.2s ease;
}

.btn-mh-back:hover {
    background-color: #c49a45;
    color: #1a1710;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

/* Utilitários adicionais */
.italic { font-style: italic; }

/* Loader */
.mh-details-loading {
    padding: 50px;
}
.mh-loading-text {
    color: #c49a45;
    font-style: italic;
    font-weight: 500;
}
</style>
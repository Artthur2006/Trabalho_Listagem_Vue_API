<script lang="ts">
import axios from 'axios';
import MonsterCard from '@/components/MonsterCard.vue';
import SearchMonster from '@/components/SearchMonster.vue';
import { translatedMonsters, translatedCategories } from '@/utils/translator';

interface Monster {
    monster_id: string;
    name: string;
    category: string;
    image_url: string;
}

export default {
    name: 'MonsterListView',
    components: {
        MonsterCard,
        SearchMonster
    },
    data() {
        return {
            monsters: [] as Monster[],
            limit: 20,
            total_monsters: 0,
            current_page: 1,
            search: '',
            loading: true
        }
    },
    mounted() {
        const savedPage = localStorage.getItem('mh_current_page');
        if (savedPage) {
            this.current_page = parseInt(savedPage, 10);
        }
        this.listMonsters();
    },
    computed: {
        filteredMonsters(): Monster[] {
            if (!this.search) {
                return this.monsters;
            }
            const termoBusca = this.search.toLowerCase();
            return this.monsters.filter(monster => {
                const dadosMonstro = translatedMonsters[monster.name];
                const nomeTraduzido = dadosMonstro?.nome || monster.name;
                const apelidoTraduzido = dadosMonstro?.apelido || '';
                const categoriaTraduzida = translatedCategories[monster.category] || monster.category;

                return nomeTraduzido.toLowerCase().includes(termoBusca) ||
                    apelidoTraduzido.toLowerCase().includes(termoBusca) ||
                    categoriaTraduzida.toLowerCase().includes(termoBusca);
            });
        },
        paginatedMonsters(): Monster[] {
            const start = (this.current_page - 1) * this.limit
            const end = start + this.limit
            return this.filteredMonsters.slice(start, end)
        },
        totalPages(): number {
            return Math.ceil(this.total_monsters / this.limit) || 1
        }
    },
    watch: {
        search() {
            this.total_monsters = this.filteredMonsters.length
            this.current_page = 1
            localStorage.setItem('mh_current_page', '1');
        },
        current_page(newPage) {
            localStorage.setItem('mh_current_page', newPage.toString());
        }
    },
    methods: {
        async listMonsters() {
            this.loading = true;
            try {
                const response = await axios.get('https://api.mh-api.com/v1/monsters');
                this.monsters = response.data.monsters;
                this.total_monsters = response.data.monsters.length;
            }
            catch (error) {
                console.error("Erro ao listar monstros:", error);
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<template>
    <div class="mh-list-wrapper">
        <div class="d-flex container align-items-center flex-column pt-4 pb-5">
            <SearchMonster v-model="search" class="mb-5 w-50" style="min-width: 280px;" />

            <div v-if="loading" class="text-center my-5 mh-loading-box">
                <div class="spinner-border text-warning mb-3" role="status"></div>
                <p class="mh-loading-text">Consultando os arquivos da Guilda...</p>
            </div>

            <div v-else class="d-flex flex-wrap justify-content-center gap-4 w-100" style="max-width: 1000px;">
                <div v-for="monster in paginatedMonsters" :key="monster.monster_id" class="mh-card-container">
                    <MonsterCard :monster="monster" />
                </div>

                <div v-if="filteredMonsters.length === 0" class="mh-no-results my-5">
                    Nenhum monstro catalogado corresponde à pesquisa.
                </div>
            </div>

            <nav v-if="totalPages > 1 && !loading" class="mt-5" aria-label="Navegação">
                <ul class="pagination mh-pagination">
                    <li class="page-item" :class="{ disabled: current_page === 1 }">
                        <button class="page-link mh-page-btn arrow" @click="current_page--">« Ant</button>
                    </li>

                    <li v-for="page in totalPages" :key="page" class="page-item"
                        :class="{ active: current_page === page }">
                        <button class="page-link mh-page-btn" @click="current_page = page">{{ page }}</button>
                    </li>

                    <li class="page-item" :class="{ disabled: current_page >= totalPages }">
                        <button class="page-link mh-page-btn arrow" @click="current_page++">Próx »</button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');

.mh-list-wrapper {
    background-color: #171b1f;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
}

.mh-card-container {
    width: 225px;
}

.mh-loading-box {
    padding: 40px;
}

.mh-loading-text {
    color: #dfb76c;
    font-weight: 500;
    font-style: italic;
}

.mh-no-results {
    color: #a4a9b0;
    font-style: italic;
    font-size: 1.1rem;
}

/* Estilização Completa da Paginação */
.mh-pagination {
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
}

.mh-page-btn {
    background-color: #24292e;
    border: 1px solid #453d2e;
    color: #c49a45;
    font-weight: 700;
    padding: 8px 14px;
    border-radius: 3px !important;
    transition: all 0.2s ease;
}

.mh-page-btn:hover {
    background-color: #383f47;
    border-color: #c49a45;
    color: #dfb76c;
}

.page-item.active .mh-page-btn {
    background-color: #c49a45;
    border-color: #dfb76c;
    color: #111417;
}

.page-item.disabled .mh-page-btn {
    background-color: #1b1f23;
    border-color: #2d3238;
    color: #4e555e;
    pointer-events: none;
}
</style>
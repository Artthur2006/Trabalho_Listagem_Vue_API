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
    <div class="d-flex container align-items-center flex-column mt-4 pb-5">
        <SearchMonster v-model="search" class="mb-4 w-50" style="min-width: 280px;" />

        <div v-if="loading" class="text-center my-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-2 text-muted">Carregando a lista da guilda...</p>
        </div>

        <div v-else class="d-flex flex-wrap justify-content-center gap-3 w-100" style="max-width: 960px;">
            <div v-for="monster in paginatedMonsters" :key="monster.monster_id" style="width: 220px;">
                <MonsterCard :monster="monster" />
            </div>

            <div v-if="filteredMonsters.length === 0" class="text-muted my-5">
                Nenhum monstro encontrado para a sua busca.
            </div>
        </div>

        <nav v-if="totalPages > 1 && !loading" class="mt-4" aria-label="Navegação de páginas">
            <ul class="pagination m-0">
                <li class="page-item" :class="{ disabled: current_page === 1 }">
                    <button class="page-link shadow-none" @click="current_page--">Anterior</button>
                </li>

                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: current_page === page }">
                    <button class="page-link shadow-none" @click="current_page = page">{{ page }}</button>
                </li>

                <li class="page-item" :class="{ disabled: current_page >= totalPages }">
                    <button class="page-link shadow-none" @click="current_page++">Próximo</button>
                </li>
            </ul>
        </nav>
    </div>
</template>
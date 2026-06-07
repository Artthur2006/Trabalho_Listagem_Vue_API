<script lang="ts">
import axios from 'axios';
import MonsterCard from '@/components/MonsterCard.vue';
import SearchMonster from '@/components/SearchMonster.vue';

export default {
    name: 'MonsterListView',
    components: {
        MonsterCard,
        SearchMonster
    },

    data() {
        return {
            monsters: [],
            limit: 20,
            total_monsters: 0,
            current_page: 1,
            search: ''
        }
    },

    mounted() {
        this.listMonsters()
    },

    computed: {
        filteredMonsters() {
            return this.search
                ? this.monsters.filter(monster => monster.name?.toLowerCase().includes(this.search.toLowerCase()))
                : this.monsters
        },

        paginatedMonsters() {
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
        }
    },
    methods: {
        async listMonsters() {
            try {
                const api = axios.create({
                    baseURL: 'https://api.mh-api.com/v1'
                })

                const response = await api.get('/monsters')

                this.monsters = response.data.monsters
                this.total_monsters = response.data.monsters.length
            }
            catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<template>
    <div class="d-flex container align-items-center flex-column mt-4">

        <SearchMonster v-model="search" class="mb-4 w-50" style="min-width: 280px;" />

        <div class="d-flex flex-wrap justify-content-center gap-3 w-100" style="max-width: 960px;">
            <div v-for="monster in paginatedMonsters" :key="monster.monster_id">
                <MonsterCard :monster="monster" />
            </div>
        </div>

        <nav class="mt-4" aria-label="Navegação de páginas">
            <ul class="pagination m-0">
                
                <li class="page-item" :class="{ disabled: current_page === 1 }">
                    <button class="page-link shadow-none" @click="current_page--">
                        Anterior
                    </button>
                </li>

                <li 
                    v-for="page in totalPages" 
                    :key="page" 
                    class="page-item" 
                    :class="{ active: current_page === page }"
                >
                    <button class="page-link shadow-none" @click="current_page = page">
                        {{ page }}
                    </button>
                </li>

                <li class="page-item" :class="{ disabled: current_page >= totalPages }">
                    <button class="page-link shadow-none" @click="current_page++">
                        Próximo
                    </button>
                </li>

            </ul>
        </nav>

    </div>
</template>
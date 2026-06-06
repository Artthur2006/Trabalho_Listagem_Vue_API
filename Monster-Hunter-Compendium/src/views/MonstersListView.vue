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
            total_monsters: 0,
            limit: 20,
            inicial_page: 1,
            offset: 0,
            search: ''
        }
    },

    mounted() {
        this.listMonsters()
    },

    computed: {
        filteredMonsters() {
            return this.monsters.filter(monster =>
                monster.name?.toLowerCase().includes(this.search.toLowerCase())
            )
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
            }
            catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<template>
    <div class="container d-flex flex-column align-items-center mt-4">

        <SearchMonster 
            v-model="search" 
            class="w-50 mb-4" 
            style="min-width: 280px;" 
        />

        <b-row class="w-100 justify-content-center">
            <b-col cols="12" md="4" lg="3" class="mb-3 d-flex justify-content-center"
                v-for="monster in filteredMonsters" :key="monster.monster_id">
                <MonsterCard :monster="monster" />
            </b-col>
        </b-row>

    </div>
</template>
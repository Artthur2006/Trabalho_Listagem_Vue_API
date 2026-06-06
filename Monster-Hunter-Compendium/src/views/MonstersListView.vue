<script lang="ts">
import MonsterCard from '@/components/MonsterCard.vue'
import SearchMonster from '@/components/SearchMonster.vue'

export default {
    name: 'MonsterListView',

    components: {
        MonsterCard,
        SearchMonster
    },

    data() {
        return {
            monsters: [],
            search: ''
        }
    }
}
</script>

<template>
    <div class="d-flex container align-items-center flex-column">

        <SearchMonster v-model="search" class="w-50 mb-3" />
        <b-row>
            <b-col class="mb-3" v-for="monster in monsters" :key="monster.id">
                <MonsterCard :monster="monster" />
            </b-col>
        </b-row>
    </div>
</template>
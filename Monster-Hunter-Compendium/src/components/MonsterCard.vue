<script lang="ts">
import { capitalize } from 'vue';

export default {
    name: 'MonsterCard',

    props: {
        monster: Object
    },

    computed: {
        monsterName() {
            if (this.monster) {
                return capitalize(this.monster.name)
            }
            return ''
        }
    },

    methods: {
        seeDetails() {
            if (this.monster) {
                this.$router.push({
                    name: 'monster-details',
                    params: {
                        id: this.monster.monster_id
                    }
                })
            }
        }
    }
}
</script>

<template>
    
    <b-card
        class="text-center mb-3 card-monster"
    >
        <h5>{{ monsterName }}</h5>
        
        <img
            v-if="monster.image_url"
            :src="monster.image_url"
            fluid
            style="height: 150px;"
            class="mb-2"
        />

        <p>
            <strong>Categoria:</strong>
            {{ monster.category }}
        </p>

        <b-button
            variant="primary"
            class="mt-2"
            @click="seeDetails()"
        >
            Ver Detalhes
        </b-button>
    </b-card>
</template>

<style>
.card-monster {
    width: 250px;
}
</style>
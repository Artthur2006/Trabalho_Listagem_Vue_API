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
            } else {
                return ''
            }
        }
    },

    methods: {
        seeDetails() {
            if (this.monster) {
                this.$router.push({
                    name: 'monster-details',
                    params: {
                        id: this.monster.id
                    }
                })
            }
        }
    }
}
</script>

<template>
    <b-card
        :title="monsterName"
        class="text-center mb-3 card-monster"
    >
        <b-img
            src="https://placehold.co/200x200?text=Monster"
            style="height: 120px;"
        />

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
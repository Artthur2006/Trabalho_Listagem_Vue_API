<script lang="ts">
export default {
    name: 'DetailsView',
    data() {
        return {
            monster: null
        }
    }
}
</script>

<template>
    <div class="container d-flex flex-column text-center">

        <b-card>

            <h3>Nome do Monstro</h3>

            <b-img
                class="img-monster mb-3"
                src="https://placehold.co/300x300"
            />

            <p>
                <b>Espécie:</b> Flying Wyvern
            </p>

            <p>
                <b>Descrição:</b>
                Descrição do monstro será exibida aqui.
            </p>

            <b-button
                variant="secondary"
                class="mt-2"
                @click="$router.back()"
            >
                Voltar
            </b-button>

        </b-card>
    </div>
</template>
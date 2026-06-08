<script lang="ts">
export default {
    name: 'SearchMonster',
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue']
}
</script>

<template>
    <div class="search-container">
        <input type="text" :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            placeholder="Busque por nome, apelido ou categoria..." class="form-control mh-input" />
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');

.search-container {
    font-family: 'Montserrat', sans-serif;
}

.mh-input {
    background-color: #fcf9f2;
    border: 2px solid #8c7647;
    color: #2b2519;
    border-radius: 4px;
    padding: 12px 20px;
    font-weight: 500;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
}

.mh-input::placeholder {
    color: #a4967c;
    font-style: italic;
}

.mh-input:focus {
    background-color: #ffffff;
    border-color: #c49a45;
    box-shadow: 0 0 8px rgba(196, 154, 69, 0.4);
    outline: none;
}
</style>
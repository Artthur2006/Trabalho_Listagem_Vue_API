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
    <input type="text" :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        placeholder="Busque por nome, apelido ou categoria..." class="form-control" />
</template>
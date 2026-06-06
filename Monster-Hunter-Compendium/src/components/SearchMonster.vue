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
    <b-form-input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Busque por um monstro..."
        class="w-50 mb-3"
    />
</template>
import {
    ref,
    onMounted,
    computed
} from 'vue'

import { getMonsters } from '@/services/monsterService'

import type { Monster } from '@/types/monster'

const monsters = ref<Monster[]>([])

const loading = ref<boolean>(false)

const error = ref<string | null>(null)

const currentPage = ref<number>(1)

const itemsPerPage = 12

export function useMonsters() {

    async function fetchMonsters(): Promise<void> {

        try {

            loading.value = true

            error.value = null

            monsters.value = await getMonsters()

        } catch (err: unknown) {

            console.error(err)

            error.value = 'Failed to load monsters.'

        } finally {

            loading.value = false
        }
    }

    const totalPages = computed(() => {

        return Math.ceil(
            monsters.value.length / itemsPerPage
        )
    })

    const paginatedMonsters = computed(() => {

        const start =
            (currentPage.value - 1) * itemsPerPage

        const end = start + itemsPerPage

        return monsters.value.slice(start, end)
    })

    function nextPage(): void {

        if (currentPage.value < totalPages.value) {

            currentPage.value++
        }
    }

    function previousPage(): void {

        if (currentPage.value > 1) {

            currentPage.value--
        }
    }

    onMounted(fetchMonsters)

    return {
        loading,
        error,

        currentPage,
        totalPages,

        nextPage,
        previousPage,

        paginatedMonsters
    }
}
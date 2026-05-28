import api from './api'

import type {
    Monster,
    MonstersResponse
} from '@/types/monster'

export async function getMonsters(): Promise<Monster[]> {

    const response = await api.get<MonstersResponse>('/monsters')

    return response.data.monsters
}
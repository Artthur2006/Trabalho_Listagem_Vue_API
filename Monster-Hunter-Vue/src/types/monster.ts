export interface MonsterRanking {
    ranking: string
    vote_year: string
}

export interface MonsterBgm {
    name: string
    url: string
}

export interface Monster {
    monster_id: string
    name: string
    another_name: string
    category: string
    title: string[]
    ranking: MonsterRanking[]
    image_url: string
    bgm: MonsterBgm[]
}

export interface MonstersResponse {
    total: number
    monsters: Monster[]
}
export interface Emotion {
    label: string
    music: Music[]
    strategies: string[]
    test_links: string[]
}

export interface Music {
    name: string
    youtube: string
}

export interface User {
    avatar_img: any
    img_type: string
    user_id: string
    username: string
    password: string
    email: string
    token: string
}

export interface Post {
    post_id: string
    user_id: string
    title: string
    content: string
    date: string
    avatar_img: any
}
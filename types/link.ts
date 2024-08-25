export type Link = {
    title: string,
    links: Contact[]
}

type Contact = {
    name: string,
    url: string,
    isButton: boolean
}
export type Note = {
    id: string
} & NoteData

export type RawNote = {
    id: string
} & RawNoteData

export type RawNoteData = {
    id: string
    title: string
    markdown: string
    tagIds: string[]
}
export type NoteData = {
    id: string
    title: string
    markdown: string
    tagIds: Tag[]
}

export type Tag = {
    id: string
    label: string
}
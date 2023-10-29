'use client'
import React from "react"
import "easymde/dist/easymde.min.css"
import { Tag } from "@/app/context/NoteDataTypes"

type NoteForm = {
  title: string
  body: string
  createdAt: string
  editedAt: string
  tags: Tag[]
}
const PlayerNotes = () => {
  return (
     <h1>Notes</h1>
  )
}

export default PlayerNotes
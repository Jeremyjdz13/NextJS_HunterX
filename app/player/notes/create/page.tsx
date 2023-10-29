'use client'
import React from "react"
import { useForm, Controller } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"
import { Tag } from "../../../context/NoteDataTypes" 
import Link from "next/link"

type NoteForm = {
  title: string
  body: string
  createdAt: string
  editedAt: string
  tags: Tag[]
}
export default function CreateNote() {
  const {register, control, handleSubmit} = useForm<NoteForm>()
  return (
      <form 
        className="max-w-xl space-y-3" 
        onSubmit={handleSubmit((data: any) => console.log(data, "Form data"))}
      >
        <label>Title</label>
        <input 
          placeholder="title" 
          type="title"
          id="title"
          {...register('title')} 
        />
          <Controller 
          name="body"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="body" {...field}/>}          
          />
        <button type="submit">Create</button>
        <Link href='/player/notes'>Cancel</Link>
      </form>
  )
}

'use client'
import React from "react"
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"

const PlayerNotes = () => {
  return (
    <div>
      <form>
        <label>Title</label>
        <SimpleMDE />
        <button>Create</button>
      </form>
    </div>
  )
}

export default PlayerNotes
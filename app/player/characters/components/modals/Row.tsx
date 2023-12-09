import React from 'react'
import classNames from 'classnames'

type Props = {
    name: string
    rank: number
    isHighlighted: boolean
}
function Row({ name, rank, isHighlighted }: Props) {
  return (
    <div className={classNames(
        "p-1 text-center",
        isHighlighted ? "bg-yellow-200 p-1 text-center" : ''
    )}
    >
        {name} : {rank}
    </div>
  )
}

export default Row
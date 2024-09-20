import React from 'react'

type Props = {
    selectedIndexes: number[],
    index: number,
    setSelectedIndexes:React.Dispatch<React.SetStateAction<number[]>>
}

const BoxInner = ({selectedIndexes, index}: Props) => {

  return (
    <div
        data-testid={`grid-cell-${index}`}
        key={index}
        className={`w-20 h-20 rounded-md bg-gray-100 transition-all ${
            selectedIndexes.includes(index) ? "ring-4 ring-black" : ""
        } `}
    />
  )
}

export default BoxInner
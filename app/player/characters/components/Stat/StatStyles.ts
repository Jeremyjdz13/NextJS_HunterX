import { CSSProperties } from "react";

type StatStyles = {
    container: CSSProperties
    title: CSSProperties
    rank: CSSProperties
    result: CSSProperties
    button: CSSProperties
    buttonContainer: CSSProperties
    grid_2: CSSProperties
    grid_3: CSSProperties
    grid_4: CSSProperties
    grid_5: CSSProperties
    grid_6: CSSProperties
    grid_7: CSSProperties
    grid_8: CSSProperties
}

export const statStyles: StatStyles = {
    container: {},
    title: {},
    rank: {},
    result: {},
    button: {},
    buttonContainer: {},
    grid_2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    grid_3: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
    grid_4: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
    grid_5: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
    },
    grid_6: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
    },
    grid_7: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
    },
    grid_8: {
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'auto auto', // Add this line
      }
      
}
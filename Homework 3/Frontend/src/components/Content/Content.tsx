import React from 'react'
import './Content.scss'

type Props = {
    content: string[],
    isCustomStyled: string | undefined
}

function Content({ content, isCustomStyled } : Props) {
  return (
    <div className={isCustomStyled == undefined ? 'content-container' : isCustomStyled}>
        {content.length > 0 
        &&
        content.map(c => <p>{c}</p>)
        }
    </div>
  )
}

export default Content
import React from 'react'
import './Content.scss'

type Props = {
    content: string[]
}

function Content({ content } : Props) {
  return (
    <div className='content-container'>
        {content.length > 0 
        &&
        content.map(c => <p>{c}</p>)
        }
    </div>
  )
}

export default Content
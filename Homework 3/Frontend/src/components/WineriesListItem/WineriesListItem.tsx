import React, { MouseEventHandler } from 'react'
import './WineriesListItem.scss';
import { Link } from 'react-router-dom';
import locationIcon from '../../assets/union_black.png'
import ratingIcon from '../../assets/Star.png'

type Props = {
  onMouseOver: MouseEventHandler<HTMLDivElement> | undefined
}

function WineriesListItem({ onMouseOver }: Props) {
  return (
    <div onMouseEnter={Boolean(onMouseOver) ? onMouseOver : undefined} className="wineries-list-container">
        <div className="wineries-list-container-card">
            <div className="wineries-list-container-card-left">
                <img src={locationIcon} alt="location-icon" className='wineries-list-container-card-left-location'/>
                <img src={ratingIcon} alt="rating-icon" className='wineries-list-container-card-left-ratingicon'/>
                <span className='wineries-list-container-card-left-rating'>4.9</span>
                <span className='wineries-list-container-card-left-winery'>Винарија Тиквеш</span>
            </div>
            <div className="wineries-list-container-card-right">
                <Link to="/winery"><button className="wineries-list-container-card-right-button">Видете повеќе</button></Link>
            </div>
        </div>
    </div>
  )
}

export default WineriesListItem
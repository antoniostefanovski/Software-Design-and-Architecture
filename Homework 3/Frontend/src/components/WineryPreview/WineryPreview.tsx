import React from 'react'
import star from '../../assets/Star.png';
import './WineryPreview.scss';

type Props = {
    img: string,
    rating: number,
    name: string,
    description: string
};

function WineryPreview({ img, rating, name, description }: Props) {
  return (
    <div className='winery-preview'>
        <img src={img} alt={name} className='winery-preview-image' />
        <div className='winery-preview-info'>
            <div className='winery-preview-info-rating'>
                <img className='winery-preview-info-rating-star' src={star} alt='star' />
                <span className='winery-preview-info-rating-number'>{rating}</span>
            </div>
            <div className='winery-preview-info-name'>{name}</div>
        </div>
        <div className='winery-preview-description'>{description}</div>
    </div>
  )
}

export default WineryPreview
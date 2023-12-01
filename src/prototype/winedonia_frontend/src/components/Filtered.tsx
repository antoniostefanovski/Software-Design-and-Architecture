import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
    name: string
}

function Filtered({name}: Props) {
    return (
        <>
        <NavLink to={{ pathname: '/wineryDetails' }} state={{ name: name }} className="filtered-main">
            <div className="filtered-card">
                <div className="filtered-card-rating-div">
                    <img src={process.env.PUBLIC_URL + '/images/rating_img.jpg'}  className='filtered-card-rating'></img>
                </div>
                <div className="filtered-card-name">
                    <h2>{name}</h2>
                </div>
            </div>
        </NavLink>
        </>
    )
};

export default Filtered;
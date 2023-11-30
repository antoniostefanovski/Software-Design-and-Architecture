import React from "react";
import '../styles/Combined.css';
import Slider from "../components/slider";
import Back from "../components/Back";
import { NavLink } from "react-router-dom";

function WineryDetails() {
    return (
        <>
    <div className="div-contains-h1">
      <div>
        <h1>Винарија - <span className="h1-span">Stobi</span> </h1>
      </div>

      <div className="small-div">
        <img src={process.env.PUBLIC_URL + '/images/rating_img.jpg'}  className='rating-img'></img>
      </div>
    </div>
    
    <div className="main-block">
        <div className="main-block-text">
          <div className="main-block-text-text">
          <p className="main-text"> 
          Stobi winery is located only 80 km from the capital of Skopje, in the heart of Macedonia, 
          in the Tikves wine region – the biggest and the most important wine region which stretches on 13.000 ha, 
          along the same latitude as Rioja and Ribera del Duero.
          </p>
          <p className="main-text"> 
          Stobi winery is located only 80 km from the capital of Skopje, in the heart of Macedonia, 
          in the Tikves wine region – the biggest and the most important wine region which stretches on 13.000 ha, 
          along the same latitude as Rioja and Ribera del Duero.
          </p>
          <p className="main-text"> 
          Stobi winery is located only 80 km from the capital of Skopje, in the heart of Macedonia, 
          in the Tikves wine region – the biggest and the most important wine region which stretches on 13.000 ha, 
          along the same latitude as Rioja and Ribera del Duero.
          </p>
          </div>
        </div>
            <div className="main-block-slider">
            <Slider />
            </div>
        </div>

        <div>
          <NavLink className={"btn-back"} to={"/"}>Назад кон почетна</NavLink>
          <Back />
        </div>
    </>
    )
};

export default WineryDetails;
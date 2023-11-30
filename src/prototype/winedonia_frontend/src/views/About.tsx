import React from "react";
import wineryImg from '../assets/winery1.jpg';
import '../styles/Combined.css';
import Back from "../components/Back";

function About() {
    return(
        <>
            <div className="container">
                <div className="image">
                    <img src={wineryImg} alt="About Us Image"/>
                </div>
                    <div className="text">
                        <h2>About Us</h2>
                        <p>
                        Welcome to the heart of Macedonian wine country, where centuries-old traditions meet innovative winemaking techniques. 
                            Our website proudly showcases the most esteemed and cherished wineries that grace the picturesque landscapes of this renowned region.
                            We invite you to embark on a journey through Macedonia's rich viticultural heritage, where each winery we feature has a unique story to tell. 
                            From the sun-kissed vineyards nestled against the backdrop of breathtaking mountains to the skilled hands that meticulously cultivate and craft the finest grapes into exquisite wines, 
                            our platform celebrates the passion and dedication of these winemakers.
                        </p>
                    </div>
            </div>
            <div>
                <Back />
            </div>
        </>
    )
};

export default About;
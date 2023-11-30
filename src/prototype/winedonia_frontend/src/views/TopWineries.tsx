import React from "react";
import '../styles/TopWineries.css';
import logo from '../assets/logo.png';
import stobi from '../assets/stobi.jpeg';
import { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

function TopWineries() {

    useEffect(() => {
        document.title = "Winedonia";
      }, []);

    return (
        <>
            <div>

                <div className="navbar-container">
                    <ul className="navbar-menu">
                        <li>
                            <NavLink to={'/wineries'}><span>Винарии</span></NavLink>
                        </li>
                        <li><img src={logo} className="img-menu"/></li>
                        <li>
                            <NavLink to={'/about'}><span>За нас</span></NavLink>
                        </li>
                    </ul>
                </div>

                <div className="after-nav-container">
                    <ul className="navbar-menu-2">
                        <li><a href="#">Топ 10 винарии</a></li>
                        <li><a href="#">Највкусни вина</a></li>
                    </ul>
                </div>

                <div className="section-search">
                    <input type="text" name="search-bar" className="search-bar" placeholder="Побарај..."/>
                    <button type="submit" className="search-button"><span><IoSearch/></span></button>
                </div>

                <div className="section-top-wineries-title">
                    <h1 className="top-wineries-title">Топ 10 <span>Винарии</span></h1>
                </div>

                <div className="section-top-wineries-cards">
                    <div className="card">
                        <img src={stobi} className="img-card"/>
                        <p> Stobi winery is located only 80 km from the capital of Skopje, in the heart of Macedonia, 
                            in the Tikves wine region – the biggest and the most important wine region which stretches on 13.000 ha, 
                            along the same latitude as Rioja and Ribera del Duero.</p>
                        <button className="btn-info"><NavLink to={'/wineryDetails'}><span>More info...</span></NavLink></button>
                    </div>

                    <div className="card">
                        <img src={stobi} className="img-card"/>
                        <p> Stobi winery is located only 80 km from the capital of Skopje, in the heart of Macedonia, 
                            in the Tikves wine region – the biggest and the most important wine region which stretches on 13.000 ha, 
                            along the same latitude as Rioja and Ribera del Duero.</p>
                            <button className="btn-info"><NavLink to={'/wineryDetails'}><span>More info...</span></NavLink></button>
                    </div>

                    <div className="card">
                        <img src={stobi} className="img-card"/>
                        <p> Stobi winery is located only 80 km from the capital of Skopje, in the heart of Macedonia, 
                            in the Tikves wine region – the biggest and the most important wine region which stretches on 13.000 ha, 
                            along the same latitude as Rioja and Ribera del Duero.</p>
                            <button className="btn-info"><NavLink to={'/wineryDetails'}><span>More info...</span></NavLink></button>
                    </div>
                </div>

            </div>
        </>
    )
};

export default TopWineries;
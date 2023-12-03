import React from "react";
import '../styles/TopWineries.css';
import logo from '../assets/logo.png';
import stobi from '../assets/stobi.jpeg';
import zaharchev from '../assets/zaharchev.png';
import royalWinery from '../assets/royal-winery-queen-marija.jpg';
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
                        <button className="btn-info"><NavLink to={{ pathname: '/wineryDetails' }} state={{ name: "Stobi winery" }}><span>More info...</span></NavLink></button>
                    </div>

                    <div className="card">
                        <img src={zaharchev} className="img-card"/>
                        <p>Zaharchev family-owned and intimate winery and distillery, where we craft high-quality wines and spirits with passion and precision. 
                            Our commitment to quality begins in the vineyard, where we hand-select the finest grapes to ensure the perfect balance of flavor, aroma, and body. 
                            Our passion for winemaking and distilling has been passed down through generations, and we are thrilled to share our craft with you. </p>
                            <button className="btn-info"><NavLink to={{ pathname: '/wineryDetails' }} state={{ name: "Zaharchev winery" }}><span>More info...</span></NavLink></button>
                    </div>

                    <div className="card">
                        <img src={royalWinery} className="img-card"/>
                        <p> A vision old almost a century, Royal Winery Queen Maria is a realized dream that began with a Royal family. 
                            In 1928 King Aleksandar Karadjordjevic of Yugoslavia set out to create a wine dedicated to the pursuit of extraordinary quality for the needs of the royal family. 
                            This single vision of The King shapes every aspect of our actions, today, and for generations to come!</p>
                            <button className="btn-info"><NavLink to={{ pathname: '/wineryDetails' }} state={{ name: "Royal Winery Queen Maria" }}><span>More info...</span></NavLink></button>
                    </div>
                </div>

            </div>
        </>
    )
};

export default TopWineries;
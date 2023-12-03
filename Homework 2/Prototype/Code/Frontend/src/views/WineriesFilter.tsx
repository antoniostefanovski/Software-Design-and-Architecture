import React, { useEffect, useState } from "react";
import '../styles/Combined.css';
import Filtered from "../components/Filtered";
import Back from "../components/Back";
import { WineryService } from "../services/WineryService";
import { WineriesInfo } from "../models/WineriesInfo";
import { NavLink } from "react-router-dom";

function WineriesFilter() {

    const [wineries, setWineries] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [rating, setRating] = useState(1.0);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        getData(undefined, []);
    }, []);

    const getData = (searchTerm: string | undefined, ratings: number[]) => {
        const fetchData = async () => {
            try {
                var wineryService = new WineryService();
                const wineries = await wineryService.searchWineries(searchTerm, ratings);
                
                if (Boolean(wineries)) {
                    setWineries(wineries || []);
                }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
    }

    const onSearchTermChanged = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            getData(searchTerm, [rating]);
        }, 300);

        setTimeoutId(newTimeoutId);
    }

    const onRatingChanged = (e: any) => {
        let newRating = Number(e.target.value);
        setRating(newRating);
        getData(searchTerm, [newRating]);
    }

    return (
        <>  
            <div className="search-h1-div">
                <h1 className="search-h1">Филтер</h1>
            </div>
            <div className="main-cont">
                
                <div className="filter-box">
                    <form className="filter-box-form">
                        <div>
                            <p className="filter-box-title">Внесете име</p>
                            <input id="searchTerm" value={searchTerm} onKeyUp={() => onSearchTermChanged()} onChange={e => setSearchTerm(e.target.value)} type="text" name="object-name" className="object-name-input"></input> 
                        </div>
                        <div>
                            <p className="filter-box-title">Изберете оцена</p>
                            <select onChange={e => onRatingChanged(e)} name="object-rating" className="object-rating-dropdown">
                                <option></option>
                                <option>1.0</option>
                                <option>2.0</option>
                                <option>3.0</option>
                                <option>4.0</option>
                                <option>5.0</option>
                            </select> 
                        </div>
                    </form>
                </div>
                <div className="filtered-objects">
                    {Boolean(wineries) && wineries.length > 0 ? wineries.map((w, i) => <Filtered key={i} name={w.name || ""} />) : <h2>Не постојат записи</h2>}
                </div>
            </div>

            <div>
                <NavLink className={"btn btn-back"} to={"/"}>Назад кон почетна</NavLink>
            </div>
        </>
    )
};

export default WineriesFilter;
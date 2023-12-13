import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './Wines.scss'
import union_icon from '../../assets/union-1.png';
import union_down_icon from '../../assets/union-black-2.png';
import SearchBar from '../../components/SearchBar/SearchBar'
import bottle from '../../assets/wine_bottle.png'

function Wines() {
    const [ratingsExpanded, setRatingsExpanded] = useState(true);
    const [wineTypesExpanded, setWineTypesExpanded] = useState(true);
    
    return (
        <div>
            <div className="wines-header">
                <Header title={"Вина"} hasRating={undefined} rating={undefined} />
            </div>
            <div className="wines-container">
                <div className="wines-container-input">
                    <SearchBar locations={[]} placeholder={'Име на вино'} hasFilter={undefined} hasButton={undefined} filterVal={[]} filterCallback={undefined} submitCallback={undefined} inputCallback={undefined} classList={'wines-container-searchinput'}/>
                    <div className="wines-container-filter">
                        <div className="wines-container-filter-rating-box" onClick={() => setRatingsExpanded(!ratingsExpanded)}>
                            <p className='wines-container-filter-rating-box-paragraph'>Рејтинг</p>
                            { ratingsExpanded && <img src={union_icon} className='wines-container-filter-rating-box-img' alt="icon"/> }
                            { !ratingsExpanded && <img src={union_down_icon} className='wines-container-filter-rating-box-img' alt="icon"/> }
                        </div>
                        { ratingsExpanded && <div className="wines-container-filter-rating-checkbox">
                            <div className="wines-container-filter-rating-checkbox-item">
                                <input type="checkbox" value="5" id="5"/>
                                <label className="wines-container-filter-rating-checkbox-item-label" htmlFor="5">5.0</label>
                            </div>
                            <div className="wines-container-filter-rating-checkbox-item">
                                <input type="checkbox" value="4" id="4"/>
                                <label className="wines-container-filter-rating-checkbox-item-label" htmlFor="4">4.0</label>
                            </div>
                            <div className="wines-container-filter-rating-checkbox-item">
                                <input type="checkbox" value="3" id="3"/>
                                <label className="wines-container-filter-rating-checkbox-item-label" htmlFor="3">3.0</label>
                            </div>
                            <div className="wines-container-filter-rating-checkbox-item">
                                <input type="checkbox" value="2" id="2"/>
                                <label className="wines-container-filter-rating-checkbox-item-label" htmlFor="2">2.0</label>
                            </div>
                            <div className="wines-container-filter-rating-checkbox-item">
                                <input type="checkbox" value="1" id="1"/>
                                <label className="wines-container-filter-rating-checkbox-item-label" htmlFor="1">1.0</label>
                            </div>
                        </div> }
                        <div className="wines-container-filter-rating-box" onClick={() => setWineTypesExpanded(!wineTypesExpanded)}>
                            <p className='wines-container-filter-rating-box-paragraph'>Тип на вино</p>
                            { wineTypesExpanded && <img src={union_icon} className='wines-container-filter-rating-box-img' alt="icon"/> }
                            { !wineTypesExpanded && <img src={union_down_icon} className='wines-container-filter-rating-box-img' alt="icon"/> }
                        </div>
                        { wineTypesExpanded && <div className="wines-container-filter-rating-checkbox">
                            <div className="wines-container-filter-rating-checkbox-item">
                                <input type="checkbox" value="red" id="red"/>
                                <label className="wines-container-filter-rating-checkbox-item-label" htmlFor="red">Црвено</label>
                            </div>
                            <div className="wines-container-filter-rating-checkbox-item">
                                <input type="checkbox" value="white" id="white"/>
                                <label className="wines-container-filter-rating-checkbox-item-label" htmlFor="white">Бело</label>
                            </div>
                            <div className="wines-container-filter-rating-checkbox-item">
                                <input type="checkbox" value="rose" id="rose"/>
                                <label className="wines-container-filter-rating-checkbox-item-label" htmlFor="rose">Розе</label>
                            </div>
                            <div className="wines-container-filter-rating-checkbox-item">
                                <input type="checkbox" value="penlivo" id="penlivo"/>
                                <label className="wines-container-filter-rating-checkbox-item-label" htmlFor="penlivo">Пенливо</label>
                            </div>
                        </div> }
                    </div>
                </div>
                <div className="wines-container-filtered-content">
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                    <div className="wines-container-filtered-content-item">
                        <img src={bottle} alt="wine bottle" className="wines-container-filtered-content-item-img"/>
                        <div className="wines-container-filtered-content-item-paragraph">
                            <span>Александрија</span>
                            <span>(црвено)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wines
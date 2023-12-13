import React from 'react'
import './WineryDetails.scss';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import tikvesh from '../../assets/tikvesh.png';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import { Link } from 'react-router-dom';
import ratingIcon from '../../assets/Star.png'

type Props = {
    position: [number, number],
    name: string
}

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function Temp({ position, name }: Props) {

    const description = [
        'Винарската визба „Тиквеш“ е основана во 1885 година во регион со вековна винарска традиција, благословен со совршени природни услови, срдечни и страсни луѓе и пргава автентична култура.',
        'Отсекогаш сме имале склоност за надминување на очекувањата, прифаќање на иновациите и освојување на новите пазари. Со текот на времето стекнавме повеќе земја со врвен квалитет од која било друга винарска визба во Југоисточна Европа.',
        'Ја поседуваме најновата технологија и вработуваме дел од најинтелигентните и искусните таленти во дејноста за да осигураме дека врвниот квалитет на нашите производи се одржува постојано.'
    ];

    return (
        <div>
            <div className="winery-details-header">
                <Header title={"Винарија Тиквеш"} hasRating={true} rating={"4.7"} />
            </div>
            <div className="winery-details-container">
                <div className="winery-details-container-forwinery">
                    <p className='winery-details-container-forwinery-paragraph'>За винаријата</p>
                </div>
                <div className="winery-details-container-content">
                    <Content content={description} isCustomStyled={'winery-details-container-content-description'}/>
                    <div className="winery-details-container-content-imageurl">
                        <img src={tikvesh} alt="winery-photo" className="winery-details-container-content-imageurl-image"/>
                    </div>
                </div>
                <div className="winery-details-container-location-and-contact">
                    <div className="winery-details-container-location">
                        <p className='winery-details-container-location-paragraph'>Локација</p>
                        <div className="winery-details-container-location-map">
                            <MapContainer center={position} zoom={14} scrollWheelZoom={false}>
                                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                <Marker position={position}>
                                    <Popup className='winery-details-container-location-map-popup'>
                                        <span className='winery-details-container-location-map-popup-name'>{name}</span> <br/>
                                        <span className='winery-details-container-location-map-popup-rating'>
                                        <img src={ratingIcon} alt="rating-icon" className='winery-details-container-location-map-popup-rating-img'/>
                                        4.9
                                        </span>
                                        <br/>
                                        <span className="winery-details-container-location-map-popup-address">
                                            ул. Јане Сандански, Скопје 1000
                                        </span>
                                        <br />
                                        <span className="winery-details-container-location-map-popup-phone">
                                            +389 71234567
                                        </span>
                                        <br />
                                        <span className="winery-details-container-location-map-popup-website">
                                            <a href="#" target='_blank'>https://tikves.com.mk/</a>
                                        </span>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                    <div className="winery-details-container-contact">
                        <p className='winery-details-container-contact-paragraph'>Контакт</p>
                        <p className='winery-details-container-contact-info'>Доколку сте заинтересирани и сакате да дознаете повеќе за винаријата може да ја посетете нивната страница или да ги исконтактирате на нивниот телефонски број.</p>
                        <div className="winery-details-container-contact-info-website-and-tel">
                            <div className="winery-details-container-contact-info-website-div">
                                <p className="winery-details-container-contact-website-title">Website</p>
                                <p className="winery-details-container-contact-website-url"><a href='#' className="winery-details-container-contact-website-url-link">tikvesh.com.mk</a></p>
                            </div>
                            <div className="winery-details-container-contact-info-tel-div">
                                <p className="winery-details-container-contact-tel-title">Телефон</p>
                                <p className="winery-details-container-contact-tel-number">+389 70123456</p>
                            </div>
                        </div>
                        <div className="winery-details-container-contact-info-comment-and-rating">
                            <div className="winery-details-container-contact-info-comment-div">
                                <Link to="/"><button className="winery-details-container-contact-info-comment-div-button">Оставете коментар</button></Link>
                            </div>

                            <div className="winery-details-container-contact-info-rating-div">
                                <Link to="/"><button className="winery-details-container-contact-info-rating-div-button">Оцени винарија</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Temp
import React, { useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import { SelectChangeEvent } from '@mui/material';
import './Wineries.scss'
import WineriesListItem from '../../components/WineriesListItem/WineriesListItem';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet, { Map } from 'leaflet';
import ratingIcon from '../../assets/Star.png'

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

type Props = {
    position: [number, number],
}

function Wineries({ position }: Props) {

    const [locations, setLocations] = useState<string[]>([]);
    const [map, setMap] = useState<Map|null>(null);
    const [marker, setMarker] = useState<Leaflet.Marker<any>|null>(null);

	const onClickShowMarker = () => {
		if (!map) {
			return
		}

		map.flyTo(position, 13)

		if (marker) {
			marker.openPopup()
		}
	}

    return (
        <div>
            <div className="wineries-header">
                <Header title={"Винарии"} hasRating={undefined} rating={undefined} />
            </div>
            <div className="wineries-container">
                <div className="wineries-container-inputs">
                    <div className="wineries-container-inputbox">
                        <SearchBar 
                                locations={['Skopje', 'Bitola', 'Prilep']} 
                                placeholder={'Име на винарија'} 
                                hasFilter={true} 
                                hasButton={true} 
                                filterVal={locations} 
                                filterCallback={(e: SelectChangeEvent<string[]>) => setLocations(typeof(e.target.value) == 'string' ? [e.target.value] : e.target.value)} 
                                submitCallback={undefined} 
                                inputCallback={undefined} 
                                classList={'wineries-container-inputbox-searchbar'} />
                    </div>
                    <div className="wineries-container-items">
                        {/* <p className='wineries-container-items-empty'>Нема записи</p> */}
                        {/* wineries.length < 0 ? nema zapisi ili ? */}
                        <WineriesListItem onMouseOver={() => onClickShowMarker()}/>
                        <WineriesListItem onMouseOver={undefined}/>
                        <WineriesListItem onMouseOver={undefined}/>
                        <WineriesListItem onMouseOver={undefined}/>
                        <WineriesListItem onMouseOver={undefined}/>
                        <WineriesListItem onMouseOver={undefined}/>
                        <WineriesListItem onMouseOver={undefined}/>
                        <WineriesListItem onMouseOver={undefined}/>
                        <WineriesListItem onMouseOver={undefined}/>
                    </div>
                </div>

                <div className='wineries-container-map'>
                    <MapContainer 
                        center={position} 
                        zoom={13} 
                        scrollWheelZoom={false} 
                        className='wineries-container-map-container'
                        ref={setMap}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker ref={setMarker} position={position}>
                        <Popup className="wineries-container-map-popup">
                            <span className='wineries-container-map-winery-name'>Винарија Тиквеш</span> <br/>
                            <span className='wineries-container-map-winery-rating'>
                                <img src={ratingIcon} alt="rating-icon" className='wineries-container-map-winery-rating-img'/>
                                4.9
                            </span>
                            <br/>
                            <span className="wineries-container-map-winery-address">
                                ул. Јане Сандански, Скопје 1000
                            </span>
                            <br />
                            <span className="wineries-container-map-winery-phone">
                                +389 71234567
                            </span>
                            <br />
                            <span className="wineries-container-map-winery-website">
                                <a href="#" target='_blank'>https://courses.finki.ukim.mk/</a>
                            </span>
                        </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default Wineries
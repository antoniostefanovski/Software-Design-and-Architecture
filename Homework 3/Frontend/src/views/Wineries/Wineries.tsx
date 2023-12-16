import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import { SelectChangeEvent } from '@mui/material';
import './Wineries.scss'
import WineriesListItem from '../../components/WineriesListItem/WineriesListItem';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet, { Map } from 'leaflet';
import ratingIcon from '../../assets/Star.png'
import { WineryService } from '../../services/WineryService';
import { WinerySearchInfo } from '../../models/WinerySearchInfo';
import { UrlHelper } from '../../helpers/UrlHelper';
import { Municipality } from '../../models/Municipality';
import { MunicipalityService } from '../../services/MunicipalityService';
import { useLocation } from 'react-router-dom';

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function Wineries() {

    const wineryService = new WineryService();
    const municipalityService = new MunicipalityService();
    const location = useLocation();

    const [filterLocations, setFilterLocations] = useState<string[]>([]);
    const [filterRatings, setFilterRatings] = useState<string[]>([]);
    const [map, setMap] = useState<Map|null>(null);
    const [marker, setMarker] = useState<Leaflet.Marker<any>|null>(null);

    const [filteredWineries, setFilteredWineries] = useState<WinerySearchInfo[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
    const [hoveredWinery, setHoveredWinery] = useState<WinerySearchInfo | null>(null);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const [searchTerm, setSearchTerm] = useState('');

    const getData = async () => {
        const wineries = await wineryService.filterWineries();
        const municipalities = await municipalityService.getMunicipalities();

        if (Boolean(wineries) && wineries != null) {
            setFilteredWineries(wineries);
        }

        if (Boolean(municipalities) && municipalities != null) {
            setMunicipalities(municipalities);
        }

        if (Boolean(location.state) && Boolean(location.state.locationName)) {
            let municipalityId = municipalities?.find(m => m.name == location.state.locationName)?.id;

            setFilterLocations(Boolean(municipalityId) ? [municipalityId!] : []);
            filterWineries(searchTerm, filterRatings.map(r => Number(r)), Boolean(municipalityId) ? [municipalityId!] : []);

            return;
        }

        if (Boolean(location.state) && (Boolean(location.state.searchTerm) || Boolean(location.state.locations))) {
            let searchTerm = location.state.searchTerm ?? '';
            let locations = location.state.locations ?? [];

            setSearchTerm(searchTerm);
            setFilterLocations(locations);

            filterWineries(searchTerm, filterRatings.map(r => Number(r)), locations);
        }
    }

    useEffect(() => {
        getData();
    }, []);

	const onClickShowMarker = (w: WinerySearchInfo) => {
		if (!map) {
			return
		}

        setHoveredWinery(w);

		map.flyTo([w?.latitude ?? filteredWineries[0]?.latitude ?? 41.030076535136054, w?.longitude ?? filteredWineries[0]?.longitude ?? 21.330302063751628], 14);

		if (marker) {
			marker.openPopup()
		}
	}

    const onSearchTermChange = async (change: string) => {
        setSearchTerm(change);
        filterWineries(change, filterRatings.map(r => Number(r)), filterLocations);
    }

    const filterWineries = async (searchTerm: string | null = null, ratings: number[] = [], locations: string[] = []) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(async () => {
            const result = await wineryService.filterWineries(searchTerm, ratings, locations);

            if (Boolean(result)) {
                setFilteredWineries(result ?? []);
            }
        }, 300);

        setTimeoutId(newTimeoutId);
    }

    const onLocationsChange = (e: SelectChangeEvent<string[]>) => {
        let change = typeof(e.target.value) == 'string' ? [e.target.value] : e.target.value;
        setFilterLocations(change);

        filterWineries(searchTerm, filterRatings.map(r => Number(r)), change);
    }

    const onRatingsChange = (e: SelectChangeEvent<string[]>) => {
        let change = typeof(e.target.value) == 'string' ? [e.target.value] : e.target.value;
        setFilterRatings(change);

        let ratings = change.map(r => Number(r));
        filterWineries(searchTerm, ratings, filterLocations);
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
                            searchTerm={searchTerm}
                            locations={municipalities}
                            placeholder={'Име на винарија'}
                            hasFilter={true}
                            hasButton={false}
                            locationsFilterVal={filterLocations}
                            locationFilterCallback={(e: SelectChangeEvent<string[]>) => onLocationsChange(e)}
                            submitCallback={undefined}
                            inputCallback={onSearchTermChange}
                            classList={'wineries-container-inputbox-searchbar'} 
                            hasRatingsFilter={true} 
                            ratingsFilterVal={filterRatings} 
                            ratingsFilterCallback={(e: SelectChangeEvent<string[]>) => onRatingsChange(e)} />
                    </div>
                    <div className="wineries-container-items">
                        { filteredWineries.length <= 0 && <p className='wineries-container-items-empty'>Нема записи</p> }
                        { filteredWineries.length > 0 && filteredWineries.map((w, idx) => <WineriesListItem data={w} key={idx} callback={(w: WinerySearchInfo) => onClickShowMarker(w)}/>)}
                    </div>
                </div>

                <div className='wineries-container-map'>
                    <MapContainer 
                        center={[hoveredWinery?.latitude ?? filteredWineries[0]?.latitude ?? 41.030076535136054, hoveredWinery?.longitude ?? filteredWineries[0]?.longitude ?? 21.330302063751628]} 
                        zoom={13} 
                        scrollWheelZoom={false} 
                        className='wineries-container-map-container'
                        ref={setMap}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker ref={setMarker} position={[hoveredWinery?.latitude ?? filteredWineries[0]?.latitude ?? 41.030076535136054, hoveredWinery?.longitude ?? filteredWineries[0]?.longitude ?? 21.330302063751628]}>
                        <Popup className="wineries-container-map-popup">
                            <span className='wineries-container-map-winery-name'>{hoveredWinery?.name ?? filteredWineries[0]?.name ?? 'Bitola'}</span> <br/>
                            <span className='wineries-container-map-winery-rating'>
                                <img src={ratingIcon} alt="rating-icon" className='wineries-container-map-winery-rating-img'/>
                                {hoveredWinery?.rating ?? filteredWineries[0]?.rating ?? 5.0}
                            </span>
                            <br/>
                            <span className="wineries-container-map-winery-address">
                                {hoveredWinery?.address ?? filteredWineries[0]?.address ?? 'Bitola, Macedonia'}
                            </span>
                            <br />
                            <span className="wineries-container-map-winery-phone">
                                {hoveredWinery?.contact ?? filteredWineries[0]?.contact ?? '+389 87 654 321'}
                            </span>
                            <br />
                            <span className="wineries-container-map-winery-website">
                                <a href={Boolean(hoveredWinery?.url) ? UrlHelper.getUrl(hoveredWinery?.url ?? null) : '#' } target='_blank'>{UrlHelper.getUrl(hoveredWinery?.url ?? null)}</a>
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
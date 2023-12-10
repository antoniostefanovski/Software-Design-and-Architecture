import Header from '../../components/Header/Header';
import tikvesh from '../../assets/tikvesh.png';
import './WineryDetails.scss';
import Footer from '../../components/Footer/Footer';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';

type Props = {
    position: [number, number],
    name: string
}

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function WineryDetails({ position, name }: Props) {
    return (
        <div className='winery-details-container'>
            <div className="winery-header">
                <Header title={"Винарија Тиквеш"} hasRating={true} rating={"4.9"} />
            </div>
            <div className="winery-content-container">
                <div className="winery-content-text">
                    <h1>За винаријата</h1>
                    <p>Винарската визба „Тиквеш“ е основана во 1885 година во регион со вековна винарска традиција, 
                        благословен со совршени природни услови, срдечни и страсни луѓе и пргава автентична култура.</p>
                    <p>Отсекогаш сме имале склоност за надминување на очекувањата, прифаќање на иновациите и освојување на новите пазари.
                        Со текот на времето стекнавме повеќе земја со врвен квалитет од која било друга винарска визба во Југоисточна Европа.</p>
                    <p>Ја поседуваме најновата технологија и вработуваме дел од најинтелигентните и искусните таленти во дејноста за да осигуриме
                        дека врвниот квалитет на нашите производи се одржува постојано.</p>
                </div>
                <div className="winery-content-photo-slider">
                    <img src={tikvesh}/>
                </div>
            </div>
            <div className="winery-lc-container">
                <div className="winery-lc-location-map">
                    <h1>Локација</h1>
                    <MapContainer center={position} zoom={14} scrollWheelZoom={false}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker position={position}>
                            <Popup>
                                {name}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div className="winery-lc-contact-info">
                    <h1>Контакт</h1>
                    <p className='winery-lc-contact-info-pinfo'>Доколку сте заинтересирани и сакате да дознаете повеќе за винаријата може да ја посетете
                        нивната страница или да ги исконтактирате на нивниот телефонски број.</p>
                    <div className="winery-lc-contact-info-website">
                        <p className='winery-lc-contact-info-website-title'>Website</p>
                        <p><a href="https://tikves.com.mk/en/home/" target="_blank">tikves.com.mk</a></p>
                    </div>
                    <div className="winery-lc-contact-info-phone">
                        <p className='winery-lc-contact-info-phone-title'>Телефон</p>
                        <p>+389 70123456</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WineryDetails
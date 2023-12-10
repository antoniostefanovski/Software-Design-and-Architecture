import { useState } from 'react'
import Header from '../../components/Header/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import { SelectChangeEvent } from '@mui/material';
import './Main.scss';
import WineryPreview from '../../components/WineryPreview/WineryPreview';
import slika from '../../assets/Slika-primer.png';

function Main() {
    const [locations, setLocations] = useState<string[]>([]);

    return (
        <div className='main'>
            <Header title={"Најдобрите винарии во Македонија"} hasRating={undefined} rating={undefined} />
            <div style={{ justifyContent: 'center', display: 'flex' }}>
                <SearchBar 
                    locations={['Skopje', 'Bitola', 'Prilep']} 
                    placeholder={'Каде би сакале да одите?'} 
                    hasFilter={true} 
                    hasButton={true} 
                    filterVal={locations} 
                    filterCallback={(e: SelectChangeEvent<string[]>) => setLocations(typeof(e.target.value) == 'string' ? [e.target.value] : e.target.value)} 
                    submitCallback={undefined} 
                    inputCallback={undefined} 
                    classList={'main-search-bar'} />
            </div>
            <div className='main-top-wineries'>
                <div className='main-top-wineries-title'>Топ 10 винарии</div>
                <div className='main-top-wineries-links'>
                    <WineryPreview img={slika} rating={5.0} name={'Винарија Вино'} description={"Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем пд псом Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лоредс."} />
                    <WineryPreview img={slika} rating={5.0} name={'Винарија Вино'} description={"Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем пд псом Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лоредс."} />
                    <WineryPreview img={slika} rating={5.0} name={'Винарија Вино'} description={"Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем пд псом Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лорем ипсом, Лоредс."} />
                </div>
            </div>
        </div>
    )
}

export default Main
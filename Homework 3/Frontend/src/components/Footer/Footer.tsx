import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import './Footer.scss';

function Footer() {

    return (
        <div className='footer'>
            <div className='footer-info'>
                <div className='footer-info-name'>
                    <img src={logo} className='footer-info-name-logo' alt='logo'/>
                    <span className='footer-info-name-text'>Winedonia</span>
                </div>
                <span className='footer-info-text'>Скопје, Македонија</span>
                <span className='footer-info-text'>Број: +38977987654</span>
                <span className='footer-info-text'>
                    Емаил: 
                    <a href='mailto:contact@winedonia.mk' className='footer-info-text-email'>
                        contact@winedonia.mk
                    </a>
                </span>
            </div>
            <div className='footer-links'>
                <div className='footer-links-menu'>
                    <span className='footer-links-title'>Мени</span>
                    <Link to='/wineries' className='footer-links-item'>Винарии</Link>
                    <Link to='/wines' className='footer-links-item'>Вина</Link>
                    <Link to='/locations' className='footer-links-item'>Локации</Link>
                    <Link to='/aboutus' className='footer-links-item'>За нас</Link>
                </div>
                <div className='footer-links-support'>
                    <span className='footer-links-title'>Поддршка</span>
                    <Link to='/contact' className='footer-links-item'>Контактирајте нé</Link>
                    <Link to='/termsandconditions' className='footer-links-item'>Политика за користење</Link>
                    <Link to='/privacy' className='footer-links-item'>Приватност</Link>
                    <Link to='/qna' className='footer-links-item'>Прашања и одговори</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
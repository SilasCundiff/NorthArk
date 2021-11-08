import * as React from 'react';
import logo from '../assets/NorthArk_ShapeLogo.png';
import { Link } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <div id='footer' className='d-flex flex-column flex-md-row justify-content-between'>
            {/* Left side of the footer on larger screens, top of footer on smaller screens */}
            <div className='footerLeft d-flex flex-column justify-content-center justify-content-md-start'>
                <div className='leftTop d-flex justify-content-center justify-content-md-start'>
                    <img src={logo} className='footerLogo' alt='NorthArk Logo'></img>
                    <p className='copyrightText'>© 2021 NorthArk Investment Bank</p>
                </div>
                <div className='leftBottom d-flex flex-column'>
                    <p className='text-center text-md-left'><a href='mailto: NorthArk@NorthArk.com' target='_blank'>NorthArk@NorthArk.com</a> &nbsp; 
                    <a href='tel:555-867-5309' target='_blank'>(555)867-5309</a> <br/>
                    1234 NorthArk Road, 
                    A City, 85647
                    </p>
                </div>
            </div>

            {/* center of footer on both large and small screens 
            
            SOCIALS */}

            <div className='footerCenter d-flex justify-content-center'>
                <a href='http://www.twitter.com' target="_blank" className='socialLinks twitterIcon'>
                    <TwitterIcon fontSize='large' />
                </a>
                <a href='http://www.facebook.com' target="_blank" className='socialLinks facebookIcon'>
                    <FacebookIcon fontSize='large' />
                </a>
                <a href='http://www.youtube.com' target="_blank" className='socialLinks youtubeIcon'>
                    <YouTubeIcon fontSize='large' />
                </a>
            </div>

            {/* Right side of the footer on larger screens, bottom on smaller */}
            <div className='footerRight d-flex justify-content-center justify-content-md-start'>
                {/* sitemap */}
                {/* two lists, left and right, to keep things not looking awful, unless there's not many links on the site */}
                <ul className=' siteMapList siteMapLeft'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/Dashboard'>Dashboard</Link></li>
                    <li><a href=''>link</a></li>
                </ul>
                <ul className='siteMapList siteMapRight'>
                    <li><a href=''>link</a></li>
                    <li><a href=''>link</a></li>
                    <li><a href=''>link</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;
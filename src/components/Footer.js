
import { FaInstagram , FaLinkedin, FaTwitter } from 'react-icons/fa'

import React from 'react'
import './Footer.css'


const Footer = () => {
  return (
    <div className='footer-parent-parent'>
          
      <footer>

        <div className="footer-content">
            <h3 className='footer-h3'>Contact US</h3>
            <p className='footer-p'><h4 className='footer-h4'>Experience the joy of coding in an environment built for productivity and innovation. Join our community of passionate developers and let your imagination soar. Start by creating your room and let the IDE be your gateway to a world of endless possibilities.</h4></p>
            <ul className="socials">
                <li className='footer-li'><a  href="https://twitter.com/Darshh_?t=XXKgoReHVIoEdHU9wvA0FA&s=09"><FaTwitter className="footer-i"/></a></li>
                <li className='footer-li'><a  href="https://instagram.com/_._darshh"><FaInstagram className="footer-i"/></a></li>
                <li className='footer-li'><a  href="https://www.linkedin.com/in/jaindarsh/"><FaLinkedin className="footer-i"/></a></li>
              {/* <li className='footer-li'><a href="https://www.google.com/maps/place/National+Institute+of+Technology+Patna,+Patna+University+Campus,+Patna,+Bihar+800005/@25.6204054,85.1694904,17z/data=!3m1!4b1!4m5!3m4!1s0x39ed58dce1098af7:0xd3ab2e3afc171805!8m2!3d25.6207284!4d85.1728858"><FaMapMarked className='footer-i'/></a></li> */}
                
            </ul>
            <a className='footer-a' href='mailto:expresso.nit@gmail.com'>
                        darshanj.ug20.ece@nitp.ac.in
                        </a>
                        <a className='footer-a' href='mailto:expresso.nit@gmail.com'>
                        divyab.ug20.ece@nitp.ac.in
                        </a>
                    <p className='footer-p'>NIT Patna, Bihar ,India</p>

                        
                </div>
         
       
        
        <div className="footer-bottom">
            <p className='footer-p foot-p'> &copy;Apna Editor 2023</p>
        </div>
        
        </footer>
       
    </div>
  )
}

export default Footer
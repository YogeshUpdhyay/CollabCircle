import React from 'react' ;
import './Homepage.css' ;
import NavBar from '../../components/Layout/NavBar/NavBar'  ;
import Banner from '../../components/Layout/Banner/Banner' ;
import AboutUs from  '../../components/Layout/AboutUs/AboutUs' ;
import Footer from '../../components/Layout/Footer/index'

export default function Homepage() {
  return (
    <div className = "Home">
      <NavBar/>
      <Banner/> 
      <Footer>
            <Footer.Wrapper>
            <Footer.Row>
                <Footer.Column>
                <Footer.Title>About Us</Footer.Title>
                    <Footer.Link href="#">Story</Footer.Link>
                    <Footer.Link href="#">Projects</Footer.Link>
                    <Footer.Link href="#">Chat Rooms</Footer.Link>
                </Footer.Column> 
                <Footer.Column>
                <Footer.Title>Services</Footer.Title>
                    <Footer.Link href="#">Projects</Footer.Link>
                    <Footer.Link href="#">Practice</Footer.Link>
                    <Footer.Link href="#">Code</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Contact Us</Footer.Title>
                    <Footer.Link href="#">Coming Soon</Footer.Link>
                    <Footer.Link href="#">Coming Soon</Footer.Link>
                    <Footer.Link href="#">Coming Soon</Footer.Link>
                </Footer.Column>
                
            </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    </div>
  )
}

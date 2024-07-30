import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './home.css'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedHotels from '../../components/featuredHotels/FeaturedHotels'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle">Browse by property type</h1>
          <PropertyList/>
          <h1 className="homeTitle">Homes guests love</h1>
          <FeaturedHotels/>
          <MailList/>
          <Footer/>
        </div>
    </div>
  )
}

export default Home
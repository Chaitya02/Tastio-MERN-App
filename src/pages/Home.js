import React, { useEffect, useState } from 'react';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import carousel01 from '../images/carousel-01.jpg';
import carousel02 from '../images/carousel-02.jpg';
import carousel03 from '../images/carousel-03.jpg';
import '../styles/styles.css';

const Home = () => {

  const [search, setSearch] = useState("")
  const [item, setItem] = useState([])
  const [category, setCategory] = useState([])

  const data = async () => {
    // Show all the cards with items from database.
    let response = await fetch('http://localhost:5000/api/items', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })

    response = await response.json()

    setItem(response[0])
    setCategory(response[1])
  }

  useEffect(() => {
    data()
  }, [])


  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ "objectFit": "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className='carousel-caption'>
              <div className="carousel-caption" style={{ "zIndex": "10" }}>
                <h1 className='heading'>Savor, Indulge, Enjoy</h1>
                <p>Discover a World of Culinary Delights with <LocalDiningRoundedIcon /> Tastio.</p>
                <div className="d-flex justify-content-center" role="search">
                  <input className="form-control me-2" type="search" placeholder="Find Your Flavor" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </div>
              </div>
            </div>
            <div className="carousel-item active" data-bs-interval="4000">
              <img src={carousel01} className="d-block w-100" alt="Carousel-img" style={{ "filter": "brightness(55%)" }} />
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src={carousel02} className="d-block w-100" alt="Carousel-img" style={{ "filter": "brightness(55%)" }} />
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src={carousel03} className="d-block w-100" alt="Carousel-img" style={{ "filter": "brightness(55%)" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container mt-4'>
        {category !== "" ? category.map((type) => {
          return (
            <div className='row mb-3' key={type._id}>
              <div className='fs-3 m-3'>{type.category}</div>
              <hr />
              {item !== "" ? item.filter((i) => (type.category === i.category) && (i.name.toLowerCase().includes(search.toLowerCase())))
                .map((filterData) => {
                  return (
                    <div key={filterData._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        items={filterData}
                        options={filterData.options[0]}
                      />
                    </div>
                  )
                }) : ""}
            </div>
          )
        }) : ""}
      </div>
      <Footer />
    </div>
  )
}

export default Home
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyOrder = () => {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        // Get orderData from database of the user.
        await fetch("http://localhost:5000/api/orders/myOrder", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <>
            <Navbar />
            {localStorage.getItem('authToken') &&
                <div className='container'>
                    <div className='mb-3'>
                        {orderData !== {} ? Array(orderData).map(data => {
                            return (
                                data.orderData ?
                                    data.orderData.order_data.slice(0).reverse().map((item) => {
                                        return (
                                            item.map((arrayData) => {
                                                return (
                                                    <div key={arrayData._id} className='d-flex'>
                                                        {arrayData.Order_date ? (
                                                            <div className="m-auto mt-5">
                                                                {data = arrayData.Order_date}
                                                                <hr />
                                                            </div>
                                                        ) : (
                                                            <div className="card mt-3" style={{ width: "16.8rem" }}>
                                                                <img
                                                                    src={arrayData.img}
                                                                    className="card-img-top"
                                                                    alt="Ordered Data"
                                                                    style={{ height: "140px", objectFit: "cover" }}
                                                                />
                                                                <div className="card-body d-flex flex-column justify-content-between">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className="d-flex justify-content-between">
                                                                        <div>
                                                                            <span className="m-1">{arrayData.quantity}</span>
                                                                            <span className="m-1">{arrayData.size}</span>
                                                                        </div>
                                                                        <div className="fs-3">{arrayData.price}/-</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                )
                                            })

                                        )
                                    }) : "")
                        }) : ""}
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default MyOrder

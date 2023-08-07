import React from 'react';
import Navbar from '../components/Navbar';

const Features = () => {
    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h1 className="text-center mb-4">Features</h1>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h2 className="card-title">Explore Restaurants</h2>
                                <p className="card-text">
                                    Discover a wide range of restaurants offering diverse cuisines.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h2 className="card-title">Easy Ordering</h2>
                                <p className="card-text">
                                    Effortlessly place orders and enjoy quick delivery to your doorstep.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h2 className="card-title">Real-time Tracking</h2>
                                <p className="card-text">
                                    Track your order in real-time and know exactly when it will arrive.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Features;

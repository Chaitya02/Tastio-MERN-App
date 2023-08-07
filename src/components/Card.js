import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './CartProvider';

const Card = (props) => {

    let dispatch = useDispatchCart()
    let data = useCart()

    const priceRef = useRef()
    const prices = props.options
    const options = Object.keys(prices)

    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.items._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.items._id, price: finalPrice, quantity: quantity })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.items._id, name: props.items.name, price: finalPrice, quantity: quantity, size: size, img: props.items.img })
                return
            }
        }
    }

    let finalPrice = quantity * parseInt(prices[size])
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <>
            <div className="card m-3" style={{ "width": "16.8rem" }}>
                <img src={props.items.img} className="card-img-top" alt="item-img" style={{ "height": "140px", "objectFit": "cover" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.items.name}</h5>
                    <p className="card-text">{props.items.description}</p>
                    <div className='container'>
                        <select className='m-2 h-100 bg-light rounded' name="" id="" onChange={(e) => setQuantity(e.target.value)}>
                            {Array.from(Array(3), (e, i) => {
                                return (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-light rounded' ref={priceRef} name="" id="" onChange={(e) => setSize(e.target.value)}>
                            {options.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                        <div className='d-inline'>
                            {finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </>
    )
}

export default Card

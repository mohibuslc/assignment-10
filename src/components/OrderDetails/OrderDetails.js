import React from 'react';
import './OrderDetails.css';

const OrderDetails = ({ orderProduct }) => {
    console.log("object", orderProduct);
    const { productUrl, productName, productPrice, orderTime,productWeight } = orderProduct;
    return (
        <div className='col-md-6'>
            <div className="details-area">
                <div className="row">
                    <div className="col-md-5">
                        <div className="products-img">
                            <img src={productUrl} alt="" />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h6>Product Name</h6>
                        <p> {productName}</p>
                        <h6>Product Price</h6>
                        <p> {productPrice}</p>
                        <h6>Weight</h6>
                        <p> {productWeight}</p>
                        <h6>Ordered Time</h6>
                        <p> {orderTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
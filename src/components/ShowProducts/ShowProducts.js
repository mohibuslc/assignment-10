
import React from 'react';
import './ShowProducts.css';
import { Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';

const ShowProducts = ({ products }) => {
    const { productName, productPrice, productUrl, _id } = products;
    
    let history = useHistory();

    const handleBuy = (id) => {
        history.push(`/checkout/${id}`)
    }

    return (

        <Col md={4}>

            <Card className='my-3'>
                <Card.Img variant="top" src={productUrl} />
                <Card.Body>
                    <Card.Title>{productName}</Card.Title>
                    <Card.Text>
                        ${productPrice}
                    </Card.Text>
                    <button onClick={() => handleBuy(_id)} className='btn buy-btn'>Buy Now</button>
                </Card.Body>
            </Card>

        </Col>

    );
};

export default ShowProducts;
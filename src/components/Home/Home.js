import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import ShowProducts from '../ShowProducts/ShowProducts';
import Header from './../Header/Header';

const Home = () => {

    const [products, setpProducts] = useState([])
    const [spinner, setSpinner] = useState(true);
    useEffect(() => {

        fetch("https://warm-eyrie-15753.herokuapp.com/showProducts")
			.then((res) => res.json())
			.then((data) => {
				setpProducts(data);
				setSpinner(false);
			});

    }, [])

    console.log('home products', products);
    return (
        <div >
            <Header></Header>

            <Container className='py-4 text-center'>
                {
                    spinner ? <Spinner animation="border" variant="success" />
                        :
                        <Row>
                            {
                                products.map(product => <ShowProducts products={product} key={product._id} />)
                            }
                        </Row>
                }
            </Container>


        </div>
    );
};

export default Home;
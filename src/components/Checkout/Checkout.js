import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from './../Header/Header';
import './Checkout.css';

const Checkout = () => {

    const { id } = useParams();

    const [product, setProduct] = useState();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    useEffect(() => {

        fetch(`https://warm-eyrie-15753.herokuapp.com/product/${id}`)
			.then((res) => res.json())
			.then((data) => setProduct(data));
    }, [])

    let productName = product?.productName;
    let productPrice = product?.productPrice;
    let productWeight = product?.productWeight;

    let history = useHistory();

    const [checkOutIn, setCheckOutIn] = useState(true);

    const handleCheckOut = () => {
        const date = new Date();
        const orderTime = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const order = { ...product, ...loggedInUser, orderTime };
        delete order._id;
        fetch("https://warm-eyrie-15753.herokuapp.com/addOrder", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(order),
		}).then((res) => console.log("order database", res));

        setCheckOutIn(false)
    }

    const handleSeeOrderBtn = () => {
        history.push('/orders')
    }

    return (
		<>
			{checkOutIn ? (
				<div className="checkout-area">
					<Header></Header>

					<Container className="checkout-details">
						<h3 className="checkout-title">Checkout</h3>
						<Table bordered hover className="table-section">
							<thead>
								<tr>
									<th>Description</th>
									<th>Quantity</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{productName}</td>
									<td>1</td>
									<td>$ {productPrice}</td>
								</tr>
								<tr>
									<td colSpan="2">Total</td>
									<td>$ {productPrice}</td>
								</tr>
							</tbody>
						</Table>
						<div className="checkout-btn text-right">
							<button
								onClick={handleCheckOut}
								className="btn btn-success"
							>
								Checkout
							</button>
						</div>
					</Container>
				</div>
			) : (
				<div className="bg-confirm">
					<Container>
						<Link
							to="/"
							className="header-title navbar-brand title-set"
						>
							BD Fresh Market
						</Link>
						<div className="confirm-box">
							<h3> &#10004; Your Order is Confirmed</h3>
							<div className="product-details">
								<Table>
									<tbody>
										<tr>
											<td colSpan="2">Product Name</td>
											<td colSpan="2"> {productName} </td>
										</tr>
										<tr>
											<td colSpan="2">Product Price</td>
											<td colSpan="2">
												{" "}
												{productPrice}{" "}
											</td>
										</tr>
										<tr>
											<td colSpan="2">
												Product Quantity
											</td>
											<td colSpan="2"> 1 </td>
										</tr>
										<tr>
											<td colSpan="2">Weight</td>
											<td colSpan="2">
												{" "}
												{productWeight}{" "}
											</td>
										</tr>
										<tr>
											<td colSpan="2">Order Time</td>
											<td colSpan="2">
												{" "}
												{new Date().toLocaleDateString() +
													" " +
													new Date().toLocaleTimeString()}{" "}
											</td>
										</tr>
										<tr>
											<td colSpan="2">Total Price</td>
											<td colSpan="2">
												{" "}
												{productPrice}{" "}
											</td>
										</tr>
									</tbody>
								</Table>
								<button
									onClick={handleSeeOrderBtn}
									className="btn buy-btn"
								>
									see your all orders
								</button>
							</div>
						</div>
					</Container>
				</div>
			)}
		</>
	);
};

export default Checkout;
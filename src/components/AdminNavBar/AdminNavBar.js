import { faPlus, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminWorks from '../AdminWorks/AdminWorks';
import Header from '../Header/Header';
import './AdminNavbar.css';

const AdminNavbar = () => {
    const { url, path } = useRouteMatch();
    return (
		<div className="admin-nav-area">
			<Header></Header>
			<Row>
				<Col md={4} className="margin">
					<div className="nav-area">
						<Nav className="flex-column">
							<Link
								to={`${url}/manageProduct`}
								className="nav-link"
							>
								<FontAwesomeIcon
									icon={faThLarge}
									className="mr-2"
								/>{" "}
								Manage Product
							</Link>
							<Link to={`${url}/addProduct`} className="nav-link">
								<FontAwesomeIcon
									icon={faPlus}
									className="mr-2"
								/>{" "}
								Add Product
							</Link>
						</Nav>
					</div>
				</Col>

				<Col md={8} className="margin">
					<Switch>
						<Route path={`${path}/:admin`}>
							<AdminWorks></AdminWorks>
						</Route>

						<Route exact path={path}>
							<AdminWorks></AdminWorks>
						</Route>
					</Switch>
				</Col>
			</Row>
		</div>
	);
};

export default AdminNavbar;
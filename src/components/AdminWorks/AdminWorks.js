import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import ManageProductDetails from '../ManageProductDetails/ManageProductDetails';
import './AdminWorks.css';

const AdminWorks = () => {
    // Nested Routin Params
    const { admin } = useParams()

    // admin manage products
    const [manageProduct, setManageProduct] = useState([]);

    useEffect(() => {
        fetch("https://warm-eyrie-15753.herokuapp.com/showProducts")
			.then((res) => res.json())
			.then((data) => setManageProduct(data));
    }, [manageProduct])

    // Admin Add Products 
    const { register, handleSubmit, watch, errors } = useForm();

    const [imgUrl, setImgUrl] = useState(null);

    const imageUpload = (e) => {
        console.log(e.target.files[0]);

        const imgData = new FormData();
        imgData.set('key', 'eedf45f5159b6e8f0f23e26c24c443e0');
        imgData.append('image', e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imgData)
            .then(function (response) {
                setImgUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onSubmit = data => {
        const productData = {
            productName: data.productName,
            productPrice: data.productPrice,
            productUrl: imgUrl,
            productWeight: data.productWeight
        }

        fetch("https://warm-eyrie-15753.herokuapp.com/addProduct", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(productData),
		}).then((res) => console.log("add Product successfully"));
    };

    return (
        <>
            {
                admin === 'manageProduct' ?

                    // manage products
                    <div className="manage-background">
                        <h3 className='add-title'>Manage Product</h3>
                        <div className='container'>
                            <div className="product-info">
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th className='border-left-design'>Product Name</th>
                                            <th>Weight</th>
                                            <th>Price</th>
                                            <th className='border-right-design'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            manageProduct?.map(product => <ManageProductDetails products={product} key={product._id} />)
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                    </div>

                    :

                    // add products

                    <div className="form-area">
                        <h4 className='add-title'> Add Product </h4>
                        <div className='form-section'>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <label>Product Name</label>
                                <input name="productName" className='form-control' placeholder='name' ref={register({ required: true })} />
                                {errors.exampleRequired && <span>This field is required</span>}

                                <label>Weight</label>
                                <input name="productWeight" className='form-control' placeholder='name' ref={register({ required: true })} />
                                {errors.exampleRequired && <span>This field is required</span>}

                                <label>Add Price</label>
                                <input name="productPrice" type='number' className='form-control' placeholder='price' ref={register({ required: true })} />
                                {errors.exampleRequired && <span>This field is required</span>}

                                <label>Add Photo</label>
                                <input type='file' name="exampleRequired" onChange={imageUpload} className='fileUpload d-block' />


                                <input type="submit" className='btn btn-success px-5 py-2 mt-4' value='Save' />
                            </form>
                        </div>
                    </div>

            }
        </>
    );
};

export default AdminWorks;
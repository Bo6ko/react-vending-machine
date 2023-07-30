import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../../redux/actions/productActions';
import useFetchProduct from '../../../hooks/products/useFetchProduct';
import './CreateProductPopup.css';

Modal.setAppElement('#root');

const apiUrl = process.env.REACT_APP_API_URL;

const CreateProductPopup = ({ isOpen, onClose, onCreate }) => {

    const dispatch = useDispatch();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        file: ''
    });
    const [file, setFile] = useState('');

    const products = useFetchProduct(`${apiUrl}products`);

    const uploadFile = async (e) => {	
		if ( e.target.files[0] && e.target.files[0].name !== 'undefined' ) {
			setFile(e.target.files[0]);
		} else if ( file.name ) {
			setFile(file);
		}
	};

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setProduct({
            ...product, [name]: value
        });
    };

    const createProduct = () => {
        // Validate the product name if needed
        if (product.name.trim() === '' || product.price.trim() === '') {
            alert('Please enter a valid product data.');
            return;
        }

        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append('name', product.name);
        formdata.append('description', product.description);
        formdata.append('price', product.price);

        axios.post(`${apiUrl}products`, formdata)
        .then((result) => {
            products.push(result.data);
            onClose();
            dispatch(setProducts(products));
        })
        .catch((err) => {
            console.log(err)
        })

    };

    return (
        <Modal className="modal" isOpen={isOpen} onRequestClose={onClose}>
            <div>
                <h2>Create new Product</h2>

                <div className="fields">
                    <label htmlFor="name">Product name:</label><br/>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        placeholder="Enter Product Name"
                    />
                </div>

                <div className="fields">
                    <label htmlFor="description">Product description:</label><br/>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        placeholder="Enter Description"
                    />
                </div>

                <div className="fields">
                    <label htmlFor="price">Product price:</label><br/>
                    <input
                        id="price"
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                    />
                </div>

                <div className="fields">
                    <label htmlFor="price">Upload file:</label><br/>
                    <input
                        type="file"
                        name="file"
                        onChange={uploadFile}
                        placeholder="Enter Product Name"
                    />
                </div>
                <button className="btn" onClick={createProduct}>Create</button>
                <button className="btn" onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );

}

export default CreateProductPopup;
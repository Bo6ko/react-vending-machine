import React from 'react';
import './Product.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../../../redux/actions/productActions';

const apiUrl = process.env.REACT_APP_API_URL;

const Product = ({ product, coin, onOk }) => {
  const { name, price, description, file } = product;

  const dispatch = useDispatch();

  const onClickProduct = (product) => {
    dispatch(setSelectedProduct(product));
  }

  return (
    <>
      <div 
        // style={{backgroundImage: `url(${apiUrl}/${file})`}}
        className={`product ${name && coin >= price ? 'available' : ''}`}
        onClick={() => {
          if (price > coin) return;
          onOk(price);
        }}
      >
        <img src={`${apiUrl}${file}`} alt={file} />
        <p>{name}</p>
        <p>{description ? description : <br />}</p>
        <p>{price}</p>
        <span className={`${name && coin >= price ? 'buybtn' : ''}`}>
          { (name && coin >= price) && 'Buy' }
        </span>
      </div>
    </>
  );
};

export default Product;
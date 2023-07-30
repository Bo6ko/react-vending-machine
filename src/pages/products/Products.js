import React, { useState, useEffect } from 'react';
import './Products.css';
import useFetchProducts from '../../hooks/products/useFetchProduct';
import Product from './product/Product';
import InputCoin from '../../components/input-coin/InputCoin';
import CreateProductsPopup from './create-product-popup/CreateProductPopup';

const apiUrl = process.env.REACT_APP_API_URL;

const ProductsPage = () => {
  const Products = useFetchProducts(`${apiUrl}products`);
  const [coin, setCoin] = useState(0);
  const [openCreateProductsPopup, setOpenCreateProductsPopup] = useState(false);

  useEffect(() => {
    if (openCreateProductsPopup) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [openCreateProductsPopup]);

  const onCoinChanged = total => {
    setCoin(total);
  };
  const onOk = price => {
    setCoin(coin - price);
  };

  return (
    <>
      <div className='vending-machine'>
        <button className='btn' onClick={() => setOpenCreateProductsPopup(true)}>Create new Product</button>
        {
          openCreateProductsPopup && <CreateProductsPopup 
            isOpen={openCreateProductsPopup}
            onClose={() => setOpenCreateProductsPopup(false)}
          />
        }
        <div className='machine'>
          <InputCoin coin={coin} onCoinChanged={onCoinChanged} />
          <div className='products'>
            {
              Products.map(product => (
                <Product key={product.id} product={product} coin={coin} onOk={onOk} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
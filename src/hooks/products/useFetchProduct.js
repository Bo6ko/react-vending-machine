import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../../redux/actions/productActions';
import { getProducts } from '../../redux/reducers/productReducer';
import { productsFileData } from "./data";

const useFetchProducts = (url) => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => ({
        products: getProducts(state)
    }));

    const fetchData = async () => {
        if ( products.length === 0 ) {
            await axios.get(url)
            .then((response) => {
                // dispatch(setProducts(response.data));
                // if API is shut down I need your public IP to put in server CORS origin
                dispatch(setProducts(productsFileData));
            })
            .catch((error) => {
                console.log('Error fetching data:', error);
            })
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return products;
};

export default useFetchProducts;
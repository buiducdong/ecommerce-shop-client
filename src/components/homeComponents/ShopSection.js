import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Pagination from './pagination';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../../redux/Actions/ProductAction';
import Loading from '../LoadingError/Loading';
import Error from '../LoadingError/Error';

const ShopSection = ({ keyword, pageNumber }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loadding, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <div className='container'>
        <div className='section'>
          <div className='row'>
            <div className='col-lg-12 col-md-12 article'>
              <div className='shopcontainer row'>
                {loadding ? (
                  <div className='md-5'>
                    <Loading />
                  </div>
                ) : error ? (
                  <Error variant='alert-danger'>{error}</Error>
                ) : (
                  <>
                    {products?.map((product) => (
                      <div className='shop col-lg-4 col-md-6 col-sm-6' key={product._id}>
                        <div className='border-product'>
                          <Link to={`/products/${product._id}`}>
                            <div className='shopBack'>
                              <img src={product.image} alt={product.name} />
                            </div>
                          </Link>

                          <div className='shoptext'>
                            <p>
                              <Link to={`/products/${product._id}`}>{product.name}</Link>
                            </p>

                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            />
                            <h3>${product.price}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {/* Pagination */}
                <Pagination pages={pages} page={page} keyword={keyword ? keyword : ''} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;

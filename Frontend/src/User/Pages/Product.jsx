import React, { useContext, useEffect, useState, } from 'react'
import { json, useParams } from 'react-router-dom'
import axios from 'axios';
import ReactStars from 'react-stars'
import Swal from 'sweetalert2';
import ImageSection from '../Components/ImageSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Cartcontext } from '../Context/AddToCart/context';
import PageLoaders from '../../Admin/Components/PagesLoader';
import { GlobalContext } from '../../Context/Context';
import { decodeToken } from 'react-jwt'

export default function Product() {

  const { state, dispatch } = useContext(GlobalContext)
  const user = decodeToken(state.token)

  const { _id } = useParams()
  const [product, setproduct] = useState(null)
  const [review, setreview] = useState("")
  const [rating, setrating] = useState(0)
  const [Quantity, setQuantity] = useState(1)
  const [loader, setloader] = useState(true)


  const { cart_state, cart_dispatch } = useContext(Cartcontext)

  useEffect(() => {
    axios.get(`http://localhost:4000/api/get-product-by-id?_id=${_id}`)
      .then((json) => {
        setproduct(json.data.Product)
        setloader(false)
        console.log("useeffect", json.data.Product)

      })
      .catch((err) => console.log(err))
  }, [_id])

  const ratingChanged = (newRating) => setrating(newRating)

  const decrease = () => setQuantity(Quantity - 1)
  const increase = () => setQuantity(Quantity + 1)

  const AddToCart = (item) => {
    const totalPrice = Quantity * item.price

    const payload = {
      ...product,
      Quantity,
      totalPrice
    }
    console.log(payload)

    cart_dispatch(
      {
        type: "ADD_TO_CART",
        payload
      }
    )
    Swal.fire({
      title: "Added to Cart!",
      text: "Check your Cart for Check Out",
      icon: "success",
      confirmButtonText: "Continue Shopping",
    });
  };

  const submitReview = () => {
    const payload = {
      _id: product._id,
      rating,
      username: user.username,
      review
    }

    axios.post('http://localhost:4000/api/review-product', payload)
      .then(json => {
        const totalRating = json.data.Product.reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
        const averageRating = (totalRating / json.data.Product.reviews.length).toFixed(1);

        const UpdateProductPayload = {
          _id: product._id,
          rating: averageRating
        }

        axios.put('http://localhost:4000/api/update-product', UpdateProductPayload).then((json) => {
          const updatedProduct = json.data.Product.find(item => item._id === product._id);
          setproduct(updatedProduct);

          Swal.fire({
            title: 'Sucessfully Submitted!',
            text: 'Thanks for reviewing our product',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          setreview('')
          setrating(0)
        })
          .catch((err) => console.log(err))
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      {
        loader ? <PageLoaders className="bg-danger " /> :
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-6 ">
                {
                  product?.images?.length > 0 && <ImageSection images={product.images} />
                }
              </div>

              <div className="col-md-5 ">
                <div className="container">
                  <div>
                    <h1>{product.name} </h1>
                    <p className='text-secondary'>{product.description}</p>

                    <div className='d-flex'>
                      <span className='text-danger'>Brand:  <span className='text-dark'>{product.brand}</span></span>
                      <div style={{ borderLeft: "2px solid #dc3545", height: "20px" }} className='mt-1 mx-2'></div>
                      <span className='text-danger'>Category:  <span className='text-dark'>{product.category}</span></span>

                    </div>
                  </div>

                  <div className="text-danger mt-2 ">
                    <h3>${product.price}</h3>
                  </div>

                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      edit={false}
                      value={product.rating}
                      color2={'#ffd700'} />
                  </div>

                  <div >
                    <span className='fw-semibold'>Quantity</span>
                    <button disabled={Quantity <= 1 || cart_state.cart.some(item => item._id === product._id)} onClick={() => decrease()} className='btn btn-dark m-3 px-3'>-</button>
                    {Quantity}
                    <button onClick={() => increase()} disabled={cart_state.cart.some(item => item._id === product._id)} className='btn btn-dark m-3 px-3'>+</button>
                  </div>

                  <div className=' mb-5'>
                    <Link >
                      <button className='btn btn-outline-danger px-5 py-2 rounded-0' disabled={cart_state.cart.some(item => item._id === product._id)} onClick={() => AddToCart(product)}>
                        <FontAwesomeIcon icon={faCartShopping} className='me-2 ' />
                        Add to cart
                      </button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            <div className='mt-5 text-center'>
              <h2>Review us</h2>
              <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam doloribus ut</p>
            </div>

            <div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  defaultValue={review}
                  onChange={(e) => setreview(e.target.value)}
                />
                <label htmlFor="floatingTextarea2">Comments</label>
              </div>
            </div>

            <div className="mt-3">
              Rate Us:
              <div className="d-flex align-items-center">
                <ReactStars
                  count={5}
                  size={24}
                  onChange={ratingChanged}
                  value={rating}
                  color2={'#ffd700'} />

                <div className='ms-3'>({rating})</div>

              </div>
            </div>
            <button className='btn btn-dark my-3' onClick={submitReview}>Submit Reviews</button>

            <div>
              <hr />
              <div className=''>Product Reviews</div>
              <hr />

              {
                product.reviews?.map((val, key) =>
                  <div key={key}>
                    <span className='fw-bold'>{val.username}</span>
                    <ReactStars
                      count={5}
                      size={15}
                      edit={false}
                      value={val.rating}
                      color2={'#ffd700'} />
                    <p>{val.review}</p>
                    <hr />
                  </div>
                )
              }
            </div>
          </div>
      }
    </>

  )
}
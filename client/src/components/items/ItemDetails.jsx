import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addToCart, removeFromCart, adjustQty, updateCart } from '../actions/items'
import { addReview } from "../actions/reviews"
import CheckoutImg from "../images/CheckoutImg.jpg"

const ItemDetails = () => {    
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, currentUser, cartCount } = useSelector(store => store.usersReducer)
    const currentItem = items?.find((item) => item.id === parseInt(id))
    const itemQ = currentUser?.user_items.find((item) => item.id === currentItem.id)
    const [qty, setQty] = useState(itemQ?.quantity || 1);
    const [title, setTitle] = useState("")
    const [review, setReview] = useState("")
    const [cartTotal, setCartTotal] = useState(cartCount)

    useEffect(() => {
        const itemQ = currentUser?.user_items.find((item) => item.id === currentItem.id);
        setQty(itemQ?.quantity || 0);
        // Calculate the cart total based on the quantity and price of the items in the cart
        const updatedCartTotal = currentUser?.user_items?.reduce((total, item) => {
        return total + item.quantity * item.price;
        }, 0);
        setCartTotal(updatedCartTotal || 0);
    }, [currentUser, currentItem, cartCount]);
    
    console.log(cartTotal, "cartTotal");
    console.log(qty, "qty")

    const handleAddItem = () => {
        const updatedQty = parseInt(qty);
        const updatedItem = { ...currentItem, quantity: updatedQty }
      
        if (itemQ) {
          // Item is already in the cart, adjust the quantity
          dispatch(adjustQty(currentItem.id, updatedQty))
        } else {
          // Item is not in the cart, add it to the cart
          dispatch(addToCart(updatedItem))
        }      
        navigate('/checkout')
    }
      
    const handleRemoveItem = () => {
        if (qty > 0) {
          const updatedQty = qty - 1;
          dispatch(adjustQty(currentItem.id, updatedQty));
        }
    };
      
    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddItem()
    }

    const submitReviewForm = (e) =>  {
        e.preventDefault();
        
        const newReview = {
            title,
            review,
            user_id: currentUser.id,
            item_id: currentItem.id
        }
        console.log(newReview)
        dispatch(addReview(newReview))
        
        // clear form??
        setTitle("")
        setReview("")
    }

    if (!currentItem) {
    return <div>Loading...</div>
    }

return ( 
    <main className="mt-5 pt-4">
        <div className="container mt-5">    
            <div className="row">
                <div key={currentItem.id} className="col-md-6 mb-4">
                    {currentItem && (
                        <img src={CheckoutImg} className="img-fluid" alt={CheckoutImg} />
                    )}
                </div>
                <div className="col-md-6 mb-4">
                    <div className="p-4">
                        <p className="lead">                        
                        <span>Price ${currentItem.price}</span>
                        </p>
                        <strong><p className="text-bold">Description</p></strong>
                        <p>{currentItem.name}</p>
                        <p>{currentItem.description}</p>                    
                        <form className="d-flex justify-content-left" onSubmit={handleSubmit}>                        
                            <div className="form-outline me-1" style={{width: '100px'}}>
                                <input min="1" type="number" defaultValue={qty} className="form-control" onChange={(e) => setQty(parseInt(e.target.value))} />
                            </div>                        
                            <button className="btn btn-primary shadow-0 me-1" type="submit">Add To Cart
                                <i className="fas fa-shopping-cart ms-1"></i>
                            </button>
                            <button onClick={() => handleRemoveItem(currentItem.id)} className="btn btn-primary shadow-0 me-1"><i className="bi-trash"></i>
                                <i className="fas fa-shopping-cart ms-1"></i>
                            </button>
                        </form>                         
                    </div>                
                </div>        
            </div>   
            <hr />
            <div className="row d-flex justify-content-center">
                {currentItem.reviews && currentItem.reviews.map((review) =>
                <div key={review.id} className="col-md-6 text-center">
                    <h4 className="my-4 h4">Reviews:</h4>
                    <p>{review.title}</p>
                    <p>{review.review}</p>
                </div>
                )} 
            </div>
            <div className="row">
                <form onSubmit={submitReviewForm}>
                    <input type="text" value={title} className="form-control" placeholder="Type Title..." onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" value={review} className="form-control" placeholder="Type Product Review" onChange={(e) => setReview(e.target.value)} />
                    <button type="submit" className="btn bg-warning p-2 btn-outline-primary fw-bold">Add Review</button> 
                </form>
            </div>    
        </div>
    </main>
    )
}
export default ItemDetails









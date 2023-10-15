import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addToCart, removeFromCart, adjustQty, updateCartCount } from '../actions/items'
import { addReview } from "../actions/reviews"
import CheckoutImg from "../images/CheckoutImg.jpg"

//TODO: review user_items_controller cart method. select the id that matches the item_id and update the quantity + 1. Review Rails Resource Routing: Update

const ItemDetails = () => {    
    const { items, currentUser, cartCount } = useSelector(store => store.usersReducer)
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentItem = items?.find((item) => item.id === parseInt(id))
    const itemQ = currentUser?.userItems?.find((item) => item.id === currentItem.id)
    const [qty, setQty] = useState(itemQ?.quantity || 0);
    const [title, setTitle] = useState("")
    const [review, setReview] = useState("")
    const [cartTotal, setCartTotal] = useState(cartCount)

    useEffect(() => {
        const itemQ = currentUser?.userItems?.find((item) => item.id === currentItem.id);
        setQty(itemQ?.quantity || 0);
        // Nicholas : Why are we calling the setter function (setQty) with the same code that is in state in our useEffect?
        const updatedCartTotal = currentUser?.userItems?.reduce((total, item) => {
        return total + item.quantity * item.price;
        }, 0);
        setCartTotal(updatedCartTotal || 0);
    }, [currentUser, currentItem, cartCount]);
    // Nicholas : Why do we have currentUser in the dependencies array if we're only looking for the currentItem & cartCount to change?
    // Nicholas : the user wont change if we are the logged in user. 

    const handleAddItem = (id) => {
        console.log(id)
        const updatedQty = parseInt(qty);
        const updatedItem = { ...currentItem, quantity: updatedQty }
        if (itemQ) {
          // Item is already in the cart, adjust the quantity
          dispatch(adjustQty(currentItem.id, updatedQty))
        } else {
          // Item is not in the cart, add it to the cart
          dispatch(addToCart(updatedItem))
        }      
        const updatedCartTotal = cartTotal + updatedQty * currentItem.price;
  setCartTotal(updatedCartTotal);
        navigate('/checkout')
    }
      // TODO 1 : this function remove every item in the cart and rerenders the component.
      // TDOD : This item should remove 
    // const handleRemoveItem = () => {
    //     if (qty > 0) {
    //       const updatedQty = qty - 1;
    //       dispatch(adjustQty(currentItem.id, updatedQty));
    //     //   dispatch(removeFromCart(currentItem.id, updatedQty));
    //     // the above dispatch may need to be in the /checkout component to remove item from shopping cart.
    //     }
    // };
      
    const submitReviewForm = (e) =>  {
        e.preventDefault();
        
        const newReview = {
            title,
            review,
            user_id: currentUser.id,
            item_id: currentItem.id
        }
        console.log(newReview, "newReview")
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
                        <form className="d-flex justify-content-left">                       
                            <div className="form-outline me-1" style={{width: '100px'}}>
                                <input min="0" type="number" defaultValue={qty} className="form-control" onChange={(e) => setQty(parseInt(e.target.value))} />
                            </div>                        
                            <button onClick={() => handleAddItem(currentItem.id)} className="btn btn-primary shadow-0 me-1" type="button">Add To Cart
                                <i className="fas fa-shopping-cart ms-1"></i>
                            </button>
                            {/* <button onClick={() => handleRemoveItem(currentItem.id)} className="btn btn-primary shadow-0 me-1"><i className="bi-trash"></i>
                                <i className="fas fa-shopping-cart ms-1"></i>
                            </button> */}
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









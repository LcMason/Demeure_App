import React from 'react'
import ItemList from './items/ItemList'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
    // const { userItems, cart, item } = useSelector(store => store.usersReducer)
    const { userItems, cartCount, item } = useSelector(store => store.usersReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();

        const displayAddedItems = () => {
            // return cartCount.map(item => {
            return userItems.map(item => {
                let itemQuantity = item.find((userItem) => {
                    return userItem.item_id === item.id;
                })
            })
        }

  return (
    <div className="cart-item">
        {/* <div> */}
  {/* {cart.map(item => ( */}
        {userItems.map(item => (
            <ItemList key={item.id} item={item} />
        ))}
        {/* </div> */}
        <div className="cart-item-bottom">

            <div className="cart-item-bottom">
                <Counter
                    itemId={item.id}
                    item={item}
                    itemQuantity={item.itemQuantity}
                 />
            </div>
         
            <button className="item-delete-button" >ADD</button>  
            {/* <button className="item-delete-button" onClick={handleRemoveItem}>REMOVE</button>   */}
            <button className="item-save-button" onClick={displayAddedItems}>SAVE FOR LATER</button>   
        </div>               
    </div>               

)}


export default Cart
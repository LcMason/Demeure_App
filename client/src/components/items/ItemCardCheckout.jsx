import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { removeFromCart, adjustQty, deleteSingleItem } from "../actions/items" 

const ItemCardCheckout = ({ item }) => {
const dispatch = useDispatch();

   const handleAdjustQuantity = (op) => {
     if (op === "+") {
       dispatch(adjustQty(item.id, item.quantity + 1 ));      
      } else if (item.quantity === 1){
        dispatch(removeFromCart(item.id));
      } else {
        dispatch(adjustQty(item.id, item.quantity - 1 )); 
    }
}

  const handleDeleteItem = (itemId) => {
    dispatch(deleteSingleItem(itemId));
  }
   
  return (
    <div key={item.id} className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <div>
              <img
                src={item.image} alt={item.name}
                className="img-fluid rounded-3" style={{width: '65px'}}/>
            </div>
            <div className="ms-3">
              <p className="small mb-0">{item.name}</p>
              <p className="small mb-0">{item.description}</p>
                  </div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div style={{width: '50px'}}>
              <h5 className="fw-normal mb-0">{item.quantity}</h5>
            </div>
            <div style={{width: '80px'}}>
              <h5 className="mb-0">${item.price * item.quantity}</h5>
            </div>
            <div>
            <button
            className="btn btn-sm btn-primary ms-2"
              onClick={() => handleAdjustQuantity("+")}
            >
              +
            </button>
            <button
              className="btn btn-sm btn-primary ms-2"
              onClick={() => handleAdjustQuantity("-")}
            >
              -
            </button>
            
              <button className="btn btn-sm btn-primary ms-2" onClick={() => {handleDeleteItem(item.id)}}>Remove</button>
            
          </div>
            <Link to="#!" style={{color: '#cecece'}}><i className="fas fa-trash-alt"></i></Link>
          </div>
        </div>
      </div>
    </div>                
  )
}

export default ItemCardCheckout
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showItem, addToCart } from '../actions/items'
import { useNavigate } from 'react-router-dom'
import BreadCrumbs from '../BreadCrumbs'



const ItemList = () => {
  const { items } = useSelector(store => store.usersReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleClick = (id) => {
    // dispatch(showItem(id))
    navigate(`/products/${id}`)
  }

  const handleAddItem = (item) => {
    dispatch(addToCart(item))
}

  return (
    <>
    <BreadCrumbs />
    <div>      
      <section>
      <div className="container my-5">
        <header className="mb-4">
          <h3>Products</h3>
        </header>
        <div className="row">
        {items.map((item) => 
          <div key={item.id} className="col-lg-3 col-md-6 col-sm-6 d-flex">
            <div className="card w-100 my-2 shadow-2-strong">
              <img src={item.image} alt={item.image} className="card-img-top" style={{"aspectRatio": "1 / 1"}} />
              <div className="card-bodly d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">${item.price}</p>
                <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                <button onClick={() => handleClick(item.id)} className="btn btn-primary shadow-0 me-1">Details</button>
                <button onClick={() => handleAddItem(item)} className="btn btn-primary shadow-0 me-1">Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        )}
          </div>
        </div>
      </section>
    </div>  
    </> 
  )
}

export default ItemList
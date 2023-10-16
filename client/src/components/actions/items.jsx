// import { headers } from "../Globals"
// import { setErrors } from "./errors";



export const loadItems = () => {
  // thunk middleware uses these actions to make asynchronous calls
  // it expects a function to be returned
  // the function itself takes in a parameter called dispatch

  // TODO : set errors if else statement.

  return dispatch => {
    // asynchronous calls
    fetch('/items')
    .then(resp => resp.json())
    .then(data => {
      const action = ({ type: "LOAD_ITEMS", payload: data })
      console.log(data)
      dispatch(action)
    })
  }
}

export const updateCartItems = (item) => {
  return dispatch => {
    // asynchronous calls
    fetch('/cart',
    {
      method: "POST",
      "Accept": "application/json",
      "Content-Type": "application/json",
      body: JSON.stringify(item)
    })
    .then(resp => resp.json())
    .then(data => {
      const action = ({ type: "LOAD_USER_ITEMS", payload: data })
      console.log(data)
      dispatch(action)
    })
  }
}

export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item
  };
};

export const removeFromCart = (id) => {
    return { type: "REMOVE_FROM_CART", payload: {id}}
}

export const deleteEntireCart = (id) => {
  return { type: "DELETE_ENTIRE_CART", payload: {id} };
};

export const deleteSingleItem = (itemId) => {
  return {
    type: "DELETE_SINGLE_ITEM",
    payload: { itemId }
  };
};

export const adjustQty = (id, qty) => {
  return { type: "ADJUST_QTY", payload: { id, quantity: qty} }
}

export const updateCartCount = (total) => {
  return { type: "UPDATE_CART_COUNT", payload: total }
}

export const showItem = (id) => {
  return dispatch => {
    fetch(`/items/${id}`)
      .then(resp => resp.json())
      .then(data => {
        const action = {
          type: "SHOW_ITEM",
          payload: data
        };
        dispatch(action);

      });
  };
};
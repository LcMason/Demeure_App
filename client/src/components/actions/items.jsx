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
    return { type: "REMOVE_FROM_CART", payload: id }
}

export const adjustQty = (id, qty) => {
  return { type: "ADJUST_QTY", payload: { id, quantity: qty} }
}
// NewCode :
// export const updateCart = (updatedCartItems) => {
//   return { type: "UPDATE_USER_ITEMS", payload: updatedCartItems }
// }
export const updateCart = (total) => {
  return { type: "UPDATE_CART_COUNT", payload: total }
}


// Check syntax of deleteItem. Missing data in the dispatch?
// export const deleteItem = (id) => {
//   return dispatch => {
//     fetch(`/lists/${ id }`, {
//       method: "DELETE",
//       headers: {
//         "Accept": "application/json"
//       }
//     })
//       .then(resp => resp.json())
//       .then(data => {
//         // update reducer state;
//         // how do we update reducer state?
//         dispatch({
//           type: "DELETE_ITEM",
//           payload: id
//         });
//       })
//   }
// }

// export const showItem = (id) => {
//   return dispatch => {
//     fetch(`/items/${id}`)
//       .then(resp => resp.json())
//       .then(data => {
//         const action = {
//           type: "SHOW_ITEM",
//           payload: data
//         };
//         dispatch(action);
//         // navigate(`/items/${id}`)
//       });
//   };
// };
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
        // navigate(`/items/${id}`)
      });
  };
};
// export const removeItem = (item) => {
//   return dispatch => {
//     fetch(`/items/${item.id}`)
//       .then(resp => resp.json())
//       .then(data => {
//         const action = {
//           type: "REMOVE_ITEM",
//           payload: {
//             ...data,
//             quantity: data.quantity - 1 // Increment the quantity by 1
//           }
//         };
//         dispatch(action);
//       });
//   };
// };

// export const addItemToCart= (item, navigate) => {
//   return dispatch => {
//     fetch(`/items/${ item.id }`)
//       .then(resp => resp.json())
//       .then(data => {
//         const action = {
//           type: "ADD_ITEM_TO_CART",
//           payload: data
//         };
//         dispatch(action)
//         navigate('/cart')
//       });
//   }
// }


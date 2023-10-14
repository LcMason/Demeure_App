const initialState = {
users: [],
currentUser: null,
cartCount: 0,
loggedIn: false,
userItems: [], 
showItem: null, 
items: [],
reviews: [],
}

const usersReducer = (state=initialState, action) => {
    switch(action.type) {
        case "LOAD_USERS":
          return {
            ...state,
            users: action.payload
        }
        case "LOGIN_USER":
          return {
            ...state,
            currentUser: action.payload,
            loggedIn: true
        }
        case "ADD_USER":
          return {
            ...state,
            users: [...state.users, action.payload]
        }
        case "LOGOUT_USER":
          return {
            ...state,
            currentUser: null,
            loggedIn: false
        }
        case "LOAD_ITEMS":
          return {
            ...state,
              items: action.payload
        }  
        case "LOAD_USER_ITEMS":
          return {
            ...state,
              userItems: action.payload  
        }   
     
        case "SHOW_ITEM":
          return {
              ...state, 
              showItem: action.payload
        } 
        // NewCode ;
        case "UPDATE_USER_ITEMS":
        return {
          ...state,
          currentUser: {...state.currentUser, userItems: action.payload}
        }
       
       case "ADD_TO_CART": {
    console.log('ADD_TO_CART action triggered', action);

    const item = action.payload;
    console.log('Item from payload:', item);

    const currentItems = state.currentUser?.userItems || [];
    console.log('Current items:', currentItems);

    const existingItem = currentItems.find(userItem => {
        console.log('Checking cart item:', userItem);
        return userItem.id === item.id;
    });
    console.log('Existing item:', existingItem); // before an item is placed into the cart

    let updatedUserItems;
    if (existingItem) {
        updatedUserItems = currentItems.map(userItem => {
            console.log('Mapping cart item:', userItem);
            if (userItem.id === item.id) {
                console.log('Found item to update:', userItem);
                return { ...userItem, quantity: userItem.quantity + 1 };
            }
            return userItem;
        });
    } else {
        console.log('Item not found in cart, adding new item');
        updatedUserItems = [...currentItems, { ...item, quantity: 1 }];
    }
    console.log('Updated user items:', updatedUserItems); // after item placed in cart

    const updatedCartCount = (Number(state.cartCount) + 1);
    // console.log('Updated cart count:', updatedCartCount);
    console.log('Updated cart count:', typeof updatedCartCount);

    return {
        ...state,
        currentUser: {
            ...state.currentUser,
            userItems: updatedUserItems
        },
        cartCount: updatedCartCount
    };
}

        case "UPDATE_CART_COUNT":
          return {
            ...state,
            cartCount: action.payload
        }

        case "ADJUST_QTY":
          return {
            ...state,
            currentUser: {
              ...state.currentUser,
              userItems: state.currentUser.userItems.map((item) =>
                item.id === action.payload.id
                  ? { ...item, quantity: action.payload.quantity }
                  : item
              )
            }
        }                       
        // case "REMOVE_FROM_CART":
        //   return {
        //       ...state,
        //       userItems: state.userItems.filter(item => item.id !== action.payload)
        // }
        //update user cart data structure and one that updates my quantity.

        // TODO: instead of removing everything from the cart, remove item 1 at a time.
        // TODO: itemId is undefined. 
        // TODO: Do i need to use let to define a variable that will change with the cartCount? Where will I define this? 
       case "REMOVE_FROM_CART": {
      const itemId = action.payload.id;
      let currentItems = state.currentUser?.userItems || [];
      const existingItem = currentItems.find(currentItem => currentItem.id === itemId);
        // if the qunatity is greater than 1, we reduce the qunatity by 1. 
      if (existingItem.quantity === 1) { 
        currentItems = currentItems.filter(item => item.id !== itemId)
      } else {
        existingItem.quantity--
      }
      const updatedCartCount = Math.max(0, (Number(state.cartCount) - 1));
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          userItems: currentItems
        },
        cartCount: updatedCartCount,
      };
    }

        case "ADD_REVIEW":
          const updatedItem = {...state.showItem, reviews: [...state.reviews, action.payload] }
          return {
            ...state,
            reviews: [...state.reviews, action.payload], 
            showItem: updatedItem
        }                
        default:
          return state;
    }
}
export default usersReducer;
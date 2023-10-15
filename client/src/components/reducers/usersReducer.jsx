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
        const item = action.payload;
        const currentItems = state.currentUser?.userItems || [];
        const existingItem = currentItems.find(userItem => {
        return userItem.id === item.id;
    });
        let updatedUserItems;
          if (existingItem) {
              updatedUserItems = currentItems.map(userItem => {
            if (userItem.id === item.id) {
                console.log('Found item to update:', userItem);
                return { ...userItem, quantity: userItem.quantity + 1 };
            }
            return userItem;
        });
    } else {
        updatedUserItems = [...currentItems, { ...item, quantity: 1 }];
    }
    const CartCountupdated = (Number(state.cartCount) + 1);

    return {
        ...state,
        currentUser: {
            ...state.currentUser,
            userItems: updatedUserItems
        },
    };
}
        case "UPDATE_CART_COUNT":
          return {
            ...state,
            cartCount: state.currentUser?.userItems?.length || 0
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
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          userItems: currentItems
        },
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
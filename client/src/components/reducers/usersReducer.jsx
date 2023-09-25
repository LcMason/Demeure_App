const initialState = {
users: [],
currentUser: null,
cartCount: 0,
loggedIn: false,
// TODO : do i need a cartItems variable or can i use user_items. Why is user_items snake cased?
cartItems: [],
user_items: [], 
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
              user_items: action.payload  
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
          currentUser: {...state.currentUser, user_items: action.payload}
        }
        // TODO 1: fix ADD_TO_CART . ' inCart' is undefined on the first click.
        //how is cartItem from the controller accessbile in my usersReduer
        case "ADD_TO_CART":
          const item = action.payload;
          console.log(item, "item")
          const inCart = state.currentUser?.user_items?.find(
          (cartItem) => cartItem.id === item.id)
          console.log(inCart, "inCart variable")
          const updatedUserItems = inCart
          ? state.currentUser.user_items.map((cartItem) =>
              cartItem.id === item.id
              // add variable declared on line 61 
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
           
                : cartItem
                // add variable declared on line 70
            )
            // TODO : cartCount is not updating from /itemDetails route
          : [...state.currentUser?.user_items ?? [], { ...item, quantity: 1 }]
          const updatedCartCount = state.cartCount + 1; // Increment the cart count
          return {
            ...state,
            currentUser: {...state.currentUser, user_items: updatedUserItems},
            cartCount: updatedCartCount
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
              user_items: state.currentUser.user_items.map((item) =>
                item.id === action.payload.id
                  ? { ...item, quantity: action.payload.quantity }
                  : item
              )
            }
        }                       
        case "REMOVE_FROM_CART":
          return {
              ...state,
              user_items: state.user_items.filter(item => item.id !== action.payload)
        }
        case "LOAD_REVIEWS":
          return {
            ...state,
            reviews: action.payload
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
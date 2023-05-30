import { combineReducers } from "redux";
import usersReducer from "./usersReducer";

import errorsReducer from "./errorsReducer";


export default combineReducers({

    errorsReducer,
    usersReducer
})
// export const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)))
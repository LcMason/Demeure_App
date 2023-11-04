import { headers } from "../Globals"
import { setErrors, clearErrors } from "./errors";



// TODO: finish building out loadReviews action file. Look at items action file for reference.
// build out loadReviews : look at actions > items > loadItems 
// export const loadReviews = () => {
//     return dispatch => {
//        fetch('/reviews')
//        .then(resp => resp.json())
//        .then(data => {
//         const action = {
//             type: "LOAD_REVIEWS", payload: data }
//         dispatch(action)
//        })
//     }
// }

export const addReview = (review) => {
    return dispatch => {
        fetch('/reviews', {
            method: "POST",
            headers,
            body: JSON.stringify(review)
          })
            .then(resp => resp.json())
            .then(data => {
              if(data.errors) {
                dispatch(setErrors(data.errors));
              } else {
                const action = {
                  type: "ADD_REVIEW",
                  payload: data
                }
                  dispatch(action)
                  dispatch(clearErrors())
                }
            })

    }
    
}

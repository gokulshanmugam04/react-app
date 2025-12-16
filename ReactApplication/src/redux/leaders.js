import * as ActionTypes from "./ActionTypes";

//reducer function(state, action)
const actions = {
    [ActionTypes.ADD_LEADERS]: ( state, { payload: payload } ) => ({
        ...state,
        isLoading: false,
        err: null,
        leaders: payload,
    }),
    [ActionTypes.LEADERS_FAILED]: ( state, { payload: payload } ) => ({
        ...state,
        isLoading: false,
        err: payload,
        leaders: [],
    }),
    [ActionTypes.LEADERS_LOADING]: state => ({
        ...state,
        isLoading: true,
        err: null,
        leaders: [],
    }),
}
export const Leaders = ( state = { isLoading: true, err: null, leaders: [], },
                         action ) =>
    actions[action.type] ?
        actions[action.type]( state, action ) :
        state
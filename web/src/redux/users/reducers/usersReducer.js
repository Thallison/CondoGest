const INITIAL_STATE = { listUsers: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERS_FETCHED':
            return { ...state, listUsers: action.payload.data }
        default:
            return state
    }
}
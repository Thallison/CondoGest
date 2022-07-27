const INITIAL_STATE = { listStandards: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'STANDARD_FETCHED':
            return { ...state, listStandards: action.payload.data }
        default:
            return state
    }
}
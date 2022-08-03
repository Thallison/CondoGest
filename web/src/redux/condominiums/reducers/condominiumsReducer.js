const INITIAL_STATE = { listCondominiums: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CONDOMINIUM_FETCHED':
            return { ...state, listCondominiums: action.payload.data }
        default:
            return state
    }
}
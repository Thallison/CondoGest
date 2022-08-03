const INITIAL_STATE = { listAccounts: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ACCOUNT_FETCHED':
            return { ...state, listAccounts: action.payload.data }
        default:
            return state
    }
}
const INITIAL_STATE = 
    { 
        listDashboard: [], 
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DASHBOARD_FETCHED':
            return { ...state, listDashboard: action.payload.data }
        default:
            return state
    }
}
const INITIAL_STATE = 
    { 
        listLastInspections: [], 
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'REPORT_LAST_INSPECTIONS_FETCHED':
            return { ...state, listLastInspections: action.payload.data }
        default:
            return state
    }
}
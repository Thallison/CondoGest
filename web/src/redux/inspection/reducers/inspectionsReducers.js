const INITIAL_STATE = 
    { 
        listInspections: [], 
        listInspectionEvidences: [],
        listInspection: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'INSPECTIONS_FETCHED':
            return { ...state, listInspections: action.payload.data }
        case 'INSPECTION_EVIDENCES_FETCHED':
            return { ...state, listInspectionEvidences: action.payload.data }
        case 'INSPECTION_FETCHED':
            return { ...state, listInspection: action.payload.data[0] }
        default:
            return state
    }
}
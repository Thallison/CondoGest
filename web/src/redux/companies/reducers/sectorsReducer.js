const INITIAL_STATE = 
    { 
        listSectorStandards: [],
        listSectors: []
    }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SECTORS_FETCHED':
            return { ...state, listSectors: action.payload.data }
        case 'SECTOR_STANDARDS_FETCHED':
            return { ...state, listSectorStandards: action.payload.data }
        default:
            return state
    }
} 
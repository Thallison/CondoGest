const INITIAL_STATE = 
    { 
        listRoles: [],
        listRolePermissions: [],
        listPermissions: []
    }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ROLE_FETCHED':
            return { ...state, listRoles: action.payload.data }
        case 'ROLE_PERMISSIONS_FETCHED':
            return { ...state, listRolePermissions: action.payload.data }
        case 'PERMISSIONS_FETCHED':
            return { ...state, listPermissions: action.payload.data }
        default:
            return state
    }
} 
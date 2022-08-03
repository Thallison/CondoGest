import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr'
import UsersReducer from './redux/users/reducers/usersReducer'
import AccountsReducer from './redux/accounts/reducers/accountsReducer'
import CondominiumsReducer from './redux/condominiums/reducers/condominiumsReducer'
import CompaniesReducer from './redux/companies/reducers/companiesReducer'
import SectorsReducer from './redux/companies/reducers/sectorsReducer'
import PermissionsReducer from './redux/permissions/reducers/permissionsReducer'
import InspectionsReducer from './redux/inspection/reducers/inspectionsReducers'
import ReportsReducer from './redux/reports/reducers/LastInspectionsReducers'
import DashboardReducer from './redux/dashboard/reducers/DashboardReducers'

const rootReducer = combineReducers({
    dashboard: () => ({}),
    form: formReducer,
    Users: UsersReducer,
    Accounts: AccountsReducer,
    Condominiums: CondominiumsReducer,
    Companies: CompaniesReducer,
    Sectors: SectorsReducer,
    Roles: PermissionsReducer,
    Inspections: InspectionsReducer,
    Reports: ReportsReducer,
    Dashboard: DashboardReducer,
    toastr: toastrReducer 
})

export default rootReducer
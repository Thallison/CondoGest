import api from '../../../services/api'

export function getList(dataFilter = {}) {

    const request = []//api.get("dashboard")
    return {
        type: 'DASHBOARD_FETCHED',
        payload: request
    }
}
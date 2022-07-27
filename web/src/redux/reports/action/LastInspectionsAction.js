import api from '../../../services/api'

export function getList(dataFilter = {}) {

    const params = {params: dataFilter}

    const request = api.get("report_last_inspections", params)
    return {
        type: 'REPORT_LAST_INSPECTIONS_FETCHED',
        payload: request
    }
}
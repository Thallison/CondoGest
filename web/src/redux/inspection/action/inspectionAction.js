import api from '../../../services/api'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'

export function getList(dataFilter = {}) {

    const params = {params: dataFilter}

    const request = api.get("inspections", params)
    return {
        type: 'INSPECTIONS_FETCHED',
        payload: request
    }
}

export function getInspection(id) {
    const request = api.get(`/inspections/${id}`)
    return {
        type: 'INSPECTION_FETCHED',
        payload: request
    }
}


export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

function submit(values, method) {
    const id = values.id ? values.id : ''

    var standards = [];

    if (typeof values.standard !== 'undefined') {
        Object.keys(values.standard).forEach((key) => {
            if (values.standard[key].applicable)
                standards.push({
                    standard_id: key,
                    status: values.standard[key].status,
                    observation: values.standard[key].observation,
                    who: values.standard[key].who, 
                    when: values.standard[key].when
                })
        })
    }

    const data = {
        company_id: values.company_id,
        status: values.status,
        standards: standards
    }

    return dispatch => {
        api[method](`/inspections/${id}`, data)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                if (id) {
                    dispatch([showUpdate(id)])
                }
                else {
                    dispatch([window.location.href = `http://localhost:3000/#/app/vistorias/edit/${resp.data.id}`])
                }
            })
            .catch(e => {
                if (e.response) {
                    // Request made and server responded
                    e.response.data.forEach(data => toastr.error('Erro', data.error.message));

                }
            })
    }
}


export function showUpdate(id) {
    return dispatch =>
        api.get(`/inspections/${id}`)
            .then(resp => {
                const response = resp.data

                var standards = []
                response[0].standards.map(standard =>
                    standards[standard.id] = { 
                        applicable: true, 
                        status: standard.pivot.status + '', 
                        observation: standard.pivot.observation,
                        who: standard.pivot.who,
                        when: standard.pivot.when
                    }
                )

                var data = {
                    id: response[0].id,
                    company_id: response[0].company.id,
                    companyName: response[0].company.companyName,
                    standard: standards
                }

                dispatch([
                    initialize('inspectionForm', data),
                    {
                        type: 'INSPECTION_FETCHED',
                        payload: resp
                    }
                ])
            })
}

export function destroy(id) {
    return dispatch =>
        api.delete(`/inspections/${id}`)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                dispatch([
                    getList()
                ])
            })
}

export function createPDF(id) {
    return dispatch =>
        api.post(`/pdf`, { inspection_id: id })
            .then(resp => {
                console.log(resp)
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                window.open(resp.data, '_blank')

            }).catch(e => console.log(e))
}
import api from '../../../services/api'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'

export function getList(id) {
    const request = api.get(`evidences/${id}`)
    return {
        type: 'INSPECTION_EVIDENCES_FETCHED',
        payload: request
    }
}


export function create(values, id) {
    values.id = id;
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

function submit(values, method) {

    const id = values.id ? values.id : ''

    const config = {
        'Content-Type': 'multipart/form-data',
    }

    let formData = new FormData();
    formData.append('file', values.file)
    formData.append('comments', values.comments)

    return dispatch => {
        api[method](`/evidences/${id}`, formData, config)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                dispatch([resetForm('inspectionFilesForm'), getList(id)])
            })
            .catch(e => {
                if (e.response) {
                    // Request made and server responded
                    e.response.data.forEach(error => toastr.error('Erro', error.message));

                }
            })
    }
}


export function showUpdate(id) {
    return dispatch =>
        api.get(`/companies/${id}`)
            .then(resp => {
                dispatch([
                    initialize('companyForm', resp.data)
                ])
            })
}

export function destroy(id, getId) {
    return dispatch =>
        api.delete(`/evidences/${id}`)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                dispatch([
                    getList(getId)
                ])
            })
}
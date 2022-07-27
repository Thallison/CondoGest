import api from '../../../services/api'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'

export function  getList() {
    const request = api.get("permissions")
    return {
        type: 'PERMISSIONS_FETCHED',
        payload: request
    }
}


export function create(values){
    return submit(values, 'post')
}

export function update(values){
    return submit(values, 'put')
}

function submit(values, method){
    const id = values.id ? values.id : ''
    return dispatch => {
        api[method](`/permissions/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                if (id) {
                    dispatch([showUpdate(id)])
                }
                else {
                    dispatch([resetForm('RoleForm'), getList()])
                }
            })
            .catch(e => {
                if (e.response) {
                    // Request made and server responded
                    e.response.data.forEach(error =>toastr.error('Erro', error.message));

                  } 
            })
    }
}


export function showUpdate(id) {
    return dispatch => 
    api.get(`/permissions/${id}`)
        .then(resp => {
            dispatch([
                initialize('RoleForm', resp.data)
            ])
        })
}

export function destroy(id) {
    return dispatch => 
    api.delete(`/permissions/${id}`)
        .then(resp => {
            toastr.success('Sucesso', 'Operação realizada com sucesso.')
            dispatch([
                getList()
            ])
        })
}
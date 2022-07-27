import api from '../../../services/api'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'

export function  getList() {
    const request = api.get("users")
    return {
        type: 'USERS_FETCHED',
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
        api[method](`/users/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                if (id) {
                    dispatch([showUpdate(id), getList()])
                }
                else {
                    dispatch([resetForm('userForm')])
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
    api.get(`/users/${id}`)
        .then(resp => {
            dispatch([
                initialize('userForm', resp.data)
            ])
        })
}

export function destroy(id) {
    return dispatch => 
    api.delete(`/users/${id}`)
        .then(resp => {
            toastr.success('Sucesso', 'Operação realizada com sucesso.')
            dispatch([
                getList()
            ])
        })
        .catch(e => {
            if (e.response) {
                // Request made and server responded
                toastr.error('Erro ao realizar operação', e.response.data.error.message)
              } 
        })
}
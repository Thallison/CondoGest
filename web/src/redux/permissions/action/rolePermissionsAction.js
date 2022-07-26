import api from '../../../services/api'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'

export function  getList() {
    const request = api.get("role_permissions")
    return {
        type: 'ROLE_PERMISSIONS_FETCHED',
        payload: request
    }
}


export function create(values){
    return submit(values, 'post')
}

export function update(values, RoleId){
    return submit(values, 'put', RoleId)
}

function submit(values, method, RoleId){

    var permissions = []
    Object.keys(values).forEach((key)=>{ 
        if(values[key])
        { 
            permissions.push(key)
        } 
    })
    const data = {
        permission: permissions
    }
  
    const id = RoleId ? RoleId : ''
    return dispatch => {
        api[method](`/role_permissions/${id}`, data)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                if (id) {
                    dispatch([showUpdate(id)])
                }
                else {
                    dispatch([resetForm('rolePermissionsForm'), getList()])
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
    api.get(`/role_permissions/${id}`)
        .then(resp => {
            dispatch([
                initialize('rolePermissionsForm', resp.data)
            ])
        })
}

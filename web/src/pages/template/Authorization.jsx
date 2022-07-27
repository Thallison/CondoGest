import React from 'react'
import { userGetPermission } from "../../services/auth";

export default props => {
    let permissions = userGetPermission()
    permissions = typeof permissions !== 'undefined' ? permissions : []

    if(props.permission){
        if (permissions.includes(props.permission)){
            return <>{props.children}</>
        } else {
            return <></>
        }
    }else{
        return <>{props.children}</>;
    }
}
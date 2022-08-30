import React from 'react'
import { userGetPermission } from "../../services/auth";

export default props => {
    let permissions = userGetPermission()
    permissions = typeof permissions !== 'undefined' ? permissions : []

    if(props.permission){        
        if (props.permission.includes(permissions)){
            return <>{props.children}</>
        } else {
            return <></>
        }
    }else{
        return <>{props.children}</>;
    }
}
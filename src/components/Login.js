import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import {SyntheticEvent} from "react";
import { Navigate } from "react-router-dom";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const [redirect,setRedirect]=useState(false)

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser= async (e: SyntheticEvent)=>{

        await fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods':'POST',
                'Access-Control-Allow-Headers':'Content-type',
            },
            body: JSON.stringify({
                loginState
            })
        })

        setRedirect(true)
    }

    if(redirect) {
        return (
            <Navigate to="/dashboard" replace={true} />
        )
    }

    /*const authenticateUser = () =>{
        const endpoint=`api/login`;
        fetch(endpoint,
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(loginFields)
            }).then(response=>response.json())
            .then(data=>{
                //API Success from LoginRadius Login API
                console.log('success login')
            })
            .catch(error=>console.log(error))
    }*/

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
            </div>

            <FormExtra/>
            <FormAction handleSubmit={handleSubmit} text="Login"/>

        </form>
    )
}
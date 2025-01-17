import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import {SyntheticEvent} from "react";
import {Navigate} from "react-router-dom";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
    const [signupState,setSignupState]=useState(fieldsState);
    const [redirect,setRedirect]=useState(false)

    const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(signupState)
        createAccount()
    }

    //handle Signup API Integration here
    const createAccount=async (e: SyntheticEvent)=>{
        await fetch('api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': 'api/register',
                'Access-Control-Credentials': 'true',
                'Access-Control-Allow-Methods':'POST',
                'Access-Control-Allow-Headers':'Content-type',
            },

            body: JSON.stringify({
                signupState
            })
        })

        setRedirect(true)
    }

    if(redirect) {
        return (
            <Navigate to="/" replace={true} />
        )
    }


    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>



        </form>
    )
}
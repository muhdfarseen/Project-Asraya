import React from 'react'
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { supabase } from './supabase/config';



const Login = ({setToken}) => {

    let navigate = useNavigate()
    
    const [regdata,setregdata]=useState({
           
            email:'',
            password:''
    
        })
    
        //console.log(regdata)
    
    function handleChange(event){
    
        setregdata((predata)=>{
            return{
                ...predata,
                [event.target.name]:event.target.value
                
            }
        })
    }
    
    async function handleSubmit(e){
    
        e.preventDefault()
    
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: regdata.email,
                password: regdata.password,
              })
    
    
            if(error) throw error
            //console.log(data)
           
            setToken(data)
            navigate('/adminprofile')
    
        }
        catch(error){
            alert(error)
        }
    
    }

  return (
    <div className='LoginBody'>
        
        <div className="LoginForm">

            <p className='Logotext'>
                <img className='Logo' src="/Assets/LOGO.svg" alt="" /> <br />
                <span className='L1'>Asraya</span> <br/>
                <span className='L2'>Charitable Society</span>
            </p>


            <form method='POST' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="InputEmail1" className="form-label">Email address</label>
                    <input name='email' type="email" onChange={handleChange} className="form-control" id="InputEmail1" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword1"  className="form-label" >Password</label>
                    <input name='password' type="password" onChange={handleChange} className="form-control" id="InputPassword1" required/>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-danger button">Login</button>
                </div>
            </form>
        </div>

        <img className='Background_Logo' src="/Assets/Background_Logo.svg" alt="" />
        

    </div>
  )
}

export default Login
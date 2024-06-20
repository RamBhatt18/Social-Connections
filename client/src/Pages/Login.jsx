/* eslint-disable no-unused-vars */
import React,{useContext, useState} from "react";
import '../assets/css/form.css'
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Components/Validation";
import axios from 'axios'
import {toast}from 'react-toastify'
import { UserContext } from "../App";








const Login = () => {
const [values,setValues]=useState({

email: '',
password:''
})

const{user,setUser}=useContext(UserContext)


//this kinda variable for clinet side errors...
const[errors,setErrors]=useState({})
//this for server side error while posting the data....
const[serverErrors,setServerErrors]=useState([])
const navigate =useNavigate()



///to save the value from input values to state values....
const handleInput =(e)=>{
  setValues({...values,[e.target.name]:e.target.value})
}

/////when we press submit button///////
const handleSubmit =(e)=>{

  ///check for errors.....
e.preventDefault()
const errs= Validation(values)
setErrors(errs)
/////if there was no error///////
//check the below line if it was errs or errors...



if(errs.email === "" && errs.password === "")
{


  ///cerate the user...
axios.post('http://localhost:3000/contactmsyt/login',values).then(res=>{

 if(res.data.success)
  { 

toast.success("Login Successfully",{
  position:"top-right",
  autoClose:5000
})
console.log(res)
localStorage.setItem("token",res.data.token)
setUser(res.data.user)

navigate('/dashboard')

  }

}).catch(err=>{

  if(err.response.data.errors){
    setServerErrors(err.response.data.errors)
  }
else
{
console.log(err)
}


})



}



}






  return (


    /////below code makes the checkbox....
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>


        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control"
            name="email"
            autoComplete="off"
            onChange={handleInput}
          />
          {
//if name is not given properly....
errors.email && <span className="error">{errors.email}</span>
}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            placeholder="********"
            className="form-control"
            name="password"
            onChange={handleInput}
          
          />

{
//if name is not given properly....
errors.password && <span className="error">{errors.password}</span>
}


        </div>


        {
          serverErrors.length > 0 && (
            serverErrors.map((error, index) => (
              <p className="error" key={index}>{error.msg}</p>
            ))
          )
        }







<button className="form-btn">Login</button>

<p> No Account? <Link to="/register">Register</Link></p>





      </form>
    </div>
  );
};

export default Login;

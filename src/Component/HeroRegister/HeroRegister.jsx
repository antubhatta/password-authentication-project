import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';



const HeroRegister = () => {
    const [errorRegister,setErrorRegister]=useState('')
    const [success,setSuccess]=useState('')
    const [showPassword,setShowPassword]=useState(false)
  const handleRegister=e=>{
    e.preventDefault()
    const email= e.target.email.value 
    const password=e.target.password.value 
    console.log(email,password)

    // reset
    setErrorRegister('')
    setSuccess('')
    if(password.length<6){
        setErrorRegister('password must fullfill the 6 character')
        return;
    }
    if(!/[A-Z]/.test(password)){
        setErrorRegister('password at least fill up the one uppercase letter')
        return;
    }
    createUserWithEmailAndPassword(auth,email,password)
    .then(result=>{
        console.log(result.user)
        setSuccess('successfully the user added')
    })
    .catch(error=>{
        console.error(error)
        setErrorRegister(error.message)
    })
  }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" required name="email" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relativd">
          <input type={showPassword ? 'text' : 'password'} required name="password" placeholder="password" className="input input-bordered w-full" /><span className="absolute mt-4 right-10" onClick={()=>{setShowPassword(!showPassword)}}>
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye> }
             </span>
          </div>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
      
    </div>
  </div>
</div>
{
        errorRegister  && <p className="text-red-600"> {errorRegister}</p>
      }
      {
        success && <p className="text-green-600">{success}</p>
      }
        </div>
    );
    
};

export default HeroRegister;
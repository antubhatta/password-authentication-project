import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";



const Login = () => {
    const [errorMessage,setErrorMessage]=useState('')
    const [success,setSuccess]=useState('')
    const emailRef=useRef(null)
   const handlesLogIn=e=>{
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    console.log(email,password)

    setErrorMessage('')
    setSuccess('')
    // add validation
    signInWithEmailAndPassword(auth,email,password)
    .then((result)=>{
        console.log(result.user)
        if(result.user.emailVerified){
            setSuccess('User successfully added')
        }
        else{
            alert('please verified your email address')
        }
        
    })
    .catch((error)=>{
        console.log(error)
        setErrorMessage(error.message)
    })
   }
   const handleForgoPassword=()=>{
    const email=emailRef.current.value
   if(!email){
    console.log('please provide an email',emailRef.current.value)
   }
   else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
    console.log('please write a valid email')
   }
//    send validation email
sendPasswordResetEmail(auth,email)
.then(()=>{
    alert("please check your email")
})
.catch((error)=>{
    console.log(error)
})

   }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handlesLogIn} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" ref={emailRef} placeholder="email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" required />
          <label className="label">
            <a onClick={handleForgoPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
  
</div>
<p className=" text-xl font-bold">New to this website? Please <Link to="/register">Register</Link></p>
        {
            success && <p className="text-green-600">{success}</p>
        }
        {
            errorMessage && <p className="text-red-600">{errorMessage}</p>
        }
       
        </div>
    );
};

export default Login;
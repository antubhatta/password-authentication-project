import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { updateProfile } from "firebase/auth";


const Register = () => {
    const [registerError,setRegisterError]=useState('')
    const [success,setSuccess]=useState('')
    const [showPassword,setShowPassword]=useState(false)

    const handleRegister=e=>{
        e.preventDefault()
        const name=e.target.name.value
        const email=e.target.email.value 
        const password=e.target.password.value 
        const accepted= e.target.terms.checked 

        console.log(email,password,accepted,name)

         //reset error
         setRegisterError('')
         setSuccess('')
        
        if(password.length<6){
            setRegisterError('Password should be at least 6 character or longer')
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('your password must be one character in uppercase')
            return;
        }
        else if(!accepted){
            setRegisterError('please accept our terms and condition')
            return;
        }
       
        // create user
        createUserWithEmailAndPassword(auth,email,password)
        .then((result)=>{
            const loggedInUser=result.user
            console.log(loggedInUser)
            setSuccess('user created successfully')

            // Updated profile
            updateProfile(result.user,{
                displayName:name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(()=>{
                console.log("profile updated successfully");

            })
            .catch((error)=>{
                console.log(error)
            })

            // send verification email
        sendEmailVerification(result.user)
        .then(()=>{
            alert("please check your email and verify your account")
        })

        })
        .catch((error)=>{
            console.log(error)
            setRegisterError(error.message)
        })
    }
    return (
        <div className="">
            <div className="mx-auto relative md: w-1/2">
            <h3 className="text-3xl mt-4 mb-8"> Please Register</h3>
            <form onSubmit={handleRegister}>
                <input className="mb-4 w-full py-2 px-4  border rounded-lg" required placeholder="Email Address" type="name" name="name" /><br></br>
                <input className="mb-4 w-full py-2 px-4  border rounded-lg" required placeholder="Email Address" type="email" name="email" /><br></br>
                <div className="relative">
                <input className="mb-4 w-full py-2 px-4 border rounded-lg"
                 required placeholder="Password" 
                 type={showPassword ? "text" :"password" }
                 name="password"/><span className="mt-3 absolute right-2" onClick={()=>setShowPassword(!showPassword)}>
                    {
                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                    }
                    </span><br/>
                </div>
                <br></br>
               <div className="mb-3">
               <input type="checkbox" name="terms" id="terms"/>
                <label className="ml-2" htmlFor="terms">Accept our <a>Terms and condition</a></label><br></br>
               </div>
                <input className="mb-4 w-full py-2 px-4 btn btn-secondary" type="submit" value="Submit" name="" />
            </form>
            <p>Alreadey have an account? <Link to="/login">Login</Link></p>
            {
                registerError && <p className="text-red-600">{registerError}</p>
            }
            {
                success && <p className="text-green-600">{success}</p>
            }
            </div>
        </div>
    );
};

export default Register;
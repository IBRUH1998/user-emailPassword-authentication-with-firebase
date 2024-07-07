import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import auth from '../../../Firebase-config/Firebase.config'
import { useRef, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Login = () => {
  const [registerError, setRegisterError] = useState(' ')
  const [success, setSucces] = useState('')
  const [showPassowrd, setShowPassword] = useState(false)
  const emailRef = useRef('null')

  const loginHandler = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    console.log(email, password)

    // reset error
    setRegisterError('')
    setSucces('')

    //sign in user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user)
       if(result.user.emailVerified){
        setSucces('Successfully login')
       }
       else{
        alert('please varify your email')
       }
      })

      .catch((error) => {
        console.error(error)
        setRegisterError(error.message)
      })
  }

  const handlePassword = () =>{
    const email = emailRef.current.value 
    if(!email){
      console.log("send reset email",emailRef.current.value)
      return 
    }
    else if( !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      console.log('please write a valid email')
      return
    }
    
// send validation
sendPasswordResetEmail(auth, email)
  .then(() => {
    alert('PLEASE CHECK YOUR EMAIL')
    
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode)
   
  });


  }


  return (
    <div className="hero  min-h-fit">
      <div className="hero-content flex-col lg:flex-row-reverse">
       
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={loginHandler} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                ref={emailRef}
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassowrd ? 'text' : 'password'}
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <span
                className="absolute ml-2 left-56 top-14"
                onClick={() => {
                  setShowPassword(!showPassowrd)
                }}
              >
                {!showPassowrd ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
              <label className="label">
                <a onClick={handlePassword} href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {registerError && <p className="text-red-600">{registerError}</p>}
          {success && <p className="text-green-700">{success}</p>}
          <p>New to this website? Please <Link to="/registration">Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login

import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import auth from '../../../Firebase-config/Firebase.config'
import { useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Registration = () => {
  const [registerError, setRegisterError] = useState(' ')
  const [success, setSucces] = useState('')
  const [showPassowrd, setShowPassword] = useState(false)

  const handleRegister = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const accepted = e.target.terms.checked
    console.log(name,email, password, accepted)

    // reset error
    setRegisterError('')
    setSucces('')

    if (password.length < 6) {
      setRegisterError(
        'Password should be at least 6 characters (auth/weak-password).',
      )
      return
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError('You password should have at least one Uppercase')
      return
    } else if (!accepted) {
      setRegisterError('accept our terms and conditions')
      return
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user)
        setSucces('Successfully register')


        // update profile
        updateProfile(auth.currentUser, {
          displayName: name,
           photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => {
          console.log("profile updated")
        }).catch((error) => {
          console.log(error)
        })

        // email verification
        sendEmailVerification(auth.currentUser)
        .then(() => {
          alert("Please verify your email")
        })
      })

      .catch((error) => {
        console.error(error)
        setRegisterError(error.message)
      })
  }

  return (
    <div className=" bg-base-200 min-h-fit">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
          If you need help or have any questions, please contact our support team  at Email or phone.
          </p>
          <span>Email: iamibruh@gmail.com</span>
          <p>Phone:01850555875</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
            <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                name="name"
                placeholder="Your name"
                className="input input-bordered"
                required
              />

              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
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
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <span
                className="absolute ml-2 left-56 top-14"
                onClick={() => setShowPassword(!showPassowrd)}
              >
                {!showPassowrd ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
            </div>
            <div>
              <input className="mr-2" type="checkbox" id="terms" name="terms" />
              <label htmlFor="terms">Accept terms and conditions</label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          {registerError && <p className="text-red-600">{registerError}</p>}
          {success && <p className="text-green-700">{success}</p>}

          <p>Already have an account? Please <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Registration

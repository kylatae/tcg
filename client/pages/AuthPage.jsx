import { useState, useEffect } from "react"
import AuthSignup from "../components/AuthSignup"
import AuthLogin from "../components/AuthLogin"


export default function AuthPage(){


  return (
    <div className="d-flex gap-5">
      <div>
        <AuthSignup usage="signup" />
      </div>

      <div>
        <AuthLogin usage="login" />
      </div>
    </div>
  )
}
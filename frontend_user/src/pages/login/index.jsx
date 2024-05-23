// import React from "react"
import "./index.css"
import { useNavigate } from "react-router-dom"
import back from "../../assets/images/my-account.jpg"
import axios from '../../utils/request/request'

export const Login = () => {
  const navi = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    // axios.post('/login', )
    navi('/home')
  }
  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>用户名</span>
            <input type='text' required />
            <span>密码</span>
            <input type='password' required />
            <button className='button'>登录</button>
          </form>
        </div>
      </section>
    </>
  )
}

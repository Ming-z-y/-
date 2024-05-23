// import React from "react"
import "./index.css"
import { useNavigate } from "react-router-dom"
import back from "../../assets/images/my-account.jpg"
import axios from '../../utils/request/request'
import { useState } from "react"
import { message } from "antd"

export const Login = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navi = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (account != 'user' && password != 'user') {
      message.info('用户名或密码错误')
    } else navi('/home')
    // axios.post('/login', )
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
            <input type='text' required value={account} onChange={(e) => {
              setAccount(e.target.value)
            }} />
            <span>密码</span>
            <input type='password' required value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />
            <button className='button'>登录</button>
          </form>
        </div>
      </section>
    </>
  )
}

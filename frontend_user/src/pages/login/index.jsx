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
  const [raccount, setRaccount] = useState('');
  const [rpwd, setRpwd] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navi = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (account == '' || password == '') {
      return message.info('请完整输入');
    }
    const res = (await axios.post("/login", { account, password, channel: "user" })).data;
    if (res.status == 0) {
      message.success('欢迎回来');
      localStorage.setItem('uid', res?.data?.uid);
      localStorage.setItem('account', res?.data?.account);
      localStorage.setItem('money', res?.data?.money);
      navi('/home');
    } else {
      message.info('用户名或密码错误');
    }
  }

  const register = async (e) => {
    e.preventDefault()
    if (raccount == '' || rpwd == '') {
      return message.info('请完整输入');
    }
    if (rpwd.length < 6) {
      return message.info('密码不能太短')
    }
    const res = (await axios.post("/register", { account: raccount, password: rpwd })).data;
    if (res.status == 0) {
      localStorage.setItem('uid', res?.data?.uid);
      localStorage.setItem('account', res?.data?.account);
      localStorage.setItem('money', res?.data?.money)
      message.success('注册成功，已登录');
      navi('/home')
    } else {
      message.info(res?.msg || "注册失败");
    }
  }

  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Login</h3>
              <h1>网上超市系统</h1>
            </div>
          </div>

          {
            isLogin ? <form onSubmit={() => { return false }}>
              <span>用户名</span>
              <input type='text' required value={account} onChange={(e) => {
                setAccount(e.target.value)
              }} />
              <span>密码</span>
              <input type='password' required value={password} onChange={(e) => {
                setPassword(e.target.value)
              }} />
              <div style={{ textAlign: "right" }}>
                <button style={{ marginRight: 10 }} type="button" className='button' onClick={() => {
                  setIsLogin(false);
                }} >注册</button>
                <button className='button' type="submit" onClick={handleSubmit}>登录</button>
              </div>
            </form> : <form onSubmit={() => { return false }}>
              <span>用户名</span>
              <input type='text' required value={raccount} onChange={(e) => {
                setRaccount(e.target.value)
              }} />
              <span>密码</span>
              <input type='password' required value={rpwd} onChange={(e) => {
                setRpwd(e.target.value)
              }} />
              <button className='button' onClick={register}>注册并登录</button>

            </form>
          }

        </div>
      </section>
    </>
  )
}

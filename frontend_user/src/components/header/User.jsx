import { useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const User = ({ money }) => {
  const user = true
  const navi = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false)

  const close = () => {
    setProfileOpen(null)
  }

  const logoutHandler = () => {
    localStorage.removeItem('uid');
    navi("/");
  }

  return (
    <>
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png' alt='' />
            </button>

            {profileOpen && (
              <div className='openProfile boxItems' onClick={() => { }}>
                <div className='image'>
                  <Link to='/account'>
                    <div className='img'>
                      <img src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png' alt='' />
                    </div>
                  </Link>
                  <div className='text'>
                    <h4>{localStorage.getItem('account')}</h4>
                    <label htmlFor=''>Los Angeles,CA</label>
                  </div>
                </div>
                <div>
                  <button className='box'>
                    <IoSettingsOutline className='icon' />
                    <h4>My Account: ${money}</h4>
                  </button>
                </div>
                <button className='box'>
                  <BsBagCheck className='icon' />
                  <h4>My Order</h4>
                </button>
                <button className='box' onClick={(e) => e.preventDefault()}>
                  <GrHelp className='icon' />
                  <h4>My address</h4>
                </button>
                <button className='box'>
                  <AiOutlineHeart className='icon' />
                  <h4>Wishlist</h4>
                </button>
                <button className='box' onClick={logoutHandler}>
                  <BiLogOut className='icon' />
                  <h4>Log Out</h4>
                </button>
              </div>
            )}
          </>
        ) : (
          <button>My Account</button>
        )}
      </div>
    </>
  )
}

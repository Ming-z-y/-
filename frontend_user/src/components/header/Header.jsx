import Medicine from "../../assets/images/Medicine.svg"
import "./header.css"
import { AiOutlineSearch } from "react-icons/ai"
import { Card } from "./Card"
import { User } from "./User"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export const Header = ({ setMoney, money, selectGoods, setIsSearch, setSearch, setselectGoods, setCategory }) => {
  const onkeyDown = (e) => {
    if (e.key == "Enter") {
      setIsSearch(true);
      setSearch(e.target.value);
      setCategory('')
      e.target.value = '';
    }
  }

  return (
    <>
      <header className='header' style={{
        position: "sticky",
        top: 0,
        left: 0
      }}>
        <div className='scontainer flex'>
          <div className='logo'>
            <Link to='/home'>
              <img src={Medicine} alt='Medicine' />
            </Link>
          </div>
          <div className='search flex'>
            <AiOutlineSearch className='searchIcon' />
            <input type='text' placeholder='Search...' onKeyDown={onkeyDown} />
          </div>
          <div className='account flexCenter'>
            <Card setMoney={setMoney} setselectGoods={setselectGoods} selectGoods={selectGoods} />
            <User money={money} />
          </div>
        </div>
      </header>
    </>
  )
}

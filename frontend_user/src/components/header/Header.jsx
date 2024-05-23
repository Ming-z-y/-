import Medicine from "../../assets/images/Medicine.svg"
import "./header.css"
import { AiOutlineSearch } from "react-icons/ai"
import { Card } from "./Card"
import { User } from "./User"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export const Header = ({ selectGoods, setIsSearch, setSearch, setselectGoods }) => {
  const onkeyDown = (e) => {
    if (e.key == "Enter") {
      setIsSearch(true);
      setSearch(e.target.value);
    }
  }

  return (
    <>
      <header className='header'>
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
            <Card setselectGoods={setselectGoods} selectGoods={selectGoods} />
            <User />
          </div>
        </div>
      </header>
    </>
  )
}

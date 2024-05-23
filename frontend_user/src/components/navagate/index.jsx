import { useEffect, useState } from 'react'
import './index.css'
import axios from '../../utils/request/request';

// eslint-disable-next-line react/prop-types
export const Navagate = ({ setIsSearch, setSearch, setSeCategory }) => {
  const [category, setCategory] = useState([])

  useEffect(() => {
    (async () => {
      const res = await axios.get("/goods/category")
      setCategory(['全部', ...res.data.resdata])
    })()
  }, [])

  const clickNavi = async (navi_name) => {
    setIsSearch(true);
    setSearch('')
    setSeCategory(navi_name)
  }

  return (
    <>
      <div className="cover">
        <div className='inner_cover'>
          {category.map((item, idx) => (<div style={{ cursor: "pointer" }} title={item} onClick={() => clickNavi(item)} key={idx} className='navi_item'>
            {item}
          </div>))}
        </div>
      </div>
    </>
  )
}

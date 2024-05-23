import { useEffect, useState } from "react"
import "./index.css"
import { ProductCart } from "./ProductCart"
import axios from '../../utils/request/request'

// eslint-disable-next-line react/prop-types
export const Product = ({ isSearch, search, setselectGoods, selectGoods }) => {
  const [goods, setGoods] = useState([]);
  const [isElse, setIsElse] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/goods?keyword=${search}`);
      setGoods(res.data || [])
      if (res.data.length != 0) setIsElse(true);
      else setIsElse(false);
    })()
  }, [isSearch, search])

  return (
    <>
      <section className='product'>
        <div className='container grid3'>
          {isElse ? goods.map((item) => (
            <ProductCart goods={goods} selectGoods={selectGoods} setselectGoods={setselectGoods} key={item.id} id={item.id} image={item.image} name={item.name} price={item.price} />
          )) : <>暂无此商品</>}
        </div>
      </section>
    </>
  )
}

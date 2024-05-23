import { useState } from "react"
import { Product } from "../../components"
import { Header } from "../../components"

export const Home = () => {
  const [selectGoods, setselectGoods] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  return (
    <>
      {/* <Slider /> */}
      {/* <Order /> */}
      {/* <Category /> */}
      <Header selectGoods={selectGoods} setselectGoods={setselectGoods} setIsSearch={setIsSearch} setSearch={setSearch} />
      <Product isSearch={isSearch} selectGoods={selectGoods} search={search} setselectGoods={setselectGoods} />
    </>
  )
}

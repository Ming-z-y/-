import { useState } from "react"
import { Product, Header, Navagate } from "../../components"

export const Home = () => {
  const [selectGoods, setselectGoods] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  return (
    <>
      <Header setCategory={setCategory} selectGoods={selectGoods} setselectGoods={setselectGoods} setIsSearch={setIsSearch} setSearch={setSearch} />
      <Navagate setSearch={setSearch} setIsSearch={setIsSearch} setSeCategory={setCategory} />
      <Product category={category} isSearch={isSearch} selectGoods={selectGoods} search={search} setselectGoods={setselectGoods} />
    </>
  )
}

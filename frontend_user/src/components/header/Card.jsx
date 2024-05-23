import { useEffect, useState } from "react"
import { BiShoppingBag } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
// eslint-disable-next-line no-unused-vars
import { CartItems } from "./CartItems"

// eslint-disable-next-line react/prop-types
export const Card = ({ selectGoods, setselectGoods }) => {
  const [cardOpen, setCardOpen] = useState(false)

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalP = 0;
    // eslint-disable-next-line react/prop-types
    selectGoods.forEach(item => {
      totalP += item.price * item.number;
    })
    setTotalPrice(totalP)
  }, [selectGoods])

  const closeCard = () => {
    setCardOpen(null)
  }

  const payTheBill = () => {
    console.log(selectGoods)
  }

  return (
    <>
      <div className='card' onClick={() => setCardOpen(!cardOpen)}>
        <BiShoppingBag className='cardIcon' />
        {/* eslint-disable-next-line react/prop-types */}
        <span className='flexCenter'>{selectGoods.length}</span>
      </div>
      <div className={cardOpen ? "overlay" : "nonoverlay"}></div>

      <div className={cardOpen ? "cartItem" : "cardhide"}>
        <div className='title flex'>
          <h2>购物车</h2>
          <button onClick={closeCard}>
            <AiOutlineClose className='icon' />
          </button>
        </div>
        <div style={{ height: 500, overflow: "scroll" }}>
          {/* eslint-disable-next-line react/prop-types */}
          {selectGoods.map((item) => (<CartItems key={item.id} selectGoods={selectGoods} setTotalPrice={setTotalPrice} setselectGoods={setselectGoods} id={item.id} image={item.image} name={item.name} price={item.price} quantity={item.number} />))}
        </div>
        <div className='checkOut'>
          <button onClick={payTheBill}>
            <span>Priceed To Checkout</span>
            <label htmlFor=''>${totalPrice}</label>
          </button>
        </div>
      </div>
    </>
  )
}

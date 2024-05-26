import { useEffect, useState } from "react"
import { BiShoppingBag } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
// eslint-disable-next-line no-unused-vars
import { CartItems } from "./CartItems"
import axios from "../../utils/request/request"
import { message } from "antd"

// eslint-disable-next-line react/prop-types
export const Card = ({ setMoney, selectGoods, setselectGoods }) => {
  const [cardOpen, setCardOpen] = useState(false)

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    (async () => {
      const res = (await axios.post("/goods/getcart", {
        uid: localStorage.getItem('uid')
      })).data;
      if (res.status == 0) {
        setselectGoods(res.data);
      }
    })()
  }, [])

  useEffect(() => {
    let totalP = 0;
    // eslint-disable-next-line react/prop-types
    selectGoods.forEach(item => {
      totalP += item.price * item.number;
    })
    setTotalPrice(totalP)
  }, [selectGoods])

  const closeCard = () => {
    setCardOpen(false)
  }

  const payTheBill = async () => {
    if (localStorage.getItem('money') < totalPrice) return message.info('余额不足，请充值');
    const res = (await axios.post('/goods/buy', {
      uid: localStorage.getItem('uid'),
      total_price: totalPrice,
      selectGoods
    })).data;
    if (res.status == 0) {
      setselectGoods([]);
      message.success(res.msg);
      setMoney(e => e - totalPrice);
      localStorage.setItem('money', localStorage.getItem('money') - totalPrice);
    }
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

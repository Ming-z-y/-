import { message } from "antd";
import { useEffect, useState } from "react"
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"

// eslint-disable-next-line react/prop-types
export const CartItems = ({ id, image, name, price, selectGoods, setTotalPrice, setselectGoods }) => {
  const [number, setNumber] = useState(1);
  const [idx, setIdx] = useState(0);
  const [totalNumber, setTotalNumber] = useState(price);

  useEffect(() => {
    let index = 0;
    // eslint-disable-next-line react/prop-types
    selectGoods.forEach((item, ind) => {
      if (item.id == id) index = ind;
    })
    setIdx(index);
  }, []);

  const incCartitems = () => {
    // eslint-disable-next-line react/prop-types
    if (number == selectGoods[idx].total_number - selectGoods[idx].buy_number) {
      message.info('没有多余库存了')
      return;
    }
    setNumber(e => e + 1);
    setselectGoods(e => {
      let data = e;
      data[idx].number++;
      return data;
    })
    setTotalNumber(e => e + price);
    setTotalPrice(e => e + price);
  }

  const descCartitems = () => {
    if (number >= 1) {
      setNumber(e => e - 1);
      setTotalNumber(e => e - price);
      setselectGoods(e => {
        let data = e;
        data[idx].number--;
        if (data[idx].number == 0) {
          message.info('已移除购物车')
          return data.filter(item => item.id != id);
        }
        return data;
      })
      setTotalPrice(e => e - price)
    }
  }

  return (
    <>
      <div className='cardList' key={id}>
        <div className='cartContent'>
          <div className='img'>
            <img src={image} alt='' />
            <button className='remove flexCenter'>
              <AiOutlineClose />
            </button>
          </div>
          <div className='details'>
            <p>{name}</p>
            <label htmlFor=''>Unit Price ${price}</label>

            <div className='price'>
              <div className='qty flexCenter'>
                <button className='minus' onClick={descCartitems}>
                  <AiOutlineMinus />
                </button>
                <button className='num'>{number}</button>
                <button className='plus' onClick={incCartitems}>
                  <AiOutlinePlus />
                </button>
              </div>
              <div className='priceTitle'>${totalNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

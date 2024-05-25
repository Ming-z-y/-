import { message } from "antd";
import { useEffect, useState } from "react"
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import axios from '../../utils/request/request'

// eslint-disable-next-line react/prop-types
export const CartItems = ({ id, image, name, price, selectGoods, setTotalPrice, quantity, setselectGoods }) => {
  const [number, setNumber] = useState(quantity);
  const [idx, setIdx] = useState(0);
  const [totalNumber, setTotalNumber] = useState(price * quantity);

  useEffect(() => {
    let index = 0;
    // eslint-disable-next-line react/prop-types
    selectGoods.forEach((item, ind) => {
      if (item.id == id) index = ind;
    })
    setIdx(index);
  }, [selectGoods, setselectGoods, id]);

  const incCartitems = async () => {
    // eslint-disable-next-line react/prop-types
    if (number == selectGoods[idx].total_number - selectGoods[idx].buy_number) {
      message.info('没有多余库存了')
      return;
    }
    const res = (await axios.post("/goods/add", {
      uid: localStorage.getItem('uid'),
      gid: id,
      g_number: 1
    })).data;
    if (res.status == 0) {
      setNumber(e => e + 1);
      setselectGoods(e => {
        let data = e;
        data[idx].number++;
        return data;
      })
      setTotalNumber(e => e + price);
      setTotalPrice(e => e + price);
    }
  }

  const descCartitems = async () => {
    if (number >= 1) {
      const res = (await axios.post("/goods/add", {
        uid: localStorage.getItem('uid'),
        gid: id,
        g_number: -1
      })).data;
      if (res.status == 0) {
        setNumber(e => e - 1);
        setTotalNumber(e => e - price);
        setselectGoods(e => {
          let data = e;
          data[idx].number && data[idx].number--;
          if (data[idx].number == 0) {
            message.info('已移除购物车')
            return data.filter(item => item.id != id);
          }
          return data;
        })
        setTotalPrice(e => e - price)
      }
    }
  }

  const removeitem = async () => {
    const res = (await (axios.post("/goods/deletecart", { uid: localStorage.getItem('uid'), gid: id }))).data;
    if (res.status == 0) {
      setselectGoods(e => {
        let data = e;
        data[idx].number = 0;
        return data.filter(item => item.id != id);
      })
      setTotalPrice(e => e - price * quantity)
      message.info('已移除购物车');
    }
  }

  return (
    <>
      <div className='cardList' key={id}>
        <div className='cartContent'>
          <div className='img' onClick={() => { removeitem() }}>
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

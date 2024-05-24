import { AiOutlinePlusCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { message } from "antd";
import axios from '../../utils/request/request'

export const ProductCart = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, name, price, image, setselectGoods, goods, selectGoods } = props;
  const addToCart = async (id) => {
    // eslint-disable-next-line react/prop-types
    let hasSelect = false;
    // eslint-disable-next-line react/prop-types
    selectGoods.forEach(item => {
      if (item.id == id) hasSelect = true;
    })
    if (hasSelect) {
      message.info('已经添加过购物车')
      return;
    }

    // eslint-disable-next-line react/prop-types
    const select = goods.filter((item) => item.id == id)[0];
    const res = (await axios.post("/goods/add", {
      uid: localStorage.getItem('uid'),
      gid: id,
      g_number: 1
    })).data;
    if (res.status == 0) {
      message.success('添加购物车成功')
      setselectGoods(e => ([
        ...e, { ...select, number: 1 }
      ]))
    }
  }

  return (
    <>
      <div className='box boxItems' id='product'>
        <div className='img'>
          <Link>
            <img src={image} alt='cover' />
          </Link>
        </div>
        <div className='details'>
          <h3>${price}</h3>
          <p>{name}</p>
          <button onClick={() => { addToCart(id) }}>
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>
    </>
  )
}

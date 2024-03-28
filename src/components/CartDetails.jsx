import React, { useState } from 'react'
import './cartStyle.css'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeToCart,emptyCartItem,removeSingleItems} from '../Redux/cartSlice';
import { useEffect } from 'react';
import Swal from 'sweetalert2'



function CartDetails() {
    const { carts } = useSelector(state => state.allCart)
    const[totalPrice,setTotalPrice]=useState(0);
    const[totalquantity,setTotalQuantity]=useState(0);
    const dispatch = useDispatch();

    //add to cart
    const handleIncrement = (e) => {
        dispatch(addToCart(e));
    }

    //remove to cart
    const handleDecrement = (e) => {
        dispatch(removeToCart(e));
        Swal.fire({
            title: "Item Remove From Your Cart",
            icon: "success"
          });
    }

    //empty cart
    const emptyCart = ()=>
    {
        dispatch(emptyCartItem());
        Swal.fire({
            title: "Your Cart is Empty",
            icon: "success"
          });
    }

    //remove single item
    const handleSingleDecrement = (e)=>
    {
           dispatch(removeSingleItems(e))
    }

    //calculate total price
    const total = () =>
    {
        let totPrice = 0;
        carts.map((ele)=>
        {
            totPrice = ele.price * ele.qnty + totPrice
        })
        setTotalPrice(totPrice);
    }

   useEffect(() => {
         total();
     }
   ,[total])

   //calculate total quantity

   const countAllQuantity = () =>
   {
      let totalQuantity = 0;

      carts.map((ele)=>{
         totalQuantity = ele.qnty +totalQuantity;
      })
      setTotalQuantity(totalQuantity);
   }

   useEffect(() => {
    countAllQuantity();
}
,[countAllQuantity])
   

    return (
        <>
            <div className='row justify-content-center m-0'>
                <div className='col-md-8 mt-5 mb-5 cardsdetails'>
                    <div className="card">
                        <div className="card-header bg-dark p-3">
                            <div className='card-header-flex'>
                                <h5 className='text-white m-0'>Cart Calculation{carts.length >0 ? `(${carts.length})`:""}</h5>
                                {
                                    carts.length > 0 ? <button className='btn btn-danger mt-0 btn-sm' onClick={()=>emptyCart()}
                                    ><i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span></button>
                                        : ""
                                }
                            </div>

                        </div>
                        <div className="card-body p-0">
                            {
                                carts.length === 0 ? <table className='table cart-table mb-0'>
                                    <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className='cart-empty'>
                                                    <i className='fa fa-shopping-cart'></i>
                                                    <p>Your Cart Is Empty</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> :
                                    <table className='table cart-table mb-0 table-responsive-sm'>
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className='text-right'> <span id="amount" className='amount'>Total Amount</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                carts.map((data) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    <button className='prdct-delete' onClick={()=>handleDecrement(data.id)}
                                                                    ><i className='fa fa-trash-alt'></i></button>
                                                                </td>
                                                                <td><div className='product-img'><img src={data.imgdata} alt="" /></div></td>
                                                                <td><div className='product-name'><p>{data.dish}</p></div></td>
                                                                <td>{data.price}</td>
                                                                <td>
                                                                    <div className="prdct-qty-container">
                                                                        <button className='prdct-qty-btn' type='button'onClick={data.qnty<=1?()=>handleDecrement(data.id):()=>handleSingleDecrement(data)} >
                                                                            <i className='fa fa-minus'></i>
                                                                        </button>
                                                                        <input type="text" className='qty-input-box' value={data.qnty} disabled name="" id="" />
                                                                        <button className='prdct-qty-btn' type='button' onClick={()=>handleIncrement(data)}>
                                                                            <i className='fa fa-plus'></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className='text-right'>{data.price * data.qnty}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th colSpan={3}></th>
                                                <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalquantity}</span></th>
                                                <th className='text-right'>Total<span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalPrice}</span></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartDetails 
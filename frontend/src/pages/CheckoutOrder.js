import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import {Row,Col} from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'js-cookie'
import Payment_method from '../customComponents/payment_method'

import '../css/checkout.css'

export default function CheckoutOrder() {
  //states
  const [User,updateUser] = useState({
    email: "",
    username: "",
    profile:{
      city: "",
      country: "",
      name: "",
      surname: "",
      post_code: "",
      street: "",
      buildingNumber:null,
      houseNumber:null,
    }
  })
  const [Cart,updateCart] = useState([])
  const [ItemPrice,updateItemPrice] = useState(0)
  const [PaymentMethod,updatePaymentMethod] = useState('card')
  const [FinalPrice,updateFinalPrice] = useState(0)
  const [delivery_pay,updateDelivery] = useState(false)
  const [moveNext,updateMove] = useState(false)

  let getData = () => { // get user data from the database
    const headers = {
      'content-type':'application/json',
      'Authorization': `Bearer ${Cookies.get('access')}`,
    }
    axios.get('http://127.0.0.1:8000/api/users/self/',{headers:headers})
    .then((response)=>{
      console.log(response)
      updateUser(response.data)
    })
  }

  let getCartItems = () => {
    const headers = {
      'content-type':'application/json',
      'Authorization': `Bearer ${Cookies.get('access')}`,
    }
  axios.get(`http://127.0.0.1:8000/api/products/cart/`,{headers:headers})
  .then((response)=>{
      console.log(response)
      updateCart(response.data.items)
      updateItemPrice(response.data.price_of_items)
      updateFinalPrice(response.data.price_of_items)
  })
  }

  let MakeOrder = () =>{
    let products = []
    for (const item of Cart){
      products.push(item.id)
    }

    const headers = {
      'content-type':'application/json',
      'Authorization': `Bearer ${Cookies.get('access')}`,
    }

    const data = {
      "products": products,
      "payment_method": PaymentMethod,
      "full_price": ItemPrice + pay_at_delivery + 6,
      "completed": false
    }
    console.log(data)
    axios.post(`http://127.0.0.1:8000/api/orders/`,data,{headers:headers})
  .then((response)=>{
      updateMove(true)
  })
  .catch(error=>{
    console.log(error)
  })
  }


  let handleChange = (event) => {
    updatePaymentMethod(event.target.value)
  }

  useEffect(()=>{
    getData();
    getCartItems()
  },[])

  let pay_at_delivery = 0
    if (delivery_pay){
      pay_at_delivery = 9
    }

  if(moveNext){
    return <Navigate to={{
      pathname: "/info",
      search: "?mode=afterOrder",
      state: { }
    }}/>
  }
  return (
    <div>
      
        <Row id='grid1'>
        <h2>Płatność</h2>
            <Col md={3}></Col>
            
            <Col md={6} className='delivery'>
                <h3>Adres Dostawy</h3>
                <h4>{User.profile.name} {User.profile.surname}</h4>
                <h4>{User.profile.country}, {User.profile.city}, {User.profile.post_code}</h4>
                <h4>{User.profile.street} {User.profile.buildingNumber}/{User.profile.houseNumber}</h4>
                <h3>Wybrane Przedmioty</h3>

                {Cart.map((item)=>(
                <div key={item.product.id} className='cart_item'>
                  <h3>{item.product.title}</h3>
                  <p>cena: {item.product.price}zł</p>
                  <p>łącznie: {item.price}zł</p>
                  <img id='img1' src={`http://127.0.0.1:8000/${item.product.image}`}/>
                </div>
              ))}

                <br></br>
                <br></br>
                <h3>Metoda Płatności</h3>
                <br></br>
                <select id='sel-list' onChange={handleChange}>
                  <option  selected value="card">karta płatnicza</option>
                  <option value="blik">blik</option>
                  <option value="at_delivery">za pobraniem</option>
                </select>
                <br></br>
                <br></br>
                <div id='payment'>
                  <Payment_method payment_method={PaymentMethod} updateDelivery={updateDelivery} />
                </div>
                <h3>Podsumowanie</h3>
                <h4>produkty: {ItemPrice + pay_at_delivery}zł</h4>
                <h4>opłata za metode płatności: {pay_at_delivery}zł</h4>
                <h4>opłata za dostawę: 6zł</h4>
                <h4>łącznie: {ItemPrice + pay_at_delivery + 6}zł </h4>
                <button onClick={MakeOrder}>Zapłać</button>
                <br></br>
                <br></br>
            </Col>
      
            <Col md={3}></Col>
            
        </Row>

    </div>
  )
}

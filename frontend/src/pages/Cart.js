import React, { useEffect, useState } from 'react'
import { Col,Row,Container,Modal,Button } from 'react-bootstrap';
import Cookies from 'js-cookie'
import axios from 'axios'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import '../css/cart.css'

export default function Cart() {
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
  const [Quantities,updateQuantities] = useState({})

  let handleChange = (event) => {
    event.preventDefault()
    let tmp = Quantities
    tmp[event.target.name] = event.target.value
    updateQuantities(tmp)
  }

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
  })
  }

  let UpdateCartItems = (event) => {
    
    const headers = {
      'content-type':'application/json',
      'Authorization': `Bearer ${Cookies.get('access')}`,
    }
    let data = {
      products:[],
    }
    for (const item of Cart){
      const id = item.product.id
      data.products.push([id,Quantities[id]])
    }
    axios.post(`http://127.0.0.1:8000/api/products/cart_update/`,data,{headers:headers})
    .then((response)=>{
      console.log(response)
    })
  }
  

  useEffect(()=>{
    getCartItems()
    getData()
  },[])

  //Components
  let Button = () => {
    if(ItemPrice != 0){
      return <button><a href='/checkout'>Zamawiam i płacę</a></button>
    }
    return <div></div>
  }

  return (
    <div>
        <Row id='grid1'>
            <Col md={2}></Col>
            <Col md={5} className="items">
              <h2>Koszyk</h2>
              <form onSubmit={UpdateCartItems}>
                
              {Cart.map((item)=>(
                <div key={item.product.id} className='cart_item'>
                  <h3>{item.product.title} - <input type='number' min={0} name={`${item.product.id}`} onChange={handleChange} defaultValue={item.quantity}
                  ></input> <button><RemoveIcon fontSize='small'></RemoveIcon></button>/<button><AddIcon fontSize='small'></AddIcon></button></h3>
                  <p>cena: {item.product.price}zł</p>
                  <p>łącznie: {item.price}zł</p>
                  <img id='img1' src={`http://127.0.0.1:8000/${item.product.image}`}/>
                </div>
              ))}

              <br></br>
              <br></br>
              <button type='submit'>Zapisz</button>
              </form>
              
            </Col>
            <Col md={1}></Col>
            <Col md={3} >
              <div className='Summary'>
                <h3>Dane do Zamówienia:</h3>
                <br></br>
                <h4>imię: {User.profile.name}</h4>
                <h4>nazwisko: {User.profile.surname}</h4>
                <h4>email: {User.email}</h4>
                <h4>kraj: {User.profile.country}</h4>
                <h4>miasto: {User.profile.city}</h4>
                <h4>kod pocztowy: {User.profile.post_code}</h4>
                <h4>ulica: {User.profile.street}</h4>
                <h4>nr budynku: {User.profile.buildingNumber}</h4>
                <h4>nr mieszkania: {User.profile.houseNumber}</h4>
                <br></br>
                <p>jeżeli chcesz zmienić dane do zamówienia, zrób to przez swój profil!</p>
              </div>
              
              <br></br>
              <div className='Summary'>
                <h3>Podsumowanie zamówienia </h3>
                <p>Suma Częściowa: {ItemPrice} zł</p>
                <Button/>
              </div>
            </Col>
            <Col md={1}></Col>
        </Row>
        <br></br>
        <br></br>

    </div>
  )
}

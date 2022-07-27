import React, { useEffect,useState } from 'react'
import { Col,Row,Container,Modal,Button } from 'react-bootstrap';
import axios from 'axios'
import Cookies from 'js-cookie'
export default function YourOrders() {
  const [Orders,updateOrders] = useState([])

  let GetOrders = () => {
  
    const headers = {
      'content-type':'application/json',
      'Authorization': `Bearer ${Cookies.get('access')}`,
    }
    axios.get('http://127.0.0.1:8000/api/orders/self/',{headers:headers})
    .then(response=>{
      console.log(response)
      updateOrders(response.data.results)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    GetOrders()
  },[])
  return (
    <div>
      <Row id="grid1">
          <Col></Col> 
          <Col>
            <h2>Twoje Zamówienia</h2>
            {Orders.map((item)=>(
              <div key={item.id}>
                <h4>zamówione dnia: {item.submit_date.substr(0,10)} - {item.submit_date.substr(11,8)} </h4>
                <h4>produkty: </h4>
                {item.products.map((CartItem)=>(
                  <div key={CartItem.id}>
                    <p>{CartItem.product.title} x {CartItem.quantity}</p>
                  </div>
                ))}
                <h4>cena:{item.full_price}</h4>
                <br></br>
              </div>
            ))}
          </Col>
          <Col></Col>
      </Row>
    
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Grid, Link,Button} from '@mui/material';
import {Row,Col} from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import StarsRating from 'react-star-rate';

import '../css/productPage.css'

export default function ProductPage(props) {
    const [Product,UpdateProduct] = useState({})
    const [Quantity,UpdateQuantity] = useState(1)
    const [value, setValue] = useState(0);
    const ProductId = useParams().id
    const GetProduct = () => {
        const headers = {
            'content-type':'application/json',
          }
      
          axios.get(`http://127.0.0.1:8000/api/products/${ProductId}/`,{headers:headers})
          .then((response)=>{
              const data = response.data
              UpdateProduct(data)
          })
    }

    const UpdateCart = () =>{
        const headers = {
            'content-type':'application/json',
            'Authorization': `Bearer ${Cookies.get('access')}`,
          }
        const data = {
            product_id:ProductId,
            quantity:Quantity,
        }
        axios.post(`http://127.0.0.1:8000/api/products/cart_add/`,data,{headers:headers})
        .then((response)=>{
            console.log(response)
        })
    }

    const QuantityHelper = (event) =>{
        UpdateQuantity(event.target.value)
    }

    useEffect(()=>{
        GetProduct()
    },[])

  return (
    <div>
        <Row id='container1'>
        
            <Col md={2}></Col>
            <Col md={8} id='middle-column'>
                <h2 id='p_title'>{Product.title}</h2>
                
                <Col md={6} id='image-column'>
                    <img src={`${Product.image}`}></img>
                </Col>
                <Col md={6} id='text-column'>
                    <h3>Rating:  
                        <StarsRating
                        value={value}
                        onChange={value => {
                        setValue(value);
                        }}
                    /> </h3>
                   
                    <p id='desc'>{Product.body}</p>
                    
                    <Row id='button-row'>
                    <h3>Dostępność: {Product.count} sztuk</h3>
                    <h3 id='price'>cena: {Product.price} zł</h3>
                        <button id='btn1' onClick={UpdateCart}>Add to cart</button>
                        <input type='number' min={0} max={100} defaultValue={1} onChange={QuantityHelper}></input>
                    </Row>
                    
                </Col>
                
            </Col>
            <Col md={2}></Col>
        </Row>
    </div>
  )
}

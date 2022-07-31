import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function AdminComp() {
    //states
    const [Orders,updateOrders] = useState([])
    const [Users,updateUsers] = useState([])
    const [Products,updateProducts] = useState([])
    const [Mode,updateMode] = useState('orders')

    //requests
    const headers = {
        'content-type':'application/json',
        'Authorization': `Bearer ${Cookies.get('access')}`,
      }
      
    const get_all_orders = () => {
          axios.get('http://127.0.0.1:8000/api/orders/admin/',{headers:headers})
          .then(response=>{
            updateOrders(response.data.results)
          })
    }
    const get_all_users = () => {
        axios.get('http://127.0.0.1:8000/api/users/',{headers:headers})
          .then(response=>{
            updateUsers(response.data.results)
          })
    }
    const get_all_products = () => {
        axios.get('http://127.0.0.1:8000/api/products/',{headers:headers})
        .then(response=>{
          updateProducts(response.data.results)
        })
    }

    //components
    const OrdersComp = ()=>{
        return (<div>
            <h2>Orders</h2>
        {Orders.map((item)=>(
            <div>
                <h3>Order nr.{item.id}</h3>
                <p>user:{item.user}</p>
                <p>data:{item.submit_date}</p>
            </div>
        )
        )}
        </div>)
    }
    const UsersComp = ()=>{
        return (<div>
            <h2>Users</h2>
            {Users.map(item=>(
                <div>
                    <h3>User nr.{item.id}</h3>
                    <p>{item.profile.name} {item.profile.surname}</p>
                    <p>email:{item.email}</p>
                </div>
            ))}
        </div>)
    }
    const ProductsComp = ()=>{
        return (<div>
            <h2>Products</h2>
            {Products.map(item=>(
                <div>
                    <h3>Product nr.{item.id}</h3>
                    <p>title: {item.title}</p>
                </div>
            ))}
        </div>)
    }
    const FinalComp = ()=>{
        switch(Mode){
            case 'orders':
                return <OrdersComp/>
            case 'users':
                return <UsersComp/>
            case 'products':
                return <ProductsComp/>
            default:
                return <div></div>
        }
    }
    
    //returns
    useEffect(()=>{
        get_all_orders()
        get_all_users()
        get_all_products()
    },[])

  return (
    <div id='grid1'>
        <h1>Admin Page</h1>
        <button onClick={()=>{updateMode('orders')}}>orders</button>
        <button onClick={()=>{updateMode('users')}}>users</button>
        <button onClick={()=>{updateMode('products')}}>products</button>
        <FinalComp/>
    </div>
  )
}

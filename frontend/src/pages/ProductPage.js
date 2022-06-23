import React, { useEffect, useState } from 'react'
import { Grid, Link,Button} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function ProductPage(props) {
    const [Product,UpdateProduct] = useState({})
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
    useEffect(()=>{
        GetProduct()
    },[])

  return (
    <div>
        <Grid container spacing={2} id="grid1"  >
            <Grid item xs={12}>
                <h3>{Product.title}</h3>
                <h3>{Product.body}</h3>
                <h3>{Product.price}</h3>
            </Grid>
        </Grid>
    </div>
  )
}

import React, { Component } from 'react'
import { Grid, Link,Button} from '@mui/material';
import '../css/Shop.css'
import axios from 'axios';
import Cookies from 'js-cookie'

export default class Shop extends Component {
  constructor(props){
    super(props)
    this.state = {
      products:[],
      error:false
    }
  }

  getProducts = () => {
    const headers = {
      'content-type':'application/json',
    }

    axios.get('http://127.0.0.1:8000/api/products/',{headers:headers})
    .then(response=>{
      this.setState({products:response.data.results})
    })
    .catch((error)=>{
      this.setState({error:true})
      console.log(error)
    })
  }
  componentDidMount(){
    this.getProducts()
  }
  

  render() {
    if(this.state.error){
      return (
        <div className='text-center'>
            <Grid container spacing={2} id="grid1"  >
              <Grid item xs={3} id="menuo">
              <div className='menu_el'><a href=''><h2 >Wszystko</h2></a></div>
              <div className='menu_el'><a href=''><h2 >Anime1</h2></a></div>
              <div className='menu_el'><a href=''><h2 >Anime2</h2></a></div>
  
              </Grid>
              <Grid item xs={6} id='produkty_cont' >
                <h2>Error</h2>
                <p>refresh the page</p>
              </Grid>
            </Grid>
        </div>
      )
    }
    return (
      <div className='text-center'>
          <Grid container spacing={2} id="grid1"  >
            <Grid item xs={3} id="menuo">
            <div className='menu_el'><a href=''><h2 >Wszystko</h2></a></div>
            <div className='menu_el'><a href=''><h2 >Anime1</h2></a></div>
            <div className='menu_el'><a href=''><h2 >Anime2</h2></a></div>

            </Grid>
            <Grid item xs={6} id='produkty_cont' >
              <h2>Produkty</h2>
              <br></br>
              <div id='produkty'>
                {this.state.products.map(item=>(
                  <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <img src={`${item.image}`} style={{width:100}}/>
                    <Button><a href={`/products${item.id}`}>order</a></Button>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
      </div>
    )
  }
}

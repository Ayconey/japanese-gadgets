import React, { Component } from 'react'
import { Grid, Link} from '@mui/material';
import '../css/Shop.css'
import axios from 'axios';

export default class Shop extends Component {
  constructor(props){
    super(props)
    this.state = {
      products:[],
      error:false
    }
  }

  getProducts = () => {
    axios.get('http://127.0.0.1:8000/api/products/')
    .then(response=>{
      console.log(response.data.results)
      this.setState({products:response.data.results})
    })
    .catch(()=>{this.setState({error:true})})
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
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
      </div>
    )
  }
}

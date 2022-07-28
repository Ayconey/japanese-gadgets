import React, { useEffect, useState } from 'react'
import '../css/profile.css'
import { Col,Row,Container,Modal,Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie'

export default function Profile() {
  const [PopUp,updatePopUp] = useState(false)
  const [PopUp2,updatePopUp2] = useState(false)
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
  
  useEffect(()=>{
    getData()
  },[])

  let getData = () => {
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

  let updateProfile = (event) => {
    event.preventDefault()
    let data = {
      username:User.username,
      email:User.email,
      profile:{
        'name':event.target.name.value,
        'surname':event.target.surname.value,
        'country':event.target.country.value,
        'city':event.target.city.value,
        'street':event.target.street.value,
        'buildingNumber':event.target.buildingNumber.value,
        'houseNumber':event.target.houseNumber.value,
        'post_code':event.target.post_code.value,
      }
    }
    if(!data.profile['houseNumber']){
      data.profile['houseNumber'] = 0
    }
    if(!data.profile['buildingNumber']){
      data.profile['buildingNumber'] = 0
    }
    const headers = {
      'content-type':'application/json',
      'Authorization': `Bearer ${Cookies.get('access')}`,
    }
    console.log(data)
    axios.put(`http://127.0.0.1:8000/api/users/${User.id}/`,data,{headers:headers})
    .then((response)=>{
      console.log(response)
    })
  }

  let handleDelete = () => {
    const headers = {
      'content-type':'application/json',
      'Authorization': `Bearer ${Cookies.get('access')}`,
    }

    axios.delete(`http://127.0.0.1:8000/api/users/${User.id}/`,{headers:headers})
    .then((response)=>{
      Cookies.remove('access')
      Cookies.remove('refresh')
    })
  }

  let handleChangePassword = (event) => {
    event.preventDefault()
    const headers = {
      'content-type':'application/json',
      'Authorization': `Bearer ${Cookies.get('access')}`,
    }
    const data = {
      'old_password':event.target.old_password.value,
      'new_password1':event.target.password1.value,
      'new_password2':event.target.password2.value,
    }
    console.log(data)
    console.log(headers)
    axios.post('http://127.0.0.1:8000/dj-rest-auth/password/change/',data,{headers:headers})
    .then((response)=>{console.log(response)})
    .catch((error)=>{console.log(error)})
  }

  return (
    <div>
      <Modal show={PopUp2} style={{opacity:1}} id='modalChangePassword' onHide={()=>{updatePopUp2(false)}}>
          <Modal.Header>
            <Modal.Title>Jesteś pewien, że chcesz to zrobić?</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleChangePassword}>
          <Modal.Body>
            <p>Zmień hasło tylko jeśli naprawdę tego potrzebujesz, hasło powinno być:</p>
            <ul>
              <li>- różne od loginu</li>
              <li>- przynajmniej 8 znakowe</li>
              <li>- niepospolite</li>
            </ul>
          <input type='password' placeholder='Old Password' className='input' name='old_password'></input>
          <br></br>
          <br></br>
          <input type='password' placeholder='New Password' className='input' name='password1'></input>
          <br></br>
          <br></br>
          <input type='password' placeholder='Confirm Password' className='input' name='password2'></input>
            
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{updatePopUp2(false)}}>
              Cancel
            </Button>
            <Button variant="primary" type='submit'  >
              Submit
            </Button>
            
          </Modal.Footer>
          </form>
        </Modal>

        <Modal show={PopUp} style={{opacity:1}} id='modalDelete' onHide={()=>{updatePopUp(false)}}>
          <Modal.Header>
            <Modal.Title>Jesteś pewien, że chcesz to zrobić?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Po kliknięciu usuniesz swoje konto, wszystkie twoje informacje zostaną usunięte i nie będzie
            można ich odzyskać.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{updatePopUp(false)}}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

      <Container id='grid1'>
      <Row>
          <Col></Col>
          <Col xs={8}>
            <h2>{User.profile.name} {User.profile.surname}</h2>
            <a href='/your-orders'><button className='btn1'>Moje Zamówienia</button></a>
            <button className='btn1' onClick={()=>{updatePopUp2(true)}}>zmień hasło</button>
          </Col>
          <Col></Col>
        </Row>
      <Row>
      <br></br>
      <br></br>
      <h3>Login:{User.username}</h3>
      <h3>Email:{User.email}</h3>
      <br></br>
      <br></br>
      <h3 id='twoje_dane_header'>Twoje Dane</h3>
      <form onSubmit={updateProfile}>
        <Container id='form1' >
        <Row md={10} >
          <Col md={2}></Col>
          <Col md={4} >
          <input type='text' placeholder='imię' className='input' name='name' defaultValue={User.profile.name}></input>
            <br></br>
            <br></br>
            <br></br>
            <input type='text' placeholder='nazwisko' className='input' name='surname' defaultValue={User.profile.surname}></input>
            <br></br>
            <br></br>
            <br></br>
            <input type='text' placeholder='kraj' className='input' name='country' defaultValue={User.profile.country}></input>
            <br></br>
            <br></br>
            <br></br>
            <input type='text' placeholder='miasto' className='input' name='city' defaultValue={User.profile.city}></input>
            <br></br>
            <br></br>
            <br></br>
            
          </Col>
          <Col md={4}>
          <input type='text' placeholder='ulica' className='input' name='street' defaultValue={User.profile.street}></input>
            <br></br>
            <br></br>
            <br></br>
          <input type='text' placeholder='nr budynku' className='input' name='buildingNumber' defaultValue={User.profile.buildingNumber}></input>
            <br></br>
            <br></br>
            <br></br>
            <input type='text' placeholder='nr mieszkania' className='input' name='houseNumber' defaultValue={User.profile.houseNumber}></input>
            <br></br>
            <br></br>
            <br></br>
            <input type='text' placeholder='kod pocztowy' className='input' name='post_code' defaultValue={User.profile.post_code}></input>
            <br></br>
            <br></br>
            <br></br>
          </Col>
        
        </Row>
        </Container>
        
            <br></br>
            <br></br>
            <button type='submit'>Zapisz</button>
          </form>
      </Row>
      
      </Container>
      <Row>
        <Col md={8}></Col>
        <Col><button onClick={()=>{updatePopUp(true)}} className='btn1'>Usuń Konto</button></Col>
      </Row>
        

    </div>
  )
}

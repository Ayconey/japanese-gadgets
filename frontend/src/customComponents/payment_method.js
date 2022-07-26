import React from 'react'

import '../css/payment_method.css'


export default function Payment_method(props) {
    let p_method = props.payment_method
    switch(p_method){
        case 'card':
            props.updateDelivery(false)
            return (
                <div>
                    <h4>karta</h4>
                    <input type='number' placeholder='nr karty' ></input>
                </div>
            )

        case 'blik':
            props.updateDelivery(false)
            return (
                <div>
                    <h4>blik</h4>
                    <form>
                        <input type='number' id='blik_nr' placeholder='kod blik' ></input>
                        <br></br>
                        <br></br>
                        <button type='submit'>Zatwierdź</button>
                    </form>
                    
                </div>
            )

        case 'at_delivery':
            props.updateDelivery(true)
            return (
                <div>
                    <h4>pobranie</h4>
                    <p><b>dodatkowe 9zł</b></p>
                </div>
            )

        default:
            props.updateDelivery(false)
            return (
                <div>

                </div>
            )
    }
    
}

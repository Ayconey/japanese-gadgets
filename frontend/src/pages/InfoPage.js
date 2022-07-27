import React from 'react'
import { useSearchParams,Navigate } from 'react-router-dom';

export default function InfoPage() {
    const [SearchParams,SetSearchParams] = useSearchParams();
    const mode = SearchParams.get('mode')

    const ThanksAfterOrder = () => {
        return (
        <div>
            <h3>Your order have been received! Thanks for shopping.</h3>
            <p>Additional info about your order were sent to your email.</p>
            <p>you can check all your orders on your profile.</p>
        </div>
        )
    }

    switch(mode){
        case 'afterOrder':
            return <div id='grid1'><ThanksAfterOrder/></div>
            
        default:
            return <div id='grid1'></div>
    }
}

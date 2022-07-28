import React from 'react'
import { useSearchParams,Navigate } from 'react-router-dom';

export default function InfoPage() {
    const [SearchParams,SetSearchParams] = useSearchParams();
    const mode = SearchParams.get('mode')

    const ThanksAfterOrder = () => {
        return (
        <div>
            <h3>Twoje zamówienie zostało złożone. Dzięki za zakupy!</h3>
            <p>Dodatkowe informacje wyślemy ci na twój email.</p>
            <p>Możesz sprawdzić wszystkie swoje zamówienia na stronie profilu.</p>
        </div>
        )
    }

    const LoginFirst = () => {
        return (
            <div>
                <h3>Musisz się najpierw zalogować!</h3>
                <p>Lub jeśli nie masz konta, zarejestruj się, aby korzystać z funkcji naszej strony.</p>
            </div>
        )
    }

    switch(mode){
        case 'afterOrder':
            return <div id='grid1'><ThanksAfterOrder/></div>
        case 'loginFirst':
            return <div id='grid1'><LoginFirst/></div>
        default:
            return <div id='grid1'></div>
    }
}

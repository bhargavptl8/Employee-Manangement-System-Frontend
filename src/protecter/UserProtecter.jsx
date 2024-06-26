import React, { useEffect, useState } from 'react'

import Loading from '../components/Loading';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


const UserProtecter = (props) => {

    let history = useHistory();

    let [token, setToken] = useState(null)

    useEffect(() => {

        let userToken = localStorage.getItem('userLoginToken')

        if (!userToken) {
            return history.push('/login')
        }
        setToken(userToken)
    }, [])


    if(!token)
        {
            return <Loading/>
        }

    return (
        <>
            {props.children}
        </>
    )
}

export default UserProtecter
import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    // No eSewa handling here; Razorpay flow verifies from client handler

    const verifyPayment = async ()=> {
        try {
            
            if (!token) {
                return null
            }

            // continue to Stripe verification if present

            // default: Stripe verification
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {success,orderId},{headers:{token}})
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div>
      verify
    </div>
  )
}

export default Verify

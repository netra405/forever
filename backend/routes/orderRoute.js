import express from 'express'
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verify_Stripe, latestTransaction } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()


//admin features
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth,updateStatus)


// payment features

orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)

// User Feature 
orderRouter.post('/userorders', authUser, userOrders)

// debug
orderRouter.get('/transaction/latest', adminAuth, latestTransaction)

//verify payment
orderRouter.post('/verifyStripe',authUser,verify_Stripe)

export default orderRouter
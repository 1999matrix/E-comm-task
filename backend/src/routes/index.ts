import {Router} from 'express'
import userRouter from './userRoutes'
import orderRouter from './orderRoutes'
import productRouter from './productRoutes'
import reviewRouter from './reviewRoutes'

const rootRouter: Router = Router()

rootRouter.use('/user' , userRouter)
rootRouter.use('/order' , orderRouter)
rootRouter.use('/products' , productRouter)
rootRouter.use('/review' , reviewRouter)

export default rootRouter


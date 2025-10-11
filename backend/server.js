import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 5000; // fallback port
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());

// Allow your frontend origin (Vite default: 5173)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://jlrbfqj7-5173.inc1.devtunnels.ms",
      "https://jlrbfqj7-5174.inc1.devtunnels.ms"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});

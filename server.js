import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Ensure the correct path
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express App
const app = express();

// ✅ **CORS Configuration**
const allowedOrigins = [
  "https://front-gvm2nd2bj-anshul-singhs-projects-430bef4d.vercel.app"// ✅ Your deployed frontend
 // ✅ Allow local development
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ✅ Allows cookies/auth headers
  })
);

// 🔹 **Middleware**
app.use(express.json());

// 🔹 **API Routes**
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// 🔹 **Serve Static Files (For Production)**
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 **Root Route**
app.get('/', (req, res) => {
  res.send("<h1>✅ Ecommerce Backend is Running!</h1>");
});

// 🔹 **Error Handling Middleware**
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// 🔹 **Define PORT & Start Server**
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Export app (for testing or serverless deployments)
export default app;

// import express from 'express'
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';  // Use a relative path here
// import authRoutes from './routes/authRoute.js'
// import cors from 'cors'
// import productRoutes from './routes/productRoutes.js'
// import categoryRoutes from './routes/categoryRoutes.js'
// import path from 'path'; // Import path for serving static files
// import { fileURLToPath } from 'url';
// //config env
// dotenv.config();

// const  app=express()

// // ✅ Allow CORS for frontend URL
// app.use(
//   cors({
//     origin: "https://ecommerce-app-iota-murex.vercel.app", // ✅ Frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allow OPTIONS
//     allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow Authorization header
//     credentials: true,
//   })
// );
// //connectDb
// connectDB();

// //middlewares
// app.use(cors())
// app.use(express.json())

// //routes
// app.use('/api/v1/auth',authRoutes)
// app.use('/api/v1/category', categoryRoutes)
// app.use('/api/v1/product',productRoutes)

// // Serve static files (for production)
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.join(__dirname, 'public')));

// //PORT
// const PORT = process.env.PORT || 8080;

// //API REST
// app.get('/',(req,res)=>{
//     res.send("<h1>Ecommerce hello!</h1>")
// })

// //port



// app.listen(PORT,()=>{
//     console.log(`Server runnig on ${PORT}`)

// })

// export default app;


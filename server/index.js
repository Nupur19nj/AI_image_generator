import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'
import postRoutes from './routes/postRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import connectDB from './mongodb/connect.js'
dotenv.config();

const app =express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/ai', aiRoutes);

app.get('/', async(req,res)=>{
    res.send("Hello from ME!")
})

const startServer = ()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080,()=>
        console.log('server has started on port http://localhost:8080'))
    }
    catch(error){
        console.log(error);
    }   
}
startServer();
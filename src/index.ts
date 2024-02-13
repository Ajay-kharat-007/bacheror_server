import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connecDb } from './config/dbConfig';
import adminRoutes from './routes/adminsRoute'
import path from 'path';
import cors from 'cors';

dotenv.config();
connecDb();

const port = process.env.PORT;
const app = express();

var dir = path.join(__dirname, '../uploads')

app.use(express.static(dir))
app.use(express.json());
app.use(cors())

// app.get("/", (req: Request, res: Response) => {
//     return res.send('Hello World!');
// })

// app.post("/api/data", (req: Request, res: Response) => {
//     console.log(req.body);
//     res.sendStatus(200)
// })

// app.all("/api/all", (req: Request, res: Response) => {
//     res.json({
//         success : true,
//         name : "Ajay Kharat"
//     })
// })

// app.route("/")
// .get((req: Request, res: Response) => {
//     return res.send("you make a get request");
// }).post((req: Request, res: Response) => {
//     return res.send("you make a post request");
// }).put((req: Request, res: Response) => {
//     return res.send("you make a put request");
// })

app.use("/api/admins", adminRoutes)

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`);
})
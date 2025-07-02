const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const PORT = 2500



const mongoose = require("mongoose")

process.env.MONGO_URL;

app.use(express.json())

const CadVlut = require("./models/CadVolu")

const connectDB =  async ()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI)
     console.log("Connected to MongoDB");
    } catch (error) {
      console.log("Erro ao conectar ao MongoDB:", error);   
    }
}

connectDB();

app.get("/Volutarios", async (req, res) => {
try {
    const cadidatos = await CadVlut.find();
    res.status(200).json(cadidatos);
} catch (error) {
     res.status(401).json({message: "Erro ao encotrar volutarios", error: error.message});
}
})

app.post("/casdatro/Volutario",  async (req, res) => {
    try {
    const cadidato = await CadVlut.create(req.body);
    res.status(201).json(cadidato);
    } catch (error) {
        res.status(401).json({message: "Erro ao cadastrar voluntário", error: error.message});
    }
})

app.listen(PORT, ()=>{console.log(`http://localhost:${PORT}`)});
const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const PORT = 2500



const mongoose = require("mongoose")

process.env.MONGO_URL;

app.use(express.json())

// Importando os modelos
const Instuiçoes = require('./Modelo/insti')
const CadVolu = require("./Modelo/CadVolu")

const VoluTemp = require("./Modelo/CadTEmporarios/VoluTEmp")
const InstEmp = require("./Modelo/CadTEmporarios/InstTEmp")

const connectDB =  async ()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI)
     console.log("Connected to MongoDB");
    } catch (error) {
      console.log("Erro ao conectar ao MongoDB:", error);   
    }
}

connectDB();
// Voluntarios
app.get("/Volutarios", async (req, res) => {
try {
    const cadidatos = await CadVolu.find();
    res.status(200).json(cadidatos);
} catch (error) {
     res.status(401).json({message: "Erro ao encotrar volutarios", error: error.message});
}
})

app.get("/inscriçoes/Volu/pendentes/:id", async (req , res)=>{

const { status } = req.body
const { id } = req.params

if( !['aceito' , 'rejeitado'].includes(status)){
    return res.status(404).json({error:'Status invalido'})
}else{
await  CadVolu.findByIdAndUpdate(id,{status})
res.json({sucesse:true})
}

})


app.post("/casdatro/Volutario",  async (req, res) => {
    try {
    const cadidato = await VoluTemp.create(req.body);
    res.status(201).json(cadidato);
    } catch (error) {
        res.status(401).json({message: "Erro ao cadastrar voluntário", error: error.message});
    }
})


// Instituiçoes
app.get("/Intituiçoes" , async (req ,res) =>{
try {
    const Insti = await Instuiçoes.findAll();
    res.status(200).json(Insti);
} catch (error) {
    res.status(401).json({message: "Erro ao encotrar volutarios", error: error.message })
}
 

})


app.get("/inscriçoes/Inst/pendentes/:id", async (req , res)=>{

const { status } = req.body
const { id } = req.params

if( !['aceito' , 'rejeitado'].includes(status)){
    return res.status(404).json({error:'Status invalido'})
}else{
await  Instuiçoes.findByIdAndUpdate(id,{status})
res.json({sucesse:true})
}

})

app.post("/casdatro/Inst", async (req, res)=>{
 try{
 const cadInst = await InstEmp.create(req.body);
 res.status(201).json(cadInst);
 }catch (error) {
     res.status(401).json({message:"Erro ao cadastrar" , error: error.message});
 }
}) 

app.listen(PORT, ()=>{console.log(`http://localhost:${PORT}`)});
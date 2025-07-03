const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const PORT = 2500
const mongoose = require("mongoose")




process.env.MONGO_URL;


app.use(cors());
app.use(express.json())







//Login Levi
//Senha 1821



// Importando os modelos
const Instuiçoes = require('./Modelo/insti')
const CadVolu = require("./Modelo/CadVolu")

const VoluTemp = require("./Modelo/CadTEmporarios/VoluTEmp")
const InstTemp = require("./Modelo/CadTEmporarios/InstTEmp")
const Usuario = require('./Modelo/Usuario');

const connectDB =  async ()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI)
     console.log("Connected to MongoDB");

    app.listen(PORT, ()=>{console.log(`http://localhost:${PORT}`)});

    } catch (error) {
      console.log("Erro ao conectar ao MongoDB:", error);   
    }
}

connectDB();

app.post("/login", async (req, res) => {
 const { login, senha } = req.body;

  const usuario = await Usuario.findOne({ login });
  if (!usuario) {
    return res.status(401).json({ mensagem: 'Login inválido' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ mensagem: 'Senha incorreta' });
  }

  const token = jwt.sign(
    { id: usuario._id, login: usuario.login },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });

})

//mideware para autenticar o token JWT

function autenticarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Voluntarios
app.get("/Volutarios", async (req, res) => {
try {
    const cadidatos = await VoluTemp.find();
    res.status(200).json(cadidatos);
} catch (error) {
     res.status(401).json({message: "Erro ao encotrar volutarios", error: error.message});
}
})

const Voluntarios = require('./Modelo/Voluntarios'); // modelo definitivo (crie e importe)

app.patch("/inscricoes/voluntarios/pendentes/:id", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['aceito', 'rejeitado', 'pendente'].includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  try {
    const voluntarioTemp = await VoluTemp.findById(id);
    if (!voluntarioTemp) {
      return res.status(404).json({ error: 'Voluntário não encontrado na análise' });
    }

    if (status === 'aceito') {
      // Mover para coleção definitiva
      const novoVoluntario = new Voluntarios(voluntarioTemp.toObject());
      await novoVoluntario.save();
      await VoluTemp.findByIdAndDelete(id);
      return res.json({ sucesso: true, mensagem: 'Voluntário aceito e movido para a coleção final.' });
    }

    if (status === 'rejeitado') {
      await VoluTemp.findByIdAndDelete(id);
      return res.json({ sucesso: true, mensagem: 'Voluntário rejeitado e removido da análise.' });
    }

    // pendente só atualiza status
    const atualizado = await VoluTemp.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ sucesso: true, voluntario: atualizado });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar inscrição', detalhes: error.message });
  }
});

app.post("/cadastro/Volutario",  async (req, res) => {
    try {
    const cadidato = await VoluTemp.create(req.body);
    res.status(201).json(cadidato);
    } catch (error) {
        res.status(401).json({message: "Erro ao cadastrar voluntário", error: error.message});
    }
})


// Instituiçoes
app.get("/Intituicoes" , async (req ,res) =>{
try {
    const Insti = await InstTemp.find();
    res.status(200).json(Insti);
} catch (error) {
    res.status(401).json({message: "Erro ao encotrar volutarios", error: error.message })
}
 

})

app.post("/cadastro/Inst", async (req, res)=>{
 try{
 const cadInst = await InstTemp.create(req.body);
 res.status(201).json(cadInst);
 }catch (error) {
     res.status(401).json({message:"Erro ao cadastrar" , error: error.message});
 }
}) 

app.patch("/inscricoes/instituicoes/pendentes/:id", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['aceito', 'rejeitado', 'pendente'].includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  try {
    const instituicaoTemp = await InstTemp.findById(id);
    if (!instituicaoTemp) {
      return res.status(404).json({ error: 'Instituição não encontrada na análise' });
    }

    if (status === 'aceito') {
      const novaInstituicao = new Instituicoes(instituicaoTemp.toObject());
      await novaInstituicao.save();
      await InstTemp.findByIdAndDelete(id);
      return res.json({ sucesso: true, mensagem: 'Instituição aceita e movida para a coleção final.' });
    }

    if (status === 'rejeitado') {
      await InstTemp.findByIdAndDelete(id);
      return res.json({ sucesso: true, mensagem: 'Instituição rejeitada e removida da análise.' });
    }

    const atualizado = await InstTemp.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ sucesso: true, instituicao: atualizado });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar inscrição', detalhes: error.message });
  }
});



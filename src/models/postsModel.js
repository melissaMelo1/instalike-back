import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js'

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO

export async function getTodosPosts() {
    // Função assíncrona para obter todos os posts do banco de dados
    const db = conexao.db("Instabytes");
    // Obtém o banco de dados "Instabytes"
    const colecao = db.collection("posts");
    // Obtém a coleção "posts" dentro do banco de dados
    return colecao.find().toArray();
    // Executa a consulta para encontrar todos os documentos na coleção e retorna os resultados como um array
  };
  
export async function criarPost(novoPost){
        const db = conexao.db("Instabytes");
        const colecao = db.collection("posts");
        return colecao.insertOne(novoPost);
  };

export async function atualizarPost(id, novoPost){
      const db = conexao.db("Instabytes");
      const colecao = db.collection("posts");
      const objectId = ObjectId.createFromHexString(id); 
      return colecao.updateOne({_id:new ObjectId(objectId)}, {$set:novoPost});
};
  
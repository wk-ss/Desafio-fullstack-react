import { Request, Response } from "express";
import { connection } from "../database/connection";

function normalizarNome(nome: string) {
  const nomeLimpo = nome.trim().toLowerCase();
  return nomeLimpo.charAt(0).toUpperCase() + nomeLimpo.slice(1);
}


export const listar = async (_: Request, res: Response) => {
  const [rows] = await connection.query(
    "SELECT * FROM products WHERE ativo = true"
  );
  res.json(rows);
};

export const cadastrar = async (req: Request, res: Response) => {
  let { nome, preco, quantidade } = req.body;

  if (!nome || nome.length < 3)
    return res.status(400).json({ error: "Nome inválido" });

  if (typeof preco !== "number" || preco <= 0)
    return res.status(400).json({ error: "Preço inválido" });

  if (!Number.isInteger(quantidade) || quantidade < 0)
    return res.status(400).json({ error: "Quantidade inválida" });

  nome = normalizarNome(nome);

  const [existe]: any = await connection.query(
    "SELECT id FROM products WHERE LOWER(nome) = LOWER(?)",
    [nome]
  );

  if (existe.length > 0)
    return res.status(400).json({ error: "Produto já cadastrado" });

  await connection.query(
    "INSERT INTO products (nome, preco, quantidade, ativo) VALUES (?, ?, ?, true)",
    [nome, preco, quantidade]
  );

  res.status(201).json({ message: "Produto cadastrado" });
};

export const editar = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { nome, preco, quantidade, ativo } = req.body;

  nome = normalizarNome(nome);

  const [existe]: any = await connection.query(
    "SELECT id FROM products WHERE LOWER(nome) = LOWER(?) AND id != ?",
    [nome, id]
  );

  if (existe.length > 0)
    return res.status(400).json({ error: "Nome já existe" });

  await connection.query(
    "UPDATE products SET nome=?, preco=?, quantidade=?, ativo=? WHERE id=?",
    [nome, preco, quantidade, ativo, id]
  );

  res.json({ message: "Produto atualizado" });
};

export const deletarTudo = async (_: Request, res: Response) => {
  await connection.query("UPDATE products SET ativo = false");
  res.json({ message: "Todos os produtos foram desativados" });
};

export const buscarPorNome = async (req: Request, res: Response) => {
  const { nome } = req.params;

  const [rows] = await connection.query(
    "SELECT * FROM products WHERE LOWER(nome) LIKE LOWER(?)",
    [`%${nome}%`]
  );

  res.json(rows);
};
export const buscarPorId = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [rows]: any = await connection.query(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json(rows[0]);
};


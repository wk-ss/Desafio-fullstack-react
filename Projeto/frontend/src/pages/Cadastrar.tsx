import { useState } from "react";
import { api } from "../services/api";

export function Cadastrar() {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const salvar = async () => {

        if (!nome.trim()) {
            setErro("Nome é obrigatório");
            return;
        }

        if (nome.trim().length < 3) {
            setErro("Nome deve ter ao menos 3 caracteres");
            return;
        }

        if (Number(preco) <= 0) {
            setErro("Preço inválido");
            return;
        }

        if (Number(quantidade) < 0) {
            setErro("Quantidade inválida");
            return;
        }

        setErro("");
        setLoading(true);

        try {
            await api.post("/products", {
                nome,
                preco: Number(preco),
                quantidade: Number(quantidade),
            });

            alert("Produto cadastrado com sucesso");


            setNome("");
            setPreco("");
            setQuantidade("");
        } catch (error: any) {
            setErro(error.response?.data?.error || "Erro ao cadastrar produto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Cadastrar Produto</h2>

            <input
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <input
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
            />

            <input
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
            />

            <button onClick={salvar} disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
            </button>

            {erro && <p style={{ color: "red" }}>{erro}</p>}
        </div>
    );
}

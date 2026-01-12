import { useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { converter, simbolo, type Moeda } from "../utils/cambio";

export function Buscar() {
    const [nome, setNome] = useState("");
    const [produtos, setProdutos] = useState<any[]>([]);
    const [erro, setErro] = useState("");
    const [moeda, setMoeda] = useState<Moeda>("BRL");

    const buscar = async () => {
        if (!nome.trim()) {
            setErro("Digite algo para buscar");
            setProdutos([]);
            return;
        }

        try {
            const response = await api.get(`/products/buscar/${nome}`);

            if (response.data.length === 0) {
                setErro("Nenhum produto encontrado");
                setProdutos([]);
                return;
            }

            setErro("");
            setProdutos(response.data);
        } catch {
            setErro("Erro ao buscar produto");
            setProdutos([]);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        buscar();
    };

    return (
        <div>
            <h2>Buscar Produto</h2>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nome do produto"
                    value={nome}
                    onChange={(e) => {
                        setNome(e.target.value);
                        setErro("");
                    }}
                />

                <button type="submit">Buscar</button>
            </form>

            { }
            <select value={moeda} onChange={(e) => setMoeda(e.target.value as Moeda)}>
                <option value="BRL">Real (R$)</option>
                <option value="USD">Dólar (US$)</option>
                <option value="RUB">Rublo (₽)</option>
            </select>

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {produtos.length > 0 && (
                <table border={1} cellPadding={8} style={{ marginTop: 10 }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((p) => (
                            <tr key={p.id}>
                                <td>{p.nome}</td>
                                <td>
                                    {simbolo(moeda)} {converter(p.preco, moeda)}
                                </td>
                                <td>{p.quantidade}</td>
                                <td>{p.ativo ? "Ativo" : "Inativo"}</td>
                                <td>
                                    <Link to={`/editar/${p.id}`}>
                                        <button>Editar</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

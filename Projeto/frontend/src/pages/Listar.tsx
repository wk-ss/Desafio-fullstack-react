import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { converter, simbolo, type Moeda } from "../utils/cambio";

export function Listar() {
    const [produtos, setProdutos] = useState<any[]>([]);
    const [moeda, setMoeda] = useState<Moeda>("BRL");

    useEffect(() => {
        api.get("/products").then((res) => setProdutos(res.data));
    }, []);

    return (
        <div className="lista-produtos-container">
            <h2>Lista de Produtos</h2>

            { }
            <select value={moeda} onChange={(e) => setMoeda(e.target.value as Moeda)}>
                <option value="BRL">Real (R$)</option>
                <option value="USD">Dólar (US$)</option>
                <option value="RUB">Rublo (₽)</option>
            </select>

            <table border={1} cellPadding={8} style={{ marginTop: 30 }}>
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
        </div>
    );
}

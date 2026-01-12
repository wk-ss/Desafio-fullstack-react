import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

export function Editar() {
    const { id } = useParams();
    const [produto, setProduto] = useState<any>(null);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregarProduto() {
            try {
                const response = await api.get(`/products/${id}`);
                setProduto(response.data);
            } catch (error: any) {
                setErro(error.response?.data?.error || "Erro ao carregar produto");
            }
        }

        carregarProduto();
    }, [id]);

    const salvar = async () => {
        try {
            await api.put(`/products/${id}`, produto);
            alert("Produto atualizado com sucesso");
        } catch (error: any) {
            alert(error.response?.data?.error || "Erro ao atualizar produto");
        }
    };

    if (erro) return <p style={{ color: "red" }}>{erro}</p>;
    if (!produto) return <p>Carregando...</p>;

    return (
        <div>
            <h2>Editar Produto</h2>

            <input
                value={produto.nome}
                onChange={(e) =>
                    setProduto({ ...produto, nome: e.target.value })
                }
            />

            <input
                type="number"
                value={produto.preco}
                onChange={(e) =>
                    setProduto({ ...produto, preco: Number(e.target.value) })
                }
            />

            <input
                type="number"
                value={produto.quantidade}
                onChange={(e) =>
                    setProduto({ ...produto, quantidade: Number(e.target.value) })
                }
            />

            <label>
                Ativo:
                <input
                    type="checkbox"
                    checked={produto.ativo}
                    onChange={(e) =>
                        setProduto({ ...produto, ativo: e.target.checked })
                    }
                />
            </label>

            <button onClick={salvar}>Salvar</button>
        </div>
    );
}

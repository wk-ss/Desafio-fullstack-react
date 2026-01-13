import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import {Box,Heading,Input,Button,FormControl,FormLabel,Checkbox,Spinner,Text,Stack,Alert,AlertIcon} from "@chakra-ui/react";

export function Editar() {
  const { id } = useParams();
  const [produto, setProduto] = useState<any>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregarProduto() {
      try {
        const response = await api.get(`/products/${id}`);
        setProduto(response.data);
      } catch (error: any) {
        setErro(error.response?.data?.error || "Erro ao carregar produto");
      } finally {
        setLoading(false);
      }
    }

    carregarProduto();
  }, [id]);

  const salvar = async () => {
    setSalvando(true);
    try {
      await api.put(`/products/${id}`, produto);
      alert("Produto atualizado com sucesso");
    } catch (error: any) {
      alert(error.response?.data?.error || "Erro ao atualizar produto");
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <Box p={6} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (erro) {
    return (
      <Box p={6}>
        <Alert status="error">
          <AlertIcon />
          {erro}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="500px">
      <Heading size="md" mb={6}>
        Editar Produto
      </Heading>

      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input
            value={produto.nome}
            onChange={(e) =>
              setProduto({ ...produto, nome: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Preço</FormLabel>
          <Input
            type="number"
            value={produto.preco}
            onChange={(e) =>
              setProduto({ ...produto, preco: Number(e.target.value) })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Quantidade</FormLabel>
          <Input
            type="number"
            value={produto.quantidade}
            onChange={(e) =>
              setProduto({ ...produto, quantidade: Number(e.target.value) })
            }
          />
        </FormControl>

        <FormControl>
          <Checkbox
            isChecked={produto.ativo}
            onChange={(e) =>
              setProduto({ ...produto, ativo: e.target.checked })
            }
          >
            Produto ativo
          </Checkbox>
        </FormControl>

        <Button
          colorScheme="green"
          onClick={salvar}
          isLoading={salvando}
          loadingText="Salvando"
        >
          Salvar alterações
        </Button>
      </Stack>
    </Box>
  );
}

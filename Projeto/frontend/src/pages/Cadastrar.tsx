import { useState } from "react";
import { api } from "../services/api";
import {Box,Button,Heading,Input,VStack, FormControl,FormLabel,Text,useToast} from "@chakra-ui/react";

export function Cadastrar() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

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

      toast({
        title: "Sucesso",
        description: "Produto cadastrado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

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
    <Box p={6} maxW="400px">
      <Heading size="md" mb={4}>
        Cadastrar Produto
      </Heading>

      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Preço</FormLabel>
          <Input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Quantidade</FormLabel>
          <Input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="green"
          width="100%"
          onClick={salvar}
          isLoading={loading}
          loadingText="Salvando..."
        >
          Salvar
        </Button>

        {erro && (
          <Text color="red.500">
            {erro}
          </Text>
        )}
      </VStack>
    </Box>
  );
}

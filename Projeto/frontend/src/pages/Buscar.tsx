import { useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { converter, simbolo, type Moeda } from "../utils/cambio";
import {Box,Button,Flex,Heading,Input,Select,Text,Table,Thead,Tbody,Tr,Th,Td,TableContainer} from "@chakra-ui/react";

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
    <Box p={6}>
      <Heading size="md" mb={4}>
        Buscar Produto
      </Heading>

      {}
      <Flex
        as="form"
        onSubmit={onSubmit}
        gap={2}
        mb={4}
        maxW="500px"
      >
        <Input
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            setErro("");
          }}
        />

        <Button type="submit" colorScheme="blue">
          Buscar
        </Button>
      </Flex>

      {}
      <Select
        value={moeda}
        onChange={(e) => setMoeda(e.target.value as Moeda)}
        maxW="200px"
        mb={4}
      >
        <option value="BRL">Real (R$)</option>
        <option value="USD">Dólar (US$)</option>
        <option value="RUB">Rublo (₽)</option>
      </Select>

      {}
      {erro && (
        <Text color="red.500" mb={4}>
          {erro}
        </Text>
      )}

      {}
      {produtos.length > 0 && (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Preço</Th>
                <Th>Quantidade</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>

            <Tbody>
              {produtos.map((p) => (
                <Tr key={p.id}>
                  <Td>{p.nome}</Td>
                  <Td>
                    {simbolo(moeda)} {converter(p.preco, moeda)}
                  </Td>
                  <Td>{p.quantidade}</Td>
                  <Td>{p.ativo ? "Ativo" : "Inativo"}</Td>
                  <Td>
                    <Link to={`/editar/${p.id}`}>
                      <Button size="sm" colorScheme="yellow">
                        Editar
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { converter, simbolo, type Moeda } from "../utils/cambio";

import {
  Box,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Spinner
} from "@chakra-ui/react";

export function Listar() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [moeda, setMoeda] = useState<Moeda>("BRL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProdutos(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box p={6}>
      <Heading size="md" mb={4}>
        Lista de Produtos
      </Heading>

      {/* SELETOR DE MOEDA */}
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

      {/* LOADING */}
      {loading ? (
        <Flex justify="center" mt={10}>
          <Spinner size="xl" />
        </Flex>
      ) : (
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

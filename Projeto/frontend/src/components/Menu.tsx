import { NavLink } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

export function Menu() {
  return (
    <Box bg="blue.600" py={4}>
      <Flex
        maxW="1200px"
        mx="auto"
        gap={4}
        justify="center"
      >
        <Button
          as={NavLink}
          to="/"
          end
          colorScheme="blue"
          variant="solid"
        >
          Listar
        </Button>

        <Button
          as={NavLink}
          to="/cadastrar"
          colorScheme="blue"
          variant="solid"
        >
          Cadastrar
        </Button>

        <Button
          as={NavLink}
          to="/buscar"
          colorScheme="blue"
          variant="solid"
        >
          Buscar
        </Button>
      </Flex>
    </Box>
  );
}

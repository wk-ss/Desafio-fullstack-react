import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Menu } from "./components/Menu";
import { Listar } from "./pages/Listar";
import { Cadastrar } from "./pages/Cadastrar";
import { Buscar } from "./pages/Buscar";
import { Editar } from "./pages/Editar";

function App() {
  return (
    <BrowserRouter>
      {/* Layout geral */}
      <Box minH="100vh" bg="blue.100">
        {/* Menu superior */}
        <Menu />

        {/* Conteúdo centralizado */}
        <Box maxW="1200px" mx="auto" p={6}>
          <Routes>
            <Route path="/" element={<Listar />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/editar/:id" element={<Editar />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;

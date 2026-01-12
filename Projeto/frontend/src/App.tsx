import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Listar } from "./pages/Listar";
import { Cadastrar } from "./pages/Cadastrar";
import { Buscar } from "./pages/Buscar";
import { Editar } from "./pages/Editar";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Menu />

        <main className="content">
          <Routes>
            <Route path="/" element={<Listar />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/editar/:id" element={<Editar />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

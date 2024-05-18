import { Navigate, Route, Routes } from "react-router-dom";
import ListEntradaInventario from "../pages/inventario/entrada/List";
import FormEntradaInventario from "../pages/inventario/entrada/Form";
import ListRol from "../pages/seguridad/rol/Rol";
import FormProducto from "../pages/inventario/producto/Form";
import ListProducto from "../pages/inventario/producto/List";
import FormRol from "../pages/seguridad/rol/FormRol";
import FormUser from "../pages/seguridad/usuario/Form";
import ListUser from "../pages/seguridad/usuario/List";
import ConsultaInventario from "../pages/inventario/consulta/List";

export default function RoutesApp() {

    const ProtectedRoute = ({ children }) => {
        const user = localStorage.getItem('user');

        if (!user) {
          return <Navigate to="/login" />;
        }

        return children;
      };

    return (
        <Routes>
            <Route path="/inventario/entrada/list" element={<ProtectedRoute><ListEntradaInventario /></ProtectedRoute>} />
            <Route path="/inventario/entrada/form" element={<ProtectedRoute><FormEntradaInventario /></ProtectedRoute>} />
            <Route path="/seguridad/rol" element={<ProtectedRoute><ListRol /></ProtectedRoute>} />
            <Route path="/inventario/producto/form" element={<ProtectedRoute><FormProducto /></ProtectedRoute>} />
            <Route path="/inventario/producto/edit/:id" element={<ProtectedRoute><FormProducto /></ProtectedRoute>} />
            <Route path="/inventario/producto/list" element={<ProtectedRoute><ListProducto /></ProtectedRoute>} />
            <Route path="/seguridad/rol/formrol" element={<ProtectedRoute><FormRol /></ProtectedRoute>} />
            <Route path="/seguridad/rol/edit/:id" element={<ProtectedRoute><FormRol /></ProtectedRoute>} />
            <Route path="/seguridad/usuario/form" element={<ProtectedRoute><FormUser /></ProtectedRoute>} />
            <Route path="/seguridad/usuario/list" element={<ProtectedRoute><ListUser /></ProtectedRoute>} />
            <Route path="/seguridad/usuario/edit/:id" element={<ProtectedRoute><FormUser /></ProtectedRoute>} />
            <Route path="/inventario/consultainventario" element={<ProtectedRoute><ConsultaInventario /></ProtectedRoute>} />
        </Routes>
    )
}
import { Navigate, Route, Routes } from "react-router-dom";
import ListEntradaInventario from "../pages/inventario/entrada/List";
import FormEntradaInventario from "../pages/inventario/entrada/Form";

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
        </Routes>
    )
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ProveedorView from "./views/ProvedorView";
import MunicipioView from "./views/municipio/MunicipioView";
import PostearView from "./views/municipio/PostearView";
import PostsView from "./views/municipio/PostsView";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginView />}></Route>
        <Route path="/login" element={<LoginView />}></Route>
        <Route path="/register" element={<RegisterView />}></Route>
        <Route path="/proveedor" element={<ProveedorView />}></Route>
        <Route path="/municipio" element={<MunicipioView />}>
          <Route index element={<PostsView />}></Route>
          <Route path="posts" element={<PostsView />}></Route>
          <Route path="postear" element={<PostearView />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;

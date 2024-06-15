import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import MainView from "./views/MainView";
import PostearView from "./views/PostearView";
import PostsView from "./views/PostsView";
import AnexosView from "./views/AnexosView";
import PropuestasView from "./views/PropuestasView";
import PostularView from "./views/PostularView";
import { NotifyView } from "./views/NotifyView";
import CotizacionView from "./views/CotizacionView";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginView />}></Route>
        <Route path="/login" element={<LoginView />}></Route>
        <Route path="/register" element={<RegisterView />}></Route>
        <Route path="/main" element={<MainView />}>
          <Route index element={<PostsView />}></Route>
          <Route path="posts" element={<PostsView />}></Route>
          <Route path="postear" element={<PostearView />}></Route>
          <Route path="anexos" element={<AnexosView />}></Route>
          <Route path="propuestas" element={<PropuestasView />}></Route>
          <Route path="postular" element={<PostularView />}></Route>
          <Route path="notify" element={<NotifyView />}></Route>
          <Route path="cotizacion" element={<CotizacionView />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;

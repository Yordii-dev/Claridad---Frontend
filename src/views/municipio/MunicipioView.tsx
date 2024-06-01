import SidebarComponent from "../../components/municipio/SidebarComponent";
import { Outlet, useNavigate } from "react-router";

function MunicipioView() {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  return (
    <div className="container-main p-3 d-flex align-items-center justify-content-between">
      <SidebarComponent></SidebarComponent>
      <Outlet></Outlet>
    </div>
  );
}

export default MunicipioView;

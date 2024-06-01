import SidebarComponent from "../components/proveedor/SidebarComponent";
import PostsComponent from "../components/proveedor/PostsComponent";
import {Filter1Rounded} from '@mui/icons-material'
import FilterComponent from "../components/FilterComponent";
import { useState } from "react";

function ProveedorView(){
    const [modalShow, setModalShow] = useState(false);

    return <div className="container-main p-3 d-flex align-items-center justify-content-between">
        <SidebarComponent></SidebarComponent>
        <div className="h-100 flex-grow-1 align-self-start mx-3 p-4 bg-white">
            <div className="d-flex align-items-center justify-content-between">
                <h3>Publicaciones</h3>
                <div role="button" onClick={() => setModalShow(true)} className="container-filter p-2 rounded d-flex align-items-center">
                    <Filter1Rounded></Filter1Rounded>
                    <h5 className="my-0 mx-2">Filtros</h5>
                </div>
            </div>
            <PostsComponent></PostsComponent>
        </div>
        <FilterComponent show={modalShow} onHide={() => setModalShow(false)}></FilterComponent>
    </div>
}


export default ProveedorView;
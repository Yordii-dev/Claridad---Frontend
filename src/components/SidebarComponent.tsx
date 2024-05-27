function SidebarComponent(){
    return <div className="container-sidebar my-3 px-2 bg-white">
        <div className="container-photo mt-3 mx-auto text-center">
            <img src="http://via.placeholder.com/640x360" alt="" />
            <h5 className="mt-2">Luis Rivas</h5>
            <p className="text-success">Proveedor</p>
        </div>
        <div className="mt-5">
            <div className="active-option rounded mb-3">
                <p className="py-2 px-3 m-0">Publicaciones</p>
            </div>
            <div className="rounded mx-2 mb-3 cerrar-sesion-option">
                <p className="py-2 px-3 m-0">Cerrar sesion</p>
            </div>           
        </div>
    </div>
}


export default SidebarComponent;
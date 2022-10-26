import Swal from 'sweetalert2';

export const MostrarAlet =  (icono, titulo, texto, estadoBoton, estadoTiempo) => 

    Swal.fire({
        icon: icono,
        title: titulo,
        text: texto,
        showConfirmButton: estadoBoton,
        timer: estadoTiempo
    })	

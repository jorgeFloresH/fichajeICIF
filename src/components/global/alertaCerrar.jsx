import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';



export const CerrarSesion =  () => 

    Swal.fire({
        title: 'SEGURO QUE QUIERE CERRAR SESION?',
        text: "CERRAR SESION",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Quiero Salir!'
     }).then( async (result) =>  {
        if (result.isConfirmed) {
            await BorrarCookie();
            return true;
        }
    })
    
    
    const cookies = new Cookies();
    const BorrarCookie = () =>{
        cookies.remove('IdUsuario', {path: '/'});
        cookies.remove('UserName', {path: '/'});
        cookies.remove('UserPassword', {path: '/'});
        cookies.remove('IdPerfil', {path: '/'});
        cookies.remove('FechaCreacion', {path: '/'});
        cookies.remove('IdAgencia', {path: '/'});
        cookies.remove('Esatado', {path: '/'});
        cookies.remove('NomUsuario', {path: '/'});
        cookies.remove('ApePaterno', {path: '/'});
        cookies.remove('ApeMaterno', {path: '/'});
        cookies.remove('CiUsuario', {path: '/'});
        cookies.remove('estadoA', {path: '/'});
        cookies.remove('nomPerfil', {path: '/'});
        cookies.remove('nomAgencia', {path: '/'});
        cookies.remove('Idventanilla', {path: '/'});
		cookies.remove('Nomventanilla', {path: '/'});
    }

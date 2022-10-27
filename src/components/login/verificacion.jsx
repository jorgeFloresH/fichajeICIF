import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { getAgenciaId } from '../../services/apiAgencia'
import { MostrarAlet } from '../global/alertaError'


export const VerificacionLogin = async (tipoUsuario) => {

    if(tipoUsuario == 3 || tipoUsuario == 4){
        MostrarAlet('success', 'Usuario y Cajero', false, 'true')
        return true
        // Swal.fire({
        //     title: 'Seleccione su Ventanilla',
        //     input: 'select',
        //     inputOptions: ['dato1','dato2','dato3','dato4'],
        //     inputPlaceholder: 'Seleccione su Ventanilla',
        //     showCancelButton: true,
        //     inputValidator: (value) => {
        //         return new Promise((resolve) => {
        //             if (value !== '') {
        //                 resolve()
        //                 Swal.fire({
        //                     icon: 'success',
        //                     title: `Bienvenido ${tipoUsuario}`,
        //                     html: `<b>Selecciono La ventanilla:</b>`,
        //                     showConfirmButton: false,
        //                     timer: 1000
        //                 })
        //                 return true
        //                 // .then((result) => {
        //                 //     history('/ticket');
        //                 //     window.location.reload(false);
        //                 // })
        //             }else{
        //                 resolve('Necesitas Seleccionar una ventnilla')
        //             }
                    
        //         })
        //     }
        // })
      
       
    }
    else{
        if (tipoUsuario == 1 || tipoUsuario == null){
            MostrarAlet('success', 'Admin y Super', false, 'true')
            return true
        }
        else{
            MostrarAlet('info', 'Este Usuario NO cuenta con los permisos Adecuados', false, true, false)
            return false
        } 
    }
    
}

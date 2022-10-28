import Swal from 'sweetalert2';
import { getVentanillaId } from '../../services/apiVentanilla'
import { MostrarAlet } from '../global/alertaError'
import Cookies from 'universal-cookie';


export const VerificacionLogin = async (tipoUsuario, idAgencia, nombre) => {

    const cookies = new Cookies();

    if(tipoUsuario == 3 || tipoUsuario == 4){
        let control = false
        await Swal.fire({
            title: 'Seleccione su Ventanilla',
            input: 'select',
            inputOptions: await getVentanillaId(idAgencia).then(data => data.map(PT => {
                return PT.nomVentanilla
            })),
            inputPlaceholder: 'Seleccione su Ventanilla',
            showCancelButton: true,
            showConfirmButton: true,
            inputValidator: (value) => {
                new Promise((resolve) => {
                    if (value !== '') {
                        getVentanillaId(idAgencia)
                        .then((result) => {
                            cookies.set('Idventanilla', result[value].idVentanilla, {path: '/'});
							cookies.set('Nomventanilla', result[value].nomVentanilla, {path: '/'});
                        })
                        control = true
                    }                    
                })
            }
        })   
        if(control){
            return true
        }
    }
    else{
        if (tipoUsuario == 1){
            MostrarAlet('success', `Bienvenido Administrador ${nombre}`, false, false, 1000)
            return true
        }
        else{
            if (tipoUsuario == null)
            {
                MostrarAlet('success', `Bienvenido Super Admin ${nombre}`, false, false, 1000)
                return true
            }
            else{
                MostrarAlet('info', 'Este Usuario NO cuenta con los permisos Adecuados', false, true, false)
                return false
            }
        } 
    }
    
}

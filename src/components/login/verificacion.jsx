import Swal from 'sweetalert2';
import { getVentanillaId, estadoVentanilla } from '../../services/apiVentanilla'
import { MostrarAlet } from '../global/alertaError'
import Cookies from 'universal-cookie';

export const VerificacionLogin = async (tipoUsuario, idAgencia, nombre, agencia) => {

    const cookies = new Cookies();
    const cambioEstadoV = (idV) => {
        estadoVentanilla(idV, 3)
    }

    if(tipoUsuario == 3 || tipoUsuario == 4){
        let control = false
        let pos
        await Swal.fire({
            title: 'Seleccione su Ventanilla',
            input: 'select',
            inputOptions: await getVentanillaId(idAgencia).then(data => data.response.map(PT => {
                return PT.nomVentanilla
            })),
            inputPlaceholder: 'Seleccione su Ventanilla',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
            
                    if (value !== '') {
                        resolve()
                        pos = value
                        control = true
                    }
                    else{
                        resolve('Necesitas Seleccionar una ventnilla')
                    }                    
                })
            }
            
        }).then (() => {
            if(control)
            {
                getVentanillaId(idAgencia)
                .then( async (result) => {
                    await cookies.set('Idventanilla', result.response[pos].idVentanilla, {path: '/'});
                    await cookies.set('Nomventanilla', result.response[pos].nomVentanilla, {path: '/'});
                    await cambioEstadoV(result.response[pos].idVentanilla)
                })
            }
        })   
        if(control){
            MostrarAlet('success', `Bienvenido ${nombre}`, `Su agencia es: ${agencia}`, false, 1500)
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

import Swal from 'sweetalert2';

export const CerrarSesion =  (titulo, texto, icono, cancelar, confirmarColor, colorCancelar, textoCancelar, textoConfirmar) => 

    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        showCancelButton: cancelar,
        confirmButtonColor: confirmarColor,
        cancelButtonColor: colorCancelar,
        cancelButtonText: textoCancelar,
        confirmButtonText: textoConfirmar
     }).then( async (result) =>  {
        if (result.isConfirmed) {
            return true;
        }
    })

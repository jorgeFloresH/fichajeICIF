import React, { Component } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Usuario extends Component {
    render() {
        return (
            <div>
                {cookies.get('IdAgencia') == 'null' &&
                    <h1>Hola Super Admin</h1>
                }
                 {cookies.get('IdPerfil') == '1' &&
                    <h1>Hola Administrador</h1>
                 }
            </div>
        )
    }
}
export default Usuario;
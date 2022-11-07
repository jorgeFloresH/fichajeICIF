import React, { Component } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Usuario extends Component {
    render() {
        return (
            <div>
                {cookies.get('estadoA') == 1 &&
                    <h1>Administrador Agencia dinamica</h1>
                }
                {cookies.get('estadoA') == 0 &&
                    <h1>Administrador Agencia Estatica</h1>
                }
                {cookies.get('IdAgencia') == 'null' &&
                    <h1>Super Administrador</h1>
                }
            </div>
        )
    }
}
export default Usuario;
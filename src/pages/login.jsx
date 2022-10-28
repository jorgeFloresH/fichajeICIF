import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import '../styles/estiloLogin.css'
import { bgL, avatarL, escudoL, bg2L } from '../assets/index'
import { loginVer } from '../services/apiUser';
import { MostrarAlet } from '../components/global/alertaError';
import { VerificacionLogin } from '../components/login/verificacion';


export const Login = () => {
	let res
	const cookies = new Cookies();
	const history = useNavigate();	
	const [form, setForm]=useState({
		username: '',
		password: ''
	});

	const handleChange=async(e) => {
		const {name, value} = e.target;
	 	await setForm({
	   		...form,
			[name]: value
	 	});
	}

	const login = () => {
		
 		const inputs = document.querySelectorAll('.input');
		function focusFunc() {
			let parent = this.parentNode.parentNode;
			parent.classList.add('focus')
		}

		function blurFunc() {
			let parent = this.parentNode.parentNode;
			if(this.value==""){
				parent.classList.remove('focus')
			}	
		}

		inputs.forEach(input=>{
			input.addEventListener('focus',focusFunc);
			input.addEventListener('blur',blurFunc);
		})
 	}

	function handleKeyPress(e) {
		if(e.key ==="Enter"){
			iniciarsesion();
		}
	}

	const llenarCookies = async () => {
		cookies.set('IdUsuario', res.idUsuario, {path: '/'});
		cookies.set('UserName', res.userName, {path: '/'});
		cookies.set('UserPassword', res.usePassword, {path: '/'});
		cookies.set('IdPerfil', res.idPerfil, {path: '/'});
		cookies.set('FechaCreacion', res.fechaCreacion, {path: '/'});
		cookies.set('IdAgencia', res.idAgencia, {path: '/'});
		cookies.set('Esatado', res.estado, {path: '/'});
		cookies.set('NomUsuario', res.nomUsuario, {path: '/'});
		cookies.set('ApePaterno', res.apePaterno, {path: '/'});
		cookies.set('ApeMaterno', res.apeMaterno, {path: '/'});
		cookies.set('CiUsuario', res.ciUsuario, {path: '/'});
		cookies.set('estadoA', res.estadoA, {path: '/'});
		cookies.set('nomPerfil', res.nomPerfil, {path: '/'});
		cookies.set('nomAgencia', res.nomAgencia, {path: '/'});
		if (res.idPerfil == 1){
			history('/a/adminP')
		}
		else{
			history('/a')	
		}
	}

	const iniciarsesion = async () => {
		if(form.username=='' && form.password==''){
			MostrarAlet('error', 'ALTO!', 'RELLENE LOS CAMPOS!', false, false)
		}
		else{
			res = await loginVer(form.username, form.password)
			if (res == 404){
				MostrarAlet('error', `Error ${res}`, 'Usuario no encontrado')
			}
			else{
				await VerificacionLogin(res.idPerfil, res.idAgencia, res.nomUsuario, res.nomAgencia) ? llenarCookies():console.log("Permisos no Adecuados")
			}
		}
	}
	useEffect( ()=>{
		if(cookies.get('UserName')){
			history('/a')
		}
		login();
	}, [])


	return (
		<>
			<img src={bgL} alt="" className="wave" />
			<img src={bg2L} alt="" className="wave2"/>
			<div className="content" >
				<div className="img"><img src={escudoL} alt=""/></div>
				<div className="login-container">
					<form action="">
						<img src={avatarL} className="avatar" alt=""/>
						<h2 >Bienvenido</h2>
						<div className="input-div one ">
							<div className="i">
								<i className="bi bi-person-fill"></i>
							</div>
							<div>
								<h5>Username</h5>
								<input className="input" type="text" name="username" onKeyPress={(e) => handleKeyPress(e)} onChange={handleChange}/>
							</div>
						</div>
						<div className="input-div two">
							<div className="i">
								<i className="bi bi-lock-fill"></i>
							</div>
							<div>
								<h5>Password</h5>
								<input className="input" onKeyPress={(e) => handleKeyPress(e)}  type="password" name="password" onChange={handleChange} />
							</div>
						</div>
						<button className="butn" type="button"  onClick={()=>{iniciarsesion()}}>Iniciar Sesión</button>
					</form>
				</div>
			</div>
		</>
  )
}
import React, {useState, useEffect} from 'react'
import '../../styles/estiloAdminP.css'
import 'bootstrap/js/dist/dropdown'
import Cookies from 'universal-cookie'
import { Chart } from 'react-chartjs-2'
import 'chart.js/auto'
import {Link} from 'react-router-dom'
import { urlCountUser } from '../../services/apiUser'
import { urlcountbyAgency } from '../../services/apiTicket'
import { contDasthboard } from '../../services/apiDashboard'

export const Admin = () => {

  const cookies = new Cookies();
  const idAgencia = cookies.get('IdAgencia');
  const usuarioCokkie = cookies.get('NomUsuario');
  const apellidoCookie = cookies.get('ApePaterno');

  const abrebiadoAp = apellidoCookie.substr(0,1)
  const labelChart = []
  const dataChart = []

  const [countTicket, setCountTicket] = useState([])
  const [contU,setConU] = useState([]);

  const [chartDAta, setChartData]  = useState({
    datasets:[],
  })
  const [chartOptions, setChartOptions] = useState({})

  const handlePeticioneGet = async () =>{
    const res = await urlcountbyAgency(idAgencia);
    setCountTicket(res);
  }
  
  const handleContUserGet = async () =>{
    const res = await urlCountUser(idAgencia);
    setConU(res)
  }
  const handleGetContUserTicket = async () =>{
    const res = await contDasthboard(idAgencia);
    res.response.map(LUD=>{
      labelChart.push(LUD.nombreUser);
      dataChart.push(LUD.conteo)
    })
    setChartData({
      labels:labelChart,
      datasets:[{
        label:"Data chart ",
        data:dataChart,
        borderColor:"rgb(53,162,235)",
        backgroundColor:"rgb(53,162,235)",
        backgroundColor:"rgb(53,162,235)"
      }]
    });
    setChartOptions({
      responsive:true,
      plugins:{
        legend:{
          position:"top"
        },
        title:{
          display:true,
          text:"Chart js"
        }
      }
    })
  }


  useEffect(()=>{
    handlePeticioneGet();
    handleGetContUserTicket();
    handleContUserGet();
  },[])
 
  return (
    <div className="container">
      <nav className="navPrin container">
        <h2>DASHBOARD</h2>
        <div className="dates">
          <h2>{usuarioCokkie} {abrebiadoAp}.</h2>
          <i className="bi bi-person-fill"></i>

          <ul className="navbar-nav">
            <li className="dropdown">
              
              <a className="dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-clipboard2-data"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li>
                  <Link className="dropdown-item" to="/a/adminP">
                    Reportes de usuarios
                  </Link>
                </li>
                <li><a className="dropdown-item" href="#">Reportes de Tramites</a></li>
                <li><a className="dropdown-item" href="#">Reportes de Tickets</a></li>
              
              </ul>
            </li>
          </ul>
        
        </div>
      </nav>

        <div className="row ">
        <div className="col-lg-4 col-md-4 ">
           <div className="cardinfo">
             <i className="bi bi-ticket-detailed-fill"></i>
             <h2>{countTicket.countAllTicketAgency}</h2>
             <h3>TICKETS</h3>
           </div>
        </div>
        <div className="col-lg-4 col-md-4 ">
          <div className="cardinfo">
             <i className="bi bi-ticket-detailed-fill"></i>
             <h2>{contU.conteo}</h2>
             <h3>USUARIOS </h3>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 ">
          <div className="cardinfo">
             <i className="bi bi-ticket-detailed-fill"></i>
             <h2>{countTicket.countticketsAttendedDay}</h2>
             <h3>TICKETS DE HOY</h3>
           </div>
        </div>
      </div>
      <div className="graphic">
        <Chart
        type='bar'
        options={chartOptions}
        data={chartDAta}
        width="100" height="25"
        />
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 ">
           <div className="cardinfo">
             <i className="bi bi-ticket-detailed-fill"></i>
             <h2>{countTicket.countticketsAttendedDay}</h2>
             <h3>Atendidos</h3>
           </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="cardinfo">
             <i className="bi bi-ticket-detailed-fill"></i>
             <h2>{countTicket.countticketsWaitDay}</h2>
             <h3>En espera </h3>
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="cardinfo">
             <i className="bi bi-ticket-detailed-fill"></i>
             <h2>{countTicket.countticketsNoAtendidosDay}</h2>
             <h3>No Atendidos</h3>
           </div>
        </div>
      </div>
    </div>
  )
}
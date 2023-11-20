import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import logo_azul from "../../img/logo_azul.png";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(false);
  const { store, actions } = useContext(Context);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    console.log(store.user_login)

  },[store.user_login])

 


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" > 
      <div className="container">
        <div>
        <Link to="/"><img src={logo_azul}></img>
          
        </Link>
        </div>
        <div className="botones_navbar">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={menuOpen ? "true" : "false"}
        >
          <i class="fa-solid fa-bars"></i>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <div className="container_navbar_right d-flex">
            <div className="dropdown">
              <button
                className="btn_comunidad dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Comunidad
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Chat</a></li>
                <li><a className="dropdown-item" href="#">Eventos</a></li>
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn_recursos dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Herramientas
              </button>
              <ul className="dropdown-menu">
                <Link to='/readings'>
                  <li><a className="dropdown-item" href="#">Lecturas</a></li>
                </Link>
                <Link to='/meditations'>
                  <li><a className="dropdown-item" href="#">Meditaciones guiadas</a></li>
                </Link>
                <Link to='/podcast'>
                  <li><a className="dropdown-item" href="#">Podcast</a></li>
                </Link>
              </ul>
            </div>

            <div>
              <Link to="/appointment">
                <button className="appointment_btn">
                  Citas
                </button>
              </Link>
            </div>

            <div className="login">
                {store.user_login != null ? (
                  <>
                    <div className="dropdown">
                      <button
                        className="btn_recursos dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        //{store.user_login.charAt(0).toUpperCase()} {/* Mostrar la primera letra del correo pero aqui lo q esta es el token encriptado*/}
                      >
                        Nombre
                      </button>
                      <ul className="dropdown-menu">
                        <Link to='/datos_personales'>
                          <li><a className="dropdown-item" href="#">Mis Datos</a></li>
                        </Link>
                        <Link to='/favorites'>
                          <li><a className="dropdown-item" href="#">Mis favoritos</a></li>
                        </Link>
                        <Link to='/my_appointment'>
                          <li><a className="dropdown-item" href="#">Mis citas</a></li>
                        </Link>
                        <Link to='/my_event'>
                          <li><a className="dropdown-item" href="#">Mis eventos</a></li>
                        </Link>
                        <Link to='/todo_list'>
                          <li><a className="dropdown-item" href="#">Mi Todo-List</a></li>
                        </Link>
                        <Link to="/">
                      <button className="nav_btn" onClick={()=> actions.borrarToken()}>
                        Cerrar sesión
                      </button>
                    </Link>
                      </ul> 
                    </div>        
                    
                  </>
                ) : (
                  <Link to='/login-user'>
                    <button className="nav_btn">
                      <i className="fa-regular fa-user"></i> Ingresar
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
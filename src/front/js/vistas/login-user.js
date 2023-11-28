import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import home from "../../img/home.jpg";


export const Login_user = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Condiciona al usuario para completar los campos
    if (user.email.trim() === "" || user.password.trim() === "") {
      setError("Rellene los campos requeridos.");
      return;
    }

    // Se ejecuta el fetch desde flux para verificar al usuario e iniciar sesión
    const success = await actions.loginUser(user);

    if (success) {
      setSubmit(true);
      setTimeout(() => {
        setSubmit(false);
        navigate("/user-information");
      }, 500);
    } else {
      setError("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
      setSubmit(false); 
    }

    setUser('');
  };
  const handleEmailChange = (e) => {
    setError(""); // Limpiar el error cuando se cambia el correo electrónico
    setUser({ ...user, email: e.target.value });
    
  };
  
  const handlePasswordChange = (e) => {
    setError(""); // Limpiar el error cuando se cambia la contraseña
    setUser({ ...user, password: e.target.value });
  };
  return (
    <>
      <div className="contenedor">
        <div className="imagen user-login" style={{ backgroundImage: `url(${home})` }}>
          <div className="row principal-formulario">
            <div className="col-sm-12 col-md-4 formulario-user">
              <h1 className="titulo-user"><strong>Pa'lante</strong></h1>
              <form className="form-inputs" onSubmit={handleSubmit}>
                <div className="container-inputs">
                  <div className="detalle-input">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="exampleInputEmail1"
                      placeholder="Correo Electrónico"
                      aria-describedby="emailHelp"
                      value={user.email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="detalle-input">
                    <input
                      type="password"
                      className="form-control"
                      name="Password"
                      id="exampleInputPassword1"
                      placeholder="Contraseña"
                      aria-describedby="emailHelp"
                      value={user.password}
                      onChange={handlePasswordChange} 
                    />
                  </div>
                </div>
                <button className="boton-login">Inicia sesión</button>
                {error && <p className="alert alert-danger p-1 text-center mt-1" role="alert">{error}</p>}
                {submit && !error && <p className="alert alert-success p-1 text-center mt-1" role="alert">Sesión Iniciada</p>}
                <Link to="/recover-password">
                  <p className="opcion-contraseña">¿Has olvidado tu contraseña?</p>
                </Link>
              </form>
              <p className="ruta-register">¿Aún no tienes cuenta? <Link to="/signup-user" className="ruta-registers">Regístrate</Link></p>
            </div>
            <div class="col-sm-12 col-md-8"></div>
          </div>
        </div>
      </div>
    </>
  );
};
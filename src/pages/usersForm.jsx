import React, {  useRef, useState }  from "react";
import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";

const Formulario = () => {
  
  const formRef = useRef(null);  

    const [formulario, setFormulario] = useState({
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      curp: '',
      rfc: '',
      codigoPostal: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      estado: '',
      delegacion: '',
      colonia: '',
    });


  const [errores, setErrores] = useState({});

  const soloLetras = (input) => /^[a-zA-Z ]+$/.test(input);
  const soloNumeros = (input) => /^\d+$/.test(input);
  const alfanumerico = (input) => /^[a-zA-Z0-9 ]+$/.test(input);
  const validarCURP = (curp) => /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/.test(curp);
  const validarRFC = (rfc) => /^([A-ZÑ&]{3,4})?(?:\d{2})(?:\d{2})(?:\d{2})(?:[A-Z\d]{3})?$/.test(rfc);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.id]: e.target.value
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!soloLetras(formulario.nombre)) nuevosErrores.nombre = 'Este campo es requerido';
    if (!soloLetras(formulario.primerApellido)) nuevosErrores.primerApellido = 'Este campo es requerido';
    if (!soloLetras(formulario.segundoApellido)) nuevosErrores.segundoApellido = 'Este campo es requerido';
    if (!validarCURP(formulario.curp)) nuevosErrores.curp = 'CURP inválida';
    if (!validarRFC(formulario.rfc)) nuevosErrores.rfc = 'RFC inválido';

    if (!soloLetras(formulario.estado)) nuevosErrores.estado = 'Este campo es requerido';
    if (!alfanumerico(formulario.calle)) nuevosErrores.calle = 'Este campo es requerido y números';
    if (!soloLetras(formulario.delegacion)) nuevosErrores.delegacion = 'Este campo es requerido';
    if (!soloLetras(formulario.colonia)) nuevosErrores.colonia = 'Este campo es requerido';

    if (!soloNumeros(formulario.codigoPostal) || formulario.codigoPostal.length !== 5) nuevosErrores.codigoPostal = 'Debe ser un número de 5 dígitos';
    if (!soloNumeros(formulario.numeroExterior) || formulario.numeroExterior <= 5) nuevosErrores.numeroExterior = 'Debe ser un número de 5 dígitos';

    if (!alfanumerico(formulario.numeroInterior) || formulario.numeroInterior.length > 10) nuevosErrores.numeroInterior = 'Debe ser alfanumérico de hasta 10 caracteres';

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      Swal.fire({
        title: "Campos validados correctamente",
        icon: "success"
      });
      enviarFormulario(); 
      // Después de enviar los datos se limpia form o reset form
      setFormulario({
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        curp: '',
        rfc: '',
        codigoPostal: '',
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        estado: '',
        delegacion: '',
        colonia: '',
      });
    } else {
      Swal.fire({
        title: "Existen campos por validar",
        icon: "warning"
      });
    }
  };

  const enviarFormulario = async () => {
    const data = {
      infoUsuario: {
        Nombre: formulario.nombre,
        PrimerApellido: formulario.primerApellido,
        SegundoApellido: formulario.segundoApellido,
        CURP: formulario.curp,
        RFC: formulario.rfc
      },
      Domicilio: {
        CodigoPostal: formulario.codigoPostal,
        Calle: formulario.calle,
        NumeroExterior: formulario.numeroExterior,
        NumeroInterior: formulario.numeroInterior,
        Estado: formulario.estado,
        Delegacion: formulario.delegacion,
        Colonia: formulario.colonia,
      }
    };
    try {
        let config = {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
    }
    let res = await fetch('http://httpbin.org/post', config)
    let json = await res.json();
    console.log(json);
    } catch (error) {
        console.log(error);
    }

  };

  const arrayEstados = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Estado de México",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ];

  return (
    <div className="container">
        <form className=" row g-3 " style={{ justifyItems:'center', justifyContent:'center', alignItems:'center' }} onSubmit={handleSubmit} ref={formRef}>
        <h1 style={{ textAlign:'center' }}>Identicación</h1>
                <div className="col-md-4 " >
                <label className="form-label fw-bolder" htmlFor="nombre" style={{color: '#0B5ED7'}}>Nombre*</label>
                <input
                    className="form-control"
                    type="text"
                    id="nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                />
                    {errores.nombre && <span style={{ color: 'red' }}>{errores.nombre}</span>}
                </div>

                <div className="col-md-4">
                <label className="form-label fw-bolder " htmlFor="primerApellido" style={{color: '#0B5ED7'}}>Primer Apellido*</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="primerApellido"
                    value={formulario.primerApellido}
                    onChange={handleChange} 
                />
                    {errores.primerApellido && <p style={{color: 'red'}}>{errores.primerApellido}</p>}
                </div>

                <div className="col-md-4">
                <label className="form-label fw-bolder" style={{color: '#0B5ED7'}}>Segundo Apellido*</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="segundoApellido"
                    value={formulario.segundoApellido}  
                    onChange={handleChange} 
                />
                    {errores.segundoApellido && <p style={{color: 'red'}}>{errores.segundoApellido}</p>}
                </div>

                <div className="col-6">
                <label className="form-label fw-bolder" style={{color: '#0B5ED7'}} >CURP*</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="curp"
                    maxLength={18} 
                    value={formulario.curp}
                    onChange={handleChange}
                />
                        {errores.curp && <p style={{color: 'red'}}>{errores.curp}</p>}
                </div>

                <div className="col-6">
                <label className="form-label fw-bolder" style={{color: '#0B5ED7'}}>RFC (con homoclave)*</label>
                <input 
                    type="text" 
                    className="form-control"  
                    id="rfc"
                    maxLength={13} 
                    value={formulario.rfc}
                    onChange={handleChange}
                />
                    {errores.rfc && <p style={{color: 'red'}}>{errores.rfc}</p>}
                </div>

                <div className="col-3">
                <label className="form-label fw-bolder" style={{color: '#0B5ED7'}}>Codigo Postal*</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="codigoPostal"
                    value={formulario.codigoPostal}
                    onChange={handleChange}
                />
                    {errores.codigoPostal && <p style={{color: 'red'}}>{errores.codigoPostal}</p>}
                </div>

                <div className="col-9">
                <label className="form-label fw-bolder" style={{color: '#0B5ED7'}}>Calle*</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="calle"
                    value={formulario.calle}
                    onChange={handleChange} 
                />
                    {errores.calle && <p style={{color: 'red'}}>{errores.calle}</p>}
                </div>

                <div className="col-2">
                <label className="form-label fw-bolder" style={{color: '#0B5ED7'}}>Número exterior*</label>
                <input 
                    type="number" 
                    id="numeroExterior"
                    className="form-control" 
                    value={formulario.numeroExterior}
                    onChange={handleChange} 
                />
                    {errores.numeroExterior && <p style={{color: 'red'}}>{errores.numeroExterior}</p>}
                </div>

                <div className="col-2">
                <label className="form-label fw-bolder" style={{color: '#0B5ED7'}}>Número interior*</label>
                <input 
                    type="text" 
                    id="numeroInterior"
                    value={formulario.numeroInterior}
                    className="form-control" 
                    onChange={handleChange} 
                />
                    {errores.numeroInterior && <p style={{color: 'red'}}>{errores.numeroInterior}</p>}
                </div>

                <div className="col-8">
                <label className="form-label fw-bolder" style={{color: '#0B5ED7'}}>Estado*</label>
                <select 
                    className="form-select" 
                    id="estado"
                    value={formulario.estado}
                    onChange={handleChange} 
                    >
                        <option  ></option>
                        {arrayEstados.map((estado, index) => <option value={estado} key={index}>{estado}</option>)}
                </select>
                    {errores.estado && <p style={{color: 'red'}}>{errores.estado}</p>}
                </div>

                <div className="col-6">
                <label className="form-label fw-bolder" style={{color: '#0B5ED7'}}>Delegación / Municipio*</label>
                <input 
                    type="text" 
                    id="delegacion"
                    value={formulario.delegacion}
                    className="form-control" 
                    onChange={handleChange} 
                />
                    {errores.delegacion && <p style={{color: 'red'}}>{errores.delegacion}</p>}
                </div>

                <div className="col-6">
                <label className="form-label fw-bolder" style={{color: '#0B5ED7'}}>Colonia*</label>
                <input 
                    type="text" 
                    id="colonia"
                    value={formulario.colonia}
                    className="form-control" 
                    onChange={handleChange} 
                />
                    {errores.colonia && <p style={{color: 'red'}}>{errores.colonia}</p>}
                </div>
        <div style={{ justifyItems:'center', justifyContent:'center', alignItems:'center', display: 'flex' }}>
            <button className="btn btn-primary" type="submit" >Guardar</button>
        </div>
    </form>
    </div>
    
  );
};

export default Formulario;
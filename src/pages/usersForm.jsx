import React, { useState }  from "react";
import "bootstrap/dist/css/bootstrap.css";

const Formulario = () => {

    const [formulario, setFormulario] = useState({
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      curp: '',
      rfc: '',
      codigoPostal: '',
      numeroExterior: '',
      numeroInterior: '',
      estado: '',
      delegacion: '',
      colonia: ''
    });


  const [errores, setErrores] = useState({});

  const soloLetras = (input) => /^[a-zA-Z ]+$/.test(input);
  const soloNumeros = (input) => /^\d+$/.test(input);
  const alfanumerico = (input) => /^[a-zA-Z0-9 ]+$/.test(input);
  //const validarCURP = (curp) => /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/(curp);
  //const validarRFC = (rfc) => /^([A-ZÑ&]{3,4})?(?:\d{2})(?:\d{2})(?:\d{2})(?:[A-Z\d]{3})?$/(rfc);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.id]: e.target.value
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!soloLetras(formulario.nombre)) nuevosErrores.nombre = 'Solo se permiten letras';
    if (!soloLetras(formulario.primerApellido)) nuevosErrores.primerApellido = 'Solo se permiten letras';
    if (!soloLetras(formulario.segundoApellido)) nuevosErrores.segundoApellido = 'Solo se permiten letras';
    if (!soloLetras(formulario.estado)) nuevosErrores.estado = 'Solo se permiten letras';
    if (!soloLetras(formulario.delegacion)) nuevosErrores.delegacion = 'Solo se permiten letras';
    if (!soloLetras(formulario.colonia)) nuevosErrores.colonia = 'Solo se permiten letras';

    if (!alfanumerico(formulario.curp)) nuevosErrores.curp = 'CURP inválida';
    if (!alfanumerico(formulario.rfc)) nuevosErrores.rfc = 'RFC inválido';

    if (!soloNumeros(formulario.codigoPostal) || formulario.codigoPostal.length !== 5) nuevosErrores.codigoPostal = 'Debe ser un número de 5 dígitos';
    if (!soloNumeros(formulario.numeroExterior) || formulario.numeroExterior <= 5) nuevosErrores.numeroExterior = 'Debe ser un número de 5 dígitos';

    if (!alfanumerico(formulario.numeroInterior) || formulario.numeroInterior.length > 10) nuevosErrores.numeroInterior = 'Debe ser alfanumérico de hasta 10 caracteres';

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      alert('Campos validados correctamente');
      enviarFormulario();
    } else {
      alert('Existen campos por validar');
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
    <form class=" row g-3 callout"   style={{width: '60rem'}} onSubmit={handleSubmit}>
        <h1>Identicación</h1>
                <div class="col-md-4 " >
                <label class="form-label" htmlFor="nombre">Nombre*</label>
                <input
                    class="form-control"
                    type="text"
                    id="nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                />
                    {errores.nombre && <span style={{ color: 'red' }}>{errores.nombre}</span>}
                </div>

                <div class="col-md-4">
                <label class="form-label " htmlFor="primerApellido">Primer Apellido*</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="primerApellido"
                    value={formulario.primerApellido}
                    onChange={handleChange} 
                />
                    {errores.primerApellido && <p style={{color: 'red'}}>{errores.primerApellido}</p>}
                </div>

                <div class="col-md-4">
                <label class="form-label">Segundo Apellido*</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="segundoApellido"
                    value={formulario.segundoApellido}  
                    onChange={handleChange} 
                />
                    {errores.segundoApellido && <p style={{color: 'red'}}>{errores.segundoApellido}</p>}
                </div>

                <div class="col-6">
                <label class="form-label">CURP*</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="curp"
                    maxLength={18} 
                    value={formulario.curp}
                    onChange={handleChange}
                />
                        {errores.curp && <p style={{color: 'red'}}>{errores.curp}</p>}
                </div>

                <div class="col-6">
                <label class="form-label">RFC*</label>
                <input 
                    type="text" 
                    class="form-control"  
                    id="rfc"
                    maxLength={13} 
                    value={formulario.rfc}
                    onChange={handleChange}
                />
                    {errores.rfc && <p style={{color: 'red'}}>{errores.rfc}</p>}
                </div>

                <div class="col-3">
                <label class="form-label">Codigo Postal*</label>
                <input 
                    type="number" 
                    class="form-control" 
                    id="codigoPostal"
                    value={formulario.codigoPostal}
                    onChange={handleChange}
                />
                    {errores.codigoPostal && <p style={{color: 'red'}}>{errores.codigoPostal}</p>}
                </div>

                <div class="col-9">
                <label class="form-label">Calle*</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="calle"
                    value={formulario.calle}
                    onChange={handleChange} 
                />
                    {errores.calle && <p style={{color: 'red'}}>{errores.calle}</p>}
                </div>

                <div class="col-2">
                <label class="form-label">Número exterior*</label>
                <input 
                    type="number" 
                    id="numeroExterior"
                    class="form-control" 
                    value={formulario.numeroExterior}
                    onChange={handleChange} 
                />
                    {errores.numeroExterior && <p style={{color: 'red'}}>{errores.numeroExterior}</p>}
                </div>

                <div class="col-2">
                <label class="form-label">Número interior*</label>
                <input 
                    type="text" 
                    id="numeroInterior"
                    value={formulario.numeroInterior}
                    class="form-control" 
                    onChange={handleChange} 
                />
                    {errores.numeroInterior && <p style={{color: 'red'}}>{errores.numeroInterior}</p>}
                </div>

                <div class="col-8">
                <label class="form-label">Estado*</label>
                <select 
                    class="form-select" 
                    id="estado"
                    value={formulario.estado}
                    onChange={handleChange} 
                    >
                        <option selected >Selecciona Estado</option>
                        {arrayEstados.map((estado) => <option value={estado}>{estado}</option>)}
                </select>
                    {errores.estado && <p style={{color: 'red'}}>{errores.estado}</p>}
                </div>

                <div class="col-6">
                <label class="form-label">Delegación / Municipio*</label>
                <input 
                    type="text" 
                    id="delegacion"
                    value={formulario.delegacion}
                    class="form-control" 
                    onChange={handleChange} 
                />
                    {errores.delegacion && <p style={{color: 'red'}}>{errores.delegacion}</p>}
                </div>

                <div class="col-6">
                <label class="form-label">Colonia*</label>
                <input 
                    type="text" 
                    id="colonia"
                    value={formulario.colonia}
                    class="form-control" 
                    onChange={handleChange} 
                />
                    {errores.colonia && <p style={{color: 'red'}}>{errores.colonia}</p>}
                </div>
        <div>
            <button className="btn btn-primary" type="submit">Enviar</button>
        </div>
    </form>
  );
};

export default Formulario;
import React from "react";
import ReactDOM from "react-dom";
import "./login.css"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Card} from 'reactstrap'
import axios from 'axios'


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }
  handleChange(event) {
    const target = event.target;

    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault(event);
    const API = "http://localhost:4000/graphql"

    axios({
        url:API,
        method:'post',
        data:{
            query:`
            mutation {
               login(data:"${[this.state.email,this.state.password]}"){
                id
                nombre
                apellidoP
                apellidoM
                message
               } 
            }
            `
        }
    }).then(datos=>{
        console.log("hay datos" , datos)
        if(datos.data.data.login.message == "login exitoso"){
            localStorage.setItem("nombre",datos.data.data.login.nombre)
            localStorage.setItem("apellidoP",datos.data.data.login.apellidP)
            localStorage.setItem("apellidoM",datos.data.data.login.apellidoM)
            localStorage.setItem("id",datos.data.data.login.id)

            this.props.history.push("/dashboard")
        }else if(datos.data.data.login.message == "error" ){
            alert("error usuario y contraseña incorrectos")
        }
    }).catch(err=>{
        console.log("hubo un error" , err.response) 
    })


    console.log("que nos llega",this.state);
  }
  clearForm() {
    this.setState({
      email: "",
      password: ""
    });
  }
  render() {
    return (
      <div style={{width:500,marginLeft:400,marginTop:100}}>
      <Card>  
      <form
        className="needs-validation"
        noValidate
        onSubmit={this.handleSubmit}
        style={{padding:30}}
      >
       <h1> Iniciar Sesión</h1>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Correo</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            placeholder="Ingrese su correo"
            value={this.state.email}
            onChange={this.handleChange}
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            required
            placeholder="Ingrese su contraseña"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
        <button
          type="button"
          className="btn btn-success outline float-right"
          onClick={(e) => this.props.history.push("/")}
        >
          Comprar
        </button>
      </form>
      </Card>
      </div>  
    );
  }
}

export default Form

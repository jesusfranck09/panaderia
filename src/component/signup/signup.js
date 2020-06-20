import React, { Component } from 'react';
import {Form, FormGroup, Button, Input,Card, CardHeader, CardBody} from 'reactstrap'
import axios from 'axios'
class Signup extends Component {
    constructor(props){
        super(props)
        this.state= {
          value1:'',
          value2:'',
          value3:'',
          value4:'',
          value5:'',

        }
        this.onSubmitBtn = this.onSubmitBtn.bind(this);
    }

    onChangeInput = (e) => {
        const {id,value} = e.target
        this.setState({
            [id]:value
        })
    }

    onSubmitBtn(e){
        e.preventDefault();
        const API = "http://localhost:4000/graphql"
        axios({
            url:API,
            method:'post',
            data:{
                query:`
                mutation {
                    signup(data:"${[this.state.value1,this.state.value2,this.state.value3,this.state.value4,this.state.value5]}"){
                    message
                    } 
                }
                `
            }
        }).then(datos=>{
            if(datos.data.data.signup.message=='registro exitoso'){
                alert("usuario registrado exitosamente ")
                this.props.history.push("/dashboard")
            }else if(datos.data.data.signup.message=='el usuario ya existe'){
                alert("El usuario ingresado ya existe,por favor verifique sus datos")
            }
            console.log("datos", )
        }).catch(err=>{
            console.log("error" , err.response)
        })  
    }
  render(){
      return(
        <Card style ={{marginTop:50 , width:500,height:500,marginLeft:400,backgroundColor: '#6DF7B6', borderColor: '#333' }}>
        <CardHeader><h4><strong>Registro de usuarios</strong></h4></CardHeader> 
        <CardBody>
        <Form onSubmit={this.onSubmitBtn}>   
        <FormGroup>
          
            <Input style={{marginTop:20}} placeholder="Nombre" id="value1"type ="text" value={this.state.value1}  onChange={this.onChangeInput}></Input>
            <Input style={{marginTop:20}} placeholder="Apellido Paterno" id="value2"type ="text" value={this.state.value2}  onChange={this.onChangeInput}></Input>
            <Input style={{marginTop:20}} placeholder="Apellido Materno" id="value3"type ="text" value={this.state.value3}  onChange={this.onChangeInput}></Input>
            <Input style={{marginTop:20}} placeholder="Correo" id="value4"type ="email" value={this.state.value4}  onChange={this.onChangeInput}></Input>
            <Input style={{marginTop:20}} placeholder="Contraseña" id="value5"type ="password" value={this.state.value5}  onChange={this.onChangeInput}></Input>

            <Button style={{marginTop:60,marginLeft:180}} type="submit" outlined color="info">agregar</Button>
           
           
        </FormGroup> 
        </Form>
        </CardBody>  
        </Card>
      )
  }  
}

export default Signup
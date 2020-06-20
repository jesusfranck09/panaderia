import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col, Form, FormGroup, Label, Input, FormText,Modal, ModalHeader, ModalBody, ModalFooter
  } from 'reactstrap'
  ;
import axios from 'axios'

class Dashoard extends Component {
    constructor(props){
        super(props)
        this.state= {
            value1:'',
            value2:'',
            value3:'',
            value4:'',
            registroExitoso:'0',
            modal:false,
            totalBolillo:0,
            totalRoles:0,
            totalConchas:0,
            totalCuernitos:0,
            botonDisabled:'1',
            bolillos:0,
            roles:0,
            conchas:0,
            cuernitos:0

        }
        this.onSubmitBtn = this.onSubmitBtn.bind(this);
        this.ventas = this.ventas.bind(this);
        this.ticket = this.ticket.bind(this);

    }
    onChangeInput = (e) => {
        const {id,value} = e.target
        this.setState({
            [id]:value
        })

       
    }

    onSubmitBtn(e){
        e.preventDefault();
        
        this.setState({bolillos:this.state.value1})
        this.setState({roles:this.state.value2})
        this.setState({conchas:this.state.value3})
        this.setState({cuernitos:this.state.value4})

    }

    ticket(){
        this.setState({modal:true})
        this.setState({botonDisabled:'1'})
        this.setState({registroExitoso:''})
    }

    ventas(){
        var bolillos = 2
        var roles = 7
        var conchas  = 2.5
        var cuernito =  5

        var totalBolillo = 2 * this.state.value1
        var totalRoles =7 * this.state.value2
        var totalconchas =2.5 * this.state.value3
        var totalCuernitos =5 * this.state.value4

        this.setState({totalBolillo:totalBolillo})
        this.setState({totalRoles:totalRoles})
        this.setState({totalConchas:totalconchas})
        this.setState({totalCuernitos:totalCuernitos})

        console.log("total de los bolillos" , totalBolillo )
        const API = "http://localhost:4000/graphql"
        axios({
            url:API,
            method:'post',
            data:{
                query:`
                mutation {
                   ventas(data:"${[totalBolillo,totalRoles,totalconchas,totalCuernitos,this.state.value1,this.state.value2, this.state.value3,this.state.value4
                   ]}"){
                   message
                   } 
                }
                `
            }
        }).then(datos=>{
        if(datos.data.data.ventas.message=='registro Exitoso'){
            this.setState({registroExitoso:'1'})
            this.setState({botonDisabled:0})
        }
        }).catch(err=>{
            console.log("hubo un error" , err.response) 
        })  
    }
    cerrar(){
        this.setStat({modal:false})
    }
render() {
    let subtotal = this.state.totalBolillo+this.state.totalRoles+this.state.totalConchas+this.state.totalCuernitos
    let iva = subtotal*.16
    let total = subtotal+iva

    let modal =  <div>
    <Modal isOpen={this.state.modal}  >
      <ModalHeader >Detalles de la Compra</ModalHeader>
      <ModalBody>
        <table>
           <tr>
           <td>
            Piezas de Bolillo : {this.state.value1}   
           </td>
           <td>
           Piezas de Roles : {this.state.value2}   
           </td>
           <td>
           Piezas de Conchas : {this.state.value3}   
           </td>
           <td>
           Piezas de Cuernitos : {this.state.value4}   
           </td>
           </tr> 
        </table>
      </ModalBody>
      <ModalFooter>
          
          <Col width="80%">
          Subtotal : ${subtotal.toFixed(2)} <br/>
          iva : ${iva.toFixed(2)} <br/>
          total : ${total.toFixed(2)} 
          </Col>
          <Col  width="20%">
         <Button  color="secondary" onClick={e=>this.setState({modal:false})}>Cerrar</Button>
         </Col>
        
      </ModalFooter>
    </Modal>
  </div>
    let boton;
    if(this.state.registroExitoso=='1'){
        boton =<Button color="warning" onClick={this.ticket}>Generar Ticket</Button>
    }
    return(

   < div style={{marginLeft:10}}>
  <Row style ={{marginTop:20 , marginLeft:1200}}><a href="./login"> Iniciar sesión</a></Row>
   <Row style ={{marginTop:30}}>
       
    <Col>
      <Card style = {{width:300,height:300}}>
        <CardImg top width="100%" src="https://i.pinimg.com/236x/c4/ec/f6/c4ecf6780b931e5bfe6401fe276fe04e.jpg" alt="Card image cap" />
        <CardBody>
          <CardSubtitle>Bolillos</CardSubtitle>
          <CardText>$2 Unidad</CardText>
          <Form onSubmit={this.onSubmitBtn}>   
            <FormGroup>
                <br/>
                <br/>
                <br/>

                <Row>
                <Col>   
                <Input placeholder="Ingrese cantidad" id="value1"type ="number" value={this.state.value1}  onChange={this.onChangeInput}>
            
                </Input>
                </Col> 
                <Button type="submit" outline color="primary">agregar</Button>
                </Row>
                <br/>
                <Row style={{marginLeft:20}}>
                 <strong>Carrito {this.state.bolillos} bolillos</strong>   
                </Row>
            </FormGroup> 
            </Form>
         </CardBody>
      </Card>

      </Col>
      <Col>
      <Card style = {{width:300,height:300}}>
        <CardImg top width="100%" src="https://i.pinimg.com/236x/a5/14/ee/a514ee827d8d764a1d6ba03668539cd3--panes-ideas-manualidades.jpg" alt="Card image cap" />
        <CardBody>
           <CardSubtitle>Roles de Canela</CardSubtitle>
          <CardText>$7 Unidad</CardText>
          <Form onSubmit={this.onSubmitBtn}>   
            <FormGroup>
                <br/>
                <br/>
                <Row>
                <Col>
                <Input  placeholder="Ingrese cantidad" id="value2"type ="number" value={this.state.value2}  onChange={this.onChangeInput}>
            
                </Input>
                </Col>
                <Button type="submit" outline color="primary">agregar</Button>
                </Row>
                <Row style={{marginLeft:20,marginTop:30}}>
                 <strong>Carrito {this.state.roles} roles</strong>   
                </Row>
            </FormGroup> 
            </Form>
         </CardBody>
      </Card>
      </Col>
      <Col>
      <Card style = {{width:300,height:100}}>
        <CardImg top width="100%" src="https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2016/09/panes.jpg" alt="Card image cap" />
        <CardBody>
           <CardSubtitle>Pan tradicional</CardSubtitle>
          <CardText>$2.5 Unidad</CardText>
          <Form onSubmit={this.onSubmitBtn}>   
            <FormGroup>
                <br/>
                <br/>
                <Row>
                <Col>    
                <Input placeholder="Ingrese cantidad" id="value3" type ="number" value={this.state.value3}  onChange={this.onChangeInput}>
            
                </Input>
                </Col>
                <Button type="submit" outline color="primary" >Agregar</Button>
               
                </Row>
                <Row style={{marginLeft:20,marginTop:30}}>
                 <strong>Carrito {this.state.conchas} Conchas</strong>   
                </Row>
            </FormGroup> 
            </Form>
           
         </CardBody>
      </Card>
      </Col>
      
      <Col>
      <Card style = {{width:300,height:300}}>
        <CardImg top width="100%" src="https://i.pinimg.com/236x/16/33/d1/1633d1ff2c63a838b2517e1ceab010c8--mexican-pastries-mexican-desserts.jpg" alt="Card image cap" />
        <CardBody>
          <CardSubtitle>Cuernitos Fino</CardSubtitle>
          <CardText>$5 Unidad</CardText>
          <Form onSubmit={this.onSubmitBtn}>   
            <FormGroup>
                <br/>
                <br/>
                <Row>
                <Col>
                <Input placeholder="Ingrese cantidad" id="value4" type ="number" value={this.state.value4}  onChange={this.onChangeInput}>
            
                </Input>
                </Col>
                <Button type="submit" outline color="primary">Agregar</Button>
                </Row>
                <Row style={{marginLeft:20,marginTop:30}}>
                 <strong>Carrito {this.state.cuernitos} Cuernitos</strong>   
                </Row>
            </FormGroup> 
            </Form>
         </CardBody>
      </Card>
      </Col>
     
      </Row>
    <Row style ={{marginTop:200,marginLeft:500}}><Col>Total productos = {parseInt(this.state.bolillos)+parseInt(this.state.roles)+parseInt(this.state.conchas)+parseInt(this.state.cuernitos)}</Col> <Col><Button  color="success" outline onClick={this.ventas} disabled={!this.state.botonDisabled}>Comprar productos</Button></Col><Col>{boton}</Col><Col><Button  color="success" outline onClick={e=>window.location.reload()} >Limpiar carrito</Button></Col>
</Row>
     {modal}
    </div>
    )
}

}

export default Dashoard

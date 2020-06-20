import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col,
  } from 'reactstrap';
  import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Dashoard extends Component {
    constructor(props){
      super(props)
      this.state={
        arrayVentas:[]
      }
    }   

componentWillMount(){
  const API = "http://localhost:4000/graphql"
  var id = localStorage.getItem("id")
  axios({
      url:API,
      method:'post',
      data:{
          query:`
          query {
             getVentas(data:"${[id]}"){
              id
              producto
              Cantidad
              Total
             } 
          }
          `
      }
  }).then(datos=>{
      this.setState({arrayVentas:datos.data.data.getVentas})
      console.log("estado" , this.state.arrayVentas)
  }).catch(err=>{
      console.log("hubo un error" , err.response) 
  })  
}  

render() {

    return(
   <React.Fragment>
   < div>
   
   <Row ><a style ={{marginTop:20 , marginLeft:100}} href="./signup">Registrar</a><a style ={{marginTop:20 , marginLeft:1000}} href="./login"> Cerrar sesión</a></Row>
   <Row style ={{marginTop:20}}>
    <Col>
      <Card style = {{width:300,height:300}}>
        <CardImg top width="100%" src="https://i.pinimg.com/236x/c4/ec/f6/c4ecf6780b931e5bfe6401fe276fe04e.jpg" alt="Card image cap" />
        <CardBody>
          <CardSubtitle>Bolillos</CardSubtitle>
          <CardText></CardText>
         </CardBody>
      </Card>
      </Col>
      <Col>
      <Card style = {{width:300,height:300}}>
        <CardImg top width="100%" src="https://i.pinimg.com/236x/a5/14/ee/a514ee827d8d764a1d6ba03668539cd3--panes-ideas-manualidades.jpg" alt="Card image cap" />
        <CardBody>
           <CardSubtitle>Roles de Canela</CardSubtitle>
          <CardText></CardText>
         </CardBody>
      </Card>
      </Col>
      <Col>
      <Card style = {{width:300,height:100}}>
        <CardImg top width="100%" src="https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2016/09/panes.jpg" alt="Card image cap" />
        <CardBody>
           <CardSubtitle>Pan tradicional</CardSubtitle>
          <CardText></CardText>
         </CardBody>
      </Card>
      </Col>
      <Col>
      <Card style = {{width:300,height:300}}>
        <CardImg top width="100%" src="https://i.pinimg.com/236x/16/33/d1/1633d1ff2c63a838b2517e1ceab010c8--mexican-pastries-mexican-desserts.jpg" alt="Card image cap" />
        <CardBody>
          <CardSubtitle>Cuernitos Fino</CardSubtitle>
          <CardText></CardText>
         </CardBody>
      </Card>
      </Col>
     
      </Row>
    </div>
    <div>
    <TableContainer style={{width:700,marginLeft:300,marginTop:40}} component={Paper}>
      <Table style={{width:700}} size="small" aria-label="a dense table center">
        <TableHead>
          <TableRow>
            <TableCell><strong>id</strong></TableCell>
            <TableCell align="right"><strong>Producto</strong></TableCell>
            <TableCell align="right"><strong>Cantidad</strong></TableCell>
            <TableCell align="right"><strong>Total</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.arrayVentas.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.producto}</TableCell>
              <TableCell align="right">{row.Cantidad}</TableCell>
              <TableCell align="right">{row.Total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </React.Fragment>   
    )
}

}

export default Dashoard
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//importando axios
import clienteAxios from './config/axios';

//Componentes
import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';

function App() {

  //State
const [citas, guardarCitas] = useState([]);
const [consultar, guardarConsultar] = useState(true);

useEffect( () => {
    if(consultar){
      const consultarAPI = () => {
        clienteAxios.get('/pacientes')
          .then(res => {
            guardarCitas(res.data);
            guardarConsultar(false);
          })
          .catch(error => {
            console.log(error);
          })
    }
    consultarAPI();
  }
}, [consultar]); 

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ () => <Pacientes citas={citas} />} />
        <Route exact path="/nueva" component={ () => <NuevaCita guardarConsultar={guardarConsultar} />} />
        <Route exact path="/cita/:id" component={Cita} />  
      </Switch>  
    </Router>
  );
}

export default App;

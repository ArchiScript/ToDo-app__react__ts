import React from 'react';
import "./App.scss"
import {Title} from "./components/title/Title";
import Form from "./components/form/Form";
import  Container  from './components/container/Container';

function App() {
  return (
    <>
    <Container>
    <Title txt="ToDo application"/>
  <Form/>

    </Container>
    
    </>
  
  );
}

export default App;

import React, {useState, useEffect} from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuid } from 'uuid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./TodoApp.css"

import Todo from "./Todo"


export default function TodoApp() {

    const [titulo, setTitulo] = useState('')
    const [todos, setTodos] = useState([])
    const [todosIcomplete, setTodosIncomplete] = useState([])
    const [todosComplete, setTodosComplete] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    // const submitElement = document.getElementById('submit');

    window.onkeydown = keySubmit
    function keySubmit(event){
        // event.preventDefault()

        let keyEnter = window.event.keyCode

        if(keyEnter === 13 && titulo.length > 0 && !isOpen){
            handleOnClick()
        }

        if(keyEnter === 13 ){
            return (keyEnter!==13);
        }

        
    }
    useEffect(() => {
        let newTodos = [];
        todos.forEach(element => {
            if(!element.complete){
                newTodos.push(element)
            }
        });
        setTodosIncomplete(newTodos);
      }, [todos]);

    function handleOnClick (e) {

        const todo = {
            id: uuid(),
            complete: false,
            titulo: titulo,
            date: new Date().toLocaleString()
        }
        setTodos([...todos, todo])
        setTitulo('')
    }

    function handleOnChange (event) {
        event.preventDefault()
        setTitulo(event.target.value)
    }

    function handleComplete (task) {

        let newTodos = todos;
        newTodos.forEach(element => {
            if(element.id === task.id){
                element.complete = true
            }
        });
        setTodos(newTodos);

        updateIncompleteTasks(newTodos)
        updateCompleteTasks(newTodos)
    }

    function modalIsOpen (res){
        setIsOpen(true)
    }

    function handleDelete (task) {

        const newTodos = todos.filter(todo => todo.id !== task.id);

        setTodos(newTodos);

        updateIncompleteTasks(newTodos)
        updateCompleteTasks(newTodos)
    }

    function updateIncompleteTasks (newTodosParam){
        let newTodos = [];
        newTodosParam.forEach(element => {
            if(!element.complete){
                newTodos.push(element)
            }
        });
        setTodosIncomplete(newTodos);
    }

    function updateCompleteTasks (newTodosParam){
        let newTodos = [];
        newTodosParam.forEach(element => {
            if(element.complete){
                newTodos.push(element)
            }
        });
        setTodosComplete(newTodos);
    }

    function editTask (task, newTitle){
        todos.forEach(element => {
            if (element.id === task.id) {
                element.titulo = newTitle
            }
        });
    }

    

    return (
    <div className="todoConteiner">
        <div className="TextFieldConteiner mt-1">
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Titulo" variant="outlined" onChange={handleOnChange}  value={titulo}/>
        </Box>
        <Button variant="contained" className="submitButton" id="submit" type="submit"   onClick={()=>handleOnClick()}>Subir</Button>
        </div>
        <div className="tittle">
        Tareas incompletas
        </div>
        <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
        <TableHead>
        <TableRow>
        <TableCell><b>Titulo</b></TableCell>
        <TableCell ><b>Fecha</b></TableCell>
        <TableCell  align="right"><b>Editar</b></TableCell>
        <TableCell align="right"><b>Terminar</b></TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {todos  && todosIcomplete.map((row) => (
            <Todo key={row.id} todoItem={row} handleComplete={handleComplete} editTask={editTask} modalIsOpen={modalIsOpen}/>
        ))}
        </TableBody>
        </Table>
        </TableContainer>
        {todos && todosComplete.length > 0 &&
        <><div className="tittle mt-5">
                    Tareas completas
                </div><Table size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Titulo</b></TableCell>
                                <TableCell><b>Fecha</b></TableCell>
                                <TableCell align="right"><b>Eliminar</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todosComplete && todosComplete.map((row) => (
                                <Todo todoItem={row} handleDelete={handleDelete} />
                            ))}
                        </TableBody>
                    </Table></>
    }
    </div>
    )
}
import React, {useState} from "react"

import "./TodoApp.css"
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function Todo({todoItem, handleComplete, handleDelete, editTask, modalIsOpen}) {

    const [titulo, setTitulo] = useState(todoItem.titulo)
    const [isDone] = useState(todoItem.complete)
    const [isEdit, setIsEdit] = useState(false)

    // const [todos, setTodos] = useState([])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    function handleCompleteTask (task){
       return handleComplete(task)
    }

    function handleDeleteTask (task){
       return handleDelete(task)
    }

    function openMoal (){
        setIsEdit(true)
        modalIsOpen(true)
    }

    function handleEditTask (task){
        editTask(task, titulo)
        setIsEdit(false)
    }

    function handleOnChange (event) {
        event.preventDefault()
        setTitulo(event.target.value)
    }

    const handleClose = () => setIsEdit(false);

    return ( <TableRow
        key={todoItem.titulo}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        {
        !isEdit && !isDone? 
        <><TableCell component="th" scope="row">
                {todoItem.titulo}
            </TableCell>
            <TableCell >
          {todoItem.date}
        </TableCell>
        <TableCell align="right">
                    <Button variant="contained" className="submitButton" size="small" onClick={() => openMoal(todoItem)}><EditIcon /></Button>
                </TableCell><TableCell align="right">
                    <Button variant="contained" className="submitButton" onClick={() => handleCompleteTask(todoItem)} size="small"><DoneAllIcon /></Button>
                </TableCell></>
        :
        <><TableCell component="th" scope="row">
        {todoItem.titulo}
    </TableCell>
    <TableCell >
  {todoItem.date}
</TableCell>
<TableCell align="right">
                <Button variant="contained" className="submitButton" size="small" onClick={()=>handleDeleteTask(todoItem)}><DeleteIcon /></Button>
            </TableCell>
            </>
            
        }
         <div>
      <Modal
        open={isEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Editar titulo</b>
          </Typography>
          <div className="editMoal mt-1">
          <TextField id="standard-basic" variant="standard" value={titulo} onChange={handleOnChange} />
          <Button variant="contained" className="submitButton mt-1" onClick={() => handleEditTask(todoItem)} size="small"><DoneIcon /></Button>
          </div>
        </Box>
      </Modal>
    </div>
        </TableRow> )
}
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import "./Input.css"

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const Input: React.FC<Props> = ({ task, setTask, handleAdd }) => {
  return (
    <form className="input-form" onSubmit={handleAdd}>
      <input type="text" placeholder='Add a Task' className='input-field' value={task} onChange={e => setTask(e.target.value)} />
      <button className='submit-button'><AddIcon sx={{ color: "black" }} /></button>
    </form>
  )
}

export default Input;
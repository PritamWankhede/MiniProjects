import React, { useState } from 'react'
import Style from './TodoList.module.css'
const TodoList = () => {
  let [input, setInput] = useState('');
  let [list, setList] = useState([]); 
  let [toggle,setToggle] =useState(true);
 
  const Addhandler=()=>{
       if(input){
        setList([...list,input]);
        setInput('');
     }}
 
  const handleEnter =(e)=>{
     if(e.keyCode===13){
        setList(input);
       Addhandler();
     }
  }

  const  deletehandler =(key)=>{
    let newList = [...list];
    newList.splice(key,1);
    setList(newList);
  }

  const edithandler =(index)=>{
     let newlistitem = list.find((ele)=>{
           return ele.index === index
     })
     console.log(newlistitem);
  }
  
  
  const deleteAlllist =() =>{
    setList([]);
  }

  return (
    <div className = {Style.container}>
        <div className={Style.innercontainer}>
           
             <input placeholder='Enter here...' type='text' value={input} onChange={e=>(setInput(e.target.value))} onKeyDown={handleEnter}/>
             <button className={Style.addbutton} onClick={Addhandler}>Add</button>
             <h1>Todo List.....</h1>
             <hr></hr>
             <div>
         
               {list.map((item,index)=>(
                  <li key={index}>{item}
                  <div>
                  <span className={Style.deleteicon} onClick={()=>deletehandler(index)}><i class="fa-solid fa-trash-can icon-delete"></i></span>
                  <span className={Style.editicon} onClick={()=>edithandler(index)}><i class="fa-solid fa-pen-to-square"></i></span>
                  </div>
                  </li>
               ))}
             <button onClick={deleteAlllist}>Delete</button> 
        </div>
      </div>
    </div>
  )
}
export default TodoList;
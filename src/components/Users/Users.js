import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:5000/users')
        .then(res=>res.json())
        .then(data =>setUsers(data))
    },[])

    // delte an user 

    const handleDeleteUser = id =>{

        const proceed = window.confirm('are you sure, you want to delete?');
        if(proceed){
            const url = `http://localhost:5000/users/${id}`
            fetch (url,{
                method:'DELETE',
               
            })
            .then(res=>res.json())
            .then(data =>{
                if(data.deletedCount>0){
                    alert('deleted successfully');
                    const remainingUsers= users.filter(user=>user._id !== id);
                    setUsers(remainingUsers)
    
                }
            })
        }

      
    }
    return (
        <div>
            <h2>{users.length}</h2>

            
                <ul>
                    {
                        users.map(user=> <li
                        key ={user._id}
                        >{user.email}
                        <Link to={`/users/update/${user._id}`} >Update</Link>
                        <button onClick={()=> handleDeleteUser(user._id)} >Delete</button>
                        </li> )
                    }
                </ul>
            
        </div>
    );
};

export default Users;
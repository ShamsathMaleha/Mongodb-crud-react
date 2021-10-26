import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const {id} = useParams();
    const [users, setUsers] = useState({});
    
    useEffect(()=>{
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data =>setUsers(data))
    },[])

    const handleUpdate = e =>{
        const url = `http://localhost:5000/users/${id}`;
        fetch(url,{
           method:'PUT',
           headers:{
               'content-type':'application/json'
           },
           body:JSON.stringify(users)

        })
        .then(res=>res.json())
        .then(data =>{
            if(data.modifiedCount > 0){
                alert('updated successfully')
                setUsers({})
            }
            console.log(data)
        })
        e.preventDefault()
    }

    // update user 
    const handleNameChange = (e)=>{
       const updateName = e.target.value
       const updatedUser = {name: updateName, email:users.email}
       setUsers(updatedUser)
    }
    const handleEmailChange = (e)=>{
       const updateEmail = e.target.value;
       const updatedUser = {name:users.name, email: updateEmail}
    //    const updatedUser = {...users}
    //    updatedUser.email = updateEmail;
       setUsers(updatedUser)
    }
    return (
        <div>
            <h2>This is Update User {users.name}</h2>
            <p><small>{id}</small></p>
            <form onSubmit={handleUpdate}>
                <input type="text" onChange={handleNameChange} value={users.name || ''} />
                <input type="email" onChange={handleEmailChange}  value={users.email || ''} />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default UpdateUser;
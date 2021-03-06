import React, {useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import AuthContext from './AuthContext';

const Signup =()=> {
    const navigate = useNavigate()
    const [user, setUser]= useState({
        firstName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("loggedIn");        
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

     const onSubmit = (e)=> {
        console.log(e)
        e.preventDefault()

        axios.post("https://project5-backend.herokuapp.com/user/signup", user)
            .then(response =>{ 
                console.log(response.data)
                console.log(response)
                if(response.statusText === "OK"){
                    localStorage.setItem("loggedIn", "true")
                    navigate("/")
                }
            })
       setUser({
            firstName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
    }
        return (
            <div>
                <div className="container">
                    <div className="form-div">
                        <form onSubmit={onSubmit} className="form">
                            <h3 className="Header">SignUp</h3>
                            <input type="text" placeholder="First Name" name="firstName" onChange={(e)=>handleInputChange(e)} value={user.firstName} className="form-control form-group" />
                            <input type="email" placeholder="Email" name="email" onChange={(e)=>handleInputChange(e)} value={user.email} className="form-control form-group" />
                            <input type="password" placeholder="Password" name="password" onChange={(e)=>handleInputChange(e)} value={user.password} className="form-control form-group" />
                            <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e)=>handleInputChange(e)} value={user.confirmPassword} className="form-control form-group" />
                            <button type="submit" className="delete-edit-btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
}

export default Signup
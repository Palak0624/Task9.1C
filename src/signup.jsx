import React, { useState } from "react";
import './signup.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "./firebase.jsx";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function SignUp() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [conf, setConf] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleClick = async (e)=>{
        e.preventDefault();

        if(pass !== conf){
            setMessage('Passwords do not match');
            return;
        }

        console.log("Email being passed:", email);
        try{
            await createUserWithEmailAndPassword(auth, email, pass);
            const user = auth.currentUser;
            console.log(user);
            if(user){
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    pass: pass,
                    name: name
                });
            }
            setMessage("User registered successfully");
            setIsRegistered(true);
        }
        catch(error) {
            setMessage(error.message);
        }
    };
    
    return(
        <div className="signup">
            <form onSubmit={handleClick}>
            <h3>Create a DEV@Deakin Account</h3>
                <div className="name_area">
                    <label >Name*</label>
                    <input
                        type="text"
                        className="name-input"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="email_area">
                    <label >Email*</label>
                    <input
                        type="email"
                        className="email_input"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="pass_area">
                    <label >Password*</label>
                    <input
                        type="password"
                        className="pass_input"
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                </div>
                <div className="pass_area">
                    <label >Confirm Password*</label>
                    <input
                        type="password"
                        className="pass_input"
                        onChange={(e) => setConf(e.target.value)}
                        required
                    />
                </div>
                    <button className="button" >Sign Up</button>

                {message && <p>{message}</p>}
                {isRegistered && ( <p>Registration successfull.</p>)}

                <p className="user">
                    Already a User? <Link to="/login">Log In here!</Link>
                </p> 
            </form>
            
        </div>
    );
}

export default SignUp;
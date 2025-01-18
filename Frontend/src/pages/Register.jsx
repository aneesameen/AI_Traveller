import { Link } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const registerUser = async (ev) => {
        ev.preventDefault();
        if (!name || !email || !password) {
            toast.error("Fill in Every detail")
        } else {
            try {
                await axios.post('/register', {
                    name,
                    email,
                    password
                });
                toast("Registration Successfull. Please Login")
            } catch (e) {
                toast.error("Registration failed. Please try again later");
            }
        }
        setName("");
        setEmail("")
        setPassword("");
    }

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4">SIGN UP</h1>
                <form onSubmit={registerUser} className="max-w-md mx-auto">
                    <input type="text"
                        placeholder="enter name"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email"
                        placeholder="enter@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Sign Up</button>
                    <div className="text-center py-2 text-gray-500">
                        Already have an account? <Link to={'/login'} className="text-black underline hover:text-primary">
                            LogIn
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register
import { Link } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const registerUser = async (ev) => {
        ev.preventDefault();
        if (!name || !email || !password) {
            toast.error("Fill in Every detail")
        } else {
            setLoading(true);
            try {
                await axios.post('/register', {
                    name,
                    email,
                    password
                });
                toast("Registration Successfull. Please Login")
                setLoading(false);
            } catch (e) {
                toast.error("Registration failed. Please try again later");
                setLoading(false);
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
                    <button
                        className={`${loading
                            ? "bg-blue-500 text-white rounded-lg flex items-center justify-center primary"
                            : "bg-blue-500 text-white rounded-lg flex items-center justify-center primary"
                            }`}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-4 border-t-4 border-white border-solid rounded-full animate-spin" />
                        ) : (
                            "SignUp"
                        )}
                    </button>
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
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios";
import { UserContext } from "../context/UserContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaHotel } from "react-icons/fa6";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner"



function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false);
    const [OpenBox, setOpenBox] = useState(false);

    const { setUser, user } = useContext(UserContext)


    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => console.log(error)
    })


    const getUserProfile = async (tokenInfo) => {
        try {
            await axios.post('/getUserInfo', {
                accessToken: tokenInfo?.access_token,
            })
                .then((response) => {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    setRedirect(true);
                    window.location.href = '/main';
                    setOpenBox(false);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        } catch (error) {
            console.log(error)
        }

    };


    // const getUserProfile = (tokenInfo) => {
    //     axios.post('http://localhost:4000/getUserInfo', {
    //         accessToken: tokenInfo?.access_token,
    //     })
    //         .then((response) => {
    //             localStorage.setItem('user', JSON.stringify(response.data));
    //             setRedirect(true);
    //             setOpenBox(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching user profile:', error);
    //         });
    // };



    const loginUser = async (ev) => {

        ev.preventDefault();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        try {
            const respone = await axios.post('/login', { email, password });
            setUser(respone.data);
            setRedirect(true)
        } catch (e) {
            toast.error("Login failed. Please try again")
        }
    }

    const loginViaGoogle = () => {
        setOpenBox(true)
    }


    if (redirect) {
        return <Navigate to={'/main'} />
    }

    return (
        < div className="mt-10 grow flex items-center justify-center" >
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4">LOGIN</h1>
                <form onSubmit={loginUser} className="max-w-md mx-auto">
                    <input type="email"
                        placeholder="enter@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="primary">Login</button>
                </form>
                <h2 className="text-center my-6">OR</h2>
                <div>
                    <button className="primary flex items-center justify-center gap-3" onClick={loginViaGoogle}><FcGoogle />Login Using Google</button>
                </div>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account? <Link to={'/signup'} className="text-black underline hover:text-primary">
                        Sign Up
                    </Link>
                </div>
            </div>


            <Dialog open={OpenBox} onOpenChange={setOpenBox}>
                <DialogContent className='bg-white'>
                    <DialogHeader>
                        <DialogDescription>
                            <div>
                                <img src="logo.svg" alt="" />
                                <h2 className='font-bold text-xl text-primary'>Traveller</h2>
                            </div>
                            <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                            <p>Sign in to the app with Google authentication securely</p>

                            <Button onClick={login} className="w-full mt-4 flex gap-4 item-center text-md">
                                <FcGoogle className="h-7 w-7" />Sign In With Google
                            </Button>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div >
    )
}
export default Login
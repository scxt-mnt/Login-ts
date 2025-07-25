import React, { useState } from 'react'
import global from '../publicInstance';
import { AxiosError } from 'axios';
import usernameLogo from '../assets/username.png'
import closedPassword from '../assets/closedPassword.png';
import passwordLogo from '../assets/password.png'


const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [toShow, setToShow] = useState<boolean>(false);
    const [toChange, setToChange] = useState<string>("");

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await global.post('/', { username: username, password: password });
            if (res.status === 201) {
                console.log('user created');
            }
        } catch (err) {
            const error = err as AxiosError
            if (error.response?.status === 409) {
                console.log(error.response.data);
            } if (error.response?.status === 500) {
                console.log(error.response.data);
            } else {
                console.log('unknown error', error);
            }
        }
    }

    const handleClick = () => {
        setToShow(state => !state);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setToChange(e.target.value);
    }


    return (
        <>
            <main className='h-screen grid place-items-center bg-indigo-300'>
                <form className='w-[350px] h-[420px] flex flex-col justify-center items-center gap-2 font-poppins bg-indigo-900/30 shadow-2xl shadow-white relative rounded-md backdrop-blur-md border boder-white ' onSubmit={createUser}>
                    <h1 className='text-[40px] font-bold absolute top-6 text-white'>login</h1>
                    <figure className='relative h-auto'>
                        <input placeholder='username' className={`  
                        border-2 border-blue-300 rounded-xl h-[45px] mt-[80px] outline-none placeholder:text-indigo-400 p-1`} value={username} onChange={(e) => setUsername(e.target.value)} type='username' /><br />
                        <img className='absolute top-[85px] right-[10.5px] h-[30px]' src={usernameLogo} alt="can't load image" />
                    </figure>

                    <figure className='relative'>
                        <input placeholder='password' className={` border-2 border-indigo-300 rounded-xl h-[45px] outline-none placeholder:text-indigo-400 p-1`} value={password} onChange={handleChange} type={`${toShow ? 'text' : 'password'}`} /><br />


                        {toChange &&
                            <>
                            {toShow === false &&
                            <button onClick={handleClick} className={`absolute top-3 right-3 `}>
                                <img className={`h-[25px]`} src={passwordLogo} alt="can't load image" />
                            </button>}
                            </>
                        }




                    {toChange && 
                    <>
                         {toShow === true && <button onClick={handleClick} className={`absolute top-3 right-3 h-auto`}>
                            <img className={`
                         h-[25px] `} src={closedPassword} alt="can't load image" />
                        </button>}
                    </> }
                       

                    </figure>
                    <div></div>
                    <button className='mt-4 bg-indigo-500 pl-10 pr-10 p-[5px] rounded-md font-bold text-white border '>sign in</button>
                    <p className='text-white mt-7'>no account? <a className='font-bold text-indigo-600 shadow-black shadow-xl shadow-white rounded-md' href="">sign up</a></p>

                </form>
            </main>
        </>
    )
}

export default Login

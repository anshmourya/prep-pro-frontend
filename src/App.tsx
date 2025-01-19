import { useKindeAuth } from "@kinde-oss/kinde-auth-react";


const App = () => {
  const { login, register } = useKindeAuth();
  return (
    <>
      <div className="flex  gap-2 items-center justify-center h-screen">
        <button onClick={() => login()} className="bg-blue-500 text-white p-2 rounded-md">Login</button>
        <button onClick={() => register()} className="bg-blue-500 text-white p-2 rounded-md">Register</button>
      </div>
    </>
  )
}

export default App
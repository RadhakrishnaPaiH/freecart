import {useContext} from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const {user} = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if(user.role !== "admin"){
        return <Navigate to="/" />;
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute
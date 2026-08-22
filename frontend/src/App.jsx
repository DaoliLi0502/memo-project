import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Memos from './pages/Memos'
import Signup from './pages/Signup'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/memos' element={<Memos />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
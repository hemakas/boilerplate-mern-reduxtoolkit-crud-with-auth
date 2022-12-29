import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'

// events
import Index from './pages/event/Index'
import Create from './pages/event/Create'
import Update from './pages/event/Update'
import IndexUser from './pages/event/IndexUser'

// users
import UserIndex from './pages/user/Index'
import UserCreate from './pages/user/Create'
import UserUpdate from './pages/user/Update'

// toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            {/* auth routes */}
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* event routes */}
            <Route path='/events' element={<Index />} />
            <Route path='/events/userEvents' element={<IndexUser />} />
            <Route path='/event/create' element={<Create />} />
            <Route exact path='/event/update/:id' element={<Update />} />

            {/* user routes */}
            <Route path='/users' element={<UserIndex />} />
            <Route path='/user/create' element={<UserCreate />} />
            <Route path='/users/update/:id' element={<UserUpdate />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

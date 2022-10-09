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

// toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
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
            <Route path='/event/update/:id' element={<Update />} />
          </Routes>

        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

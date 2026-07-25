import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="noise-overlay" />
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  )
}

import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import HomePage from "./HomePage/HomePage"

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

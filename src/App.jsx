import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import HomePage from "./Blog/HomePage"
import AddPost from "./Blog/AddPost"

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AddPost" element={<AddPost />} />
      </Routes>
    </div>
  )
}

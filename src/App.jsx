import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import HomePage from "./Blog/HomePage"
import BlogFeed from "./Blog/BlogFeed"
import BlogSearch from "./Blog/BlogSearch"
import PostSearch from "./Blog/PostSearch"

export default function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BlogFeed" element={<BlogFeed />} />
        <Route path="/BlogSearch" element={<BlogSearch />} />
        <Route path="/PostSearch" element={<PostSearch />} />
      </Routes>
    </div>
  )
}

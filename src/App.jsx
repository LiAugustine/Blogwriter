import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import HomePage from "./Blog/HomePage"
import BlogFeed from "./Blog/BlogFeed"
import BlogSearch from "./Blog/BlogSearch"
import ViewPost from "./Blog/ViewPost"
import ViewBlog from "./Blog/ViewBlog"
export default function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BlogFeed" element={<BlogFeed />} />
        <Route path="/BlogSearch" element={<BlogSearch />} />
        <Route path="/ViewPost/:id" element={<ViewPost />} />
        <Route path="/ViewBlog/:id" element={<ViewBlog />} />
      </Routes>
    </div>
  )
}

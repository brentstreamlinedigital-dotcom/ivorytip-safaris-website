import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import ItineraryDetail from "./pages/ItineraryDetail";
import LodgeDetail from "./pages/LodgeDetail";
import About from "./pages/About";
import Lodges from "./pages/Lodges";
import Gallery from "./pages/Gallery";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="lodges" element={<Lodges />} />
          <Route path="lodge/:id" element={<LodgeDetail />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="packages" element={<Packages />} />
          <Route path="itinerary/:id" element={<ItineraryDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

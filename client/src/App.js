import "./App.css";
import Sidebar from "./components/sidebar";
import Main from "./components/main";
import { useState } from "react";

function App() {
  const [pdfText, setPdfText] = useState("");
  return (
    <div className="flex w-[100vw]">
      <Sidebar setPdfText={setPdfText} pdfText={pdfText}/>
      <Main pdfText={pdfText}  />
    </div>
  );
}

export default App;

import { createRoot } from "https://esm.sh/react-dom@18.2.0/client"
import App from "./app.js"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)

// Additional updates can be inserted here if needed

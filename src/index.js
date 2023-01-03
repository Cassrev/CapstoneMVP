import { Beans } from "./components/LTBB"
import { createRoot } from "react-dom/client"
import "./index.css"
import "./cursor/clickAnim"
import "./cursor/cursor.css"
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
	<BrowserRouter>
		<Beans />
	</BrowserRouter>
)


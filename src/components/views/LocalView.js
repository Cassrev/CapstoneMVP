import { Outlet, Route, Routes } from "react-router-dom"
import { AdminCorner } from "../admin/AC"
import { ArchivedGB } from "../Gallery/archiveGB"
// import { GalleryApp } from "../Gallery/reactlightGB"
import { SubmitBox } from "../SubmitBox/SB"
// import { DemoGB } from "../Gallery/reactlightGB"
import { FlipCardGBCaro } from "../Gallery/flipcardy"


export const LocalView = () => {
	return (
		<Routes>
		<Route path="admin" element={<AdminCorner />} />
			{/* <Route path="/" element={<GalleryApp />} /> */}
			{/* <Route path="/" element={<ArchivedGB />} /> */}
			
			{/* <Route path="/" element={<DemoGB />} /> */}
			<Route path="/" element={<FlipCardGBCaro />} />
		</Routes>
	)
}
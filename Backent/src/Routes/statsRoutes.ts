import express from "express"
import {  getBarCharts, getLineChart, getPieCharts, getdashboard } from "../controllers/stats.js";



const router = express()

// http://localhost:5000/api/v1/dashboard/stats
// router.get("/stats", getDashboard)

router.get("/stats", getdashboard)

// http://localhost:5000/api/v1/dashboard/pie
router.get("/pie", getPieCharts)

// http://localhost:5000/api/v1/dashboard/bar
router.get("/bar", getBarCharts)


router.get("/line", getLineChart)







export default router;
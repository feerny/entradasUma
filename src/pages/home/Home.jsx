import React from 'react'
import ResponsiveAppBar from '../../ui/navbar/Navbar.jsx'
import ExcelHome from '../../ui/excelhome/ExcelHome.jsx'
import { Typography } from '@mui/material'

function Home(props) {
  return (
    <div>
      <ResponsiveAppBar setislogin={props.setislogin}></ResponsiveAppBar>
      <Typography sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              color:"primary.main",
              letterSpacing: '.1rem',
            }} variant="h2" >
        GENERAR ENTRADAS
      </Typography>
      <ExcelHome></ExcelHome>
      <props.Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  )
}

export default Home
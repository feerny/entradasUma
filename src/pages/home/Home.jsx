import React from 'react'
import ResponsiveAppBar from '../../ui/navbar/Navbar'
import ExcelHome from '../../ui/excelhome/ExcelHome'
import { Typography } from '@mui/material'

function Home(props) {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Typography sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              color:"secondary.main",
              letterSpacing: '.3rem',
            }} variant="h2" >
        GENERAR ENTRADAS
      </Typography>
      <ExcelHome></ExcelHome>
      <props.Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  )
}

export default Home
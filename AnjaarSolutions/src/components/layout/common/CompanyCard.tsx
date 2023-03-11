import React from 'react'
import { Link } from '@pankod/refine-react-router-v6'
import { Place } from '@mui/icons-material'
import { Box,Card,CardMedia,CardContent,Typography,Stack } from '@pankod/refine-mui'
import { CompanyCardProps } from 'interfaces/company'

const CompanyCard = ({id,name,address,phone,email,logo}:CompanyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/companies/show/${id}`}
      sx={{
        maxWidth:'330px',
        padding:'10px',
        '&:hover':{
            boxShadow : '0 22px 45px 2px rgba(176,176,176,0.1)'
        },
        cursor:'pointer',
        textDecoration:'none'
      }}
      elevation={0}
    >
        <CardMedia
          component="img"
          width="150px"
          height={210}
          image={logo}
          alt="card image"
          sx={{ borderRadius: '10px' }}
        />
        <CardContent sx={{
            display: 'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            gap:'10px',

            paddingX:'5px'
        }}>
            <Stack
              direction={"column"} gap={1}
            >
                <Typography
                  fontSize={16} fontWeight={500} color="#11142d"
                >{name}</Typography>
                 <Stack direction="row" gap={0.5} alignItems="flex-start">
                      <Place 
                       sx={{
                        fontSize:18 , color: '#11142d', marginTop:0.5
                       }}
                      
                      />
                      <Typography fontSize={14}  color="#808191">{address}</Typography>

                 </Stack>
            </Stack>
            <Box px={1.5} py={0.5} >
                <Typography fontSize={12} fontWeight={600} color="#11142d">{email}</Typography>
                <Typography>{phone}</Typography>
            </Box>
        </CardContent>

    

    </Card>
 
  )
}

export default CompanyCard
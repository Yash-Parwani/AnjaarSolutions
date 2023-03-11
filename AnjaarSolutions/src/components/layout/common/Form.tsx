import { Box, Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack,Button } from '@pankod/refine-mui';

import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';

const Form = ({ type, register, handleSubmit, handleLogoChange, formLoading, onFinishHandler, logo }: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Property
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap:'20px'}}
        onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d'}}>Company name</FormHelperText>
            <TextField 
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('name', { required: true})}
            />
          </FormControl>
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d'}}>Address</FormHelperText>
            <TextareaAutosize 
              minRows={3}
              required
              placeholder="Write Address of the Company"
              color="info"
              style={{ width: '100%', background: 'transparent', fontSize: '16px', borderColor: 'rgba(0,0,0,0.23)', borderRadius: 6, padding: 10, color: '#919191'}}
              {...register('address', { required: true})}
            />
          </FormControl>

       
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d'}}>Phone Number</FormHelperText>
            <TextField 
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('phone', { required: true})}
            />
          </FormControl>
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d'}}>Company Email</FormHelperText>
            <TextField 
              fullWidth
              required
              type={"email"}
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('email', { required: true})}
            />
          </FormControl>
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d'}}>Date</FormHelperText>
            <TextField 
              fullWidth
              required
              type={"date"}
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('date', { required: true})}
            />
          </FormControl>

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
              <Stack direction="row" gap={2}>
                <Typography color="#11142d" fontSize={16} fontWeight={500} my="10px">Company Logo</Typography>

                <Button component="label" sx={{ width: 'fit-content', color: "#2ed480", textTransform: 'capitalize', fontSize: 16}}>
                  Upload *
                  <input 
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      // @ts-ignore
                      handleLogoChange(e.target.files[0])
                    }}
                  />
                </Button>
              </Stack>
              <Typography fontSize={14} color="#808191" sx={{wordBreak: 'break-all'}} >{logo?.name}</Typography>
          </Stack>

          <CustomButton 
            type="submit"
            title={formLoading ? 'Submitting...' : 'Submit'}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  )
}

export default Form;
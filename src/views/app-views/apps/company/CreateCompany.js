import React from 'react'
import { Typography, TextField, Stack, Box, Grid, Button } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const CreateCompany = () => {

  const [age, setAge] = React.useState({
    country: "",
    state: "",
    pincode: "",
    security: ""

  });

  function handleEnter(event) {

    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      if ((index + 2) < form.elements.length) {
        form.elements[index + 2]?.focus();
      } else {
        console.log("submit====")
      }
      event.preventDefault();
    }
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>

      <Box
        sx={{
          // background: '#cefad0',
          border: "1px solid white",
          borderRadius: "5px",
          padding: "10px",
          margin: "10px",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.17)"
        }}
      >
        <Grid container spacing={2}>
          <Grid lg={6} item xs={12} md={10}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '70ch' },
              }}
              noValidate
              autoComplete="off"
            >
              {/*lg={6}  <Item>xs=610md=810/Item> */}
              <Stack
                direction='row'
                justifyContent="start"
                alignItems='center'
                spacing={3}
              >
                <Typography variant='h6' color="initial">Directory:</Typography>
                <TextField type='file' id="outlined-basic" fullWidth label="" variant="outlined" size='small' onKeyDown={handleEnter} />
              </Stack>

              <Stack
                direction='row'
                justifyContent="start"
                alignItems='center'
                spacing={3}
              >

                {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Mailing Name:</Typography> */}
                {/*  */}
                <TextField id="outlined-basic" fullWidth label="Name" variant="outlined" size='small' onKeyDown={handleEnter} />
              </Stack>
              <Typography mt={1} variant='h6' color="initial" style={{ textDecoration: "underline", textAlign: 'center', fontSize: '18px' }}>Primary Mailing Details</Typography>
              <Stack
              // direction='row'
              // justifyContent="start"
              // alignItems='center'
              // spacing={3}
              >

                {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Address:</Typography> */}
                {/*  */}
                <TextField id="outlined-basic" fullWidth label="Mailing Name" variant="outlined" size='small' onKeyDown={handleEnter} />
              </Stack>
              <Stack
              // direction='row'
              // justifyContent="start"
              // alignItems='center'
              // spacing={3}
              >

                {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Address:</Typography> */}
                {/*  */}
                <TextField id="outlined-basic" fullWidth label="Address" variant="outlined" size='small' onKeyDown={handleEnter} />
              </Stack>
              <FormControl sx={{ m: 1, minWidth: 125 }}>
                <InputLabel id="demo-simple-select-helper-label">Select Country</InputLabel>
                <Select
                  name="country"
                  onKeyDown={handleEnter}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  defaultValue={age.country}
                  size="small"
                  label="Select Country"
                  onChange={handleChange}
                >

                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Yes</MenuItem>
                  <MenuItem value={20}>NO</MenuItem>
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 125 }}>
                <InputLabel id="demo-simple-select-helper-label">Select State</InputLabel>
                <Select
                  name="state"
                  onKeyDown={handleEnter}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"

                  size="small"
                  label="Select State"
                // onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Yes</MenuItem>
                  <MenuItem value={20}>NO</MenuItem>
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 125 }}>
                <InputLabel id="demo-simple-select-helper-label">Select Pin code</InputLabel>
                <Select
                  name="pincode"
                  onKeyDown={handleEnter}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"

                  size="small"
                  label="Select Country"
                // onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Yes</MenuItem>
                  <MenuItem value={20}>NO</MenuItem>
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>
              <Typography mt={1} variant='h6' color="initial" style={{ textDecoration: "underline", textAlign: 'center', fontSize: '18px' }}>Contact Details</Typography>
              <Stack
                direction='row'
                justifyContent="start"
                alignItems='center'
                spacing={3}
              >

                {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Mailing Name:</Typography> */}
                {/*  */}
                <TextField id="outlined-basic" fullWidth label="Phone no" variant="outlined" size='small' onKeyDown={handleEnter} />
              </Stack>
              <Stack
                direction='row'
                justifyContent="start"
                alignItems='center'
                spacing={3}
              >

                {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Mailing Name:</Typography> */}
                {/*  */}
                <TextField type='number' id="outlined-basic" fullWidth label="Mobile no" variant="outlined" size='small' onKeyDown={handleEnter} />
              </Stack>
              <Stack
                direction='row'
                justifyContent="start"
                alignItems='center'
                spacing={3}
              >

                {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Mailing Name:</Typography> */}
                {/*  */}
                <TextField id="outlined-basic" fullWidth label="Fax no" variant="outlined" size='small' onKeyDown={handleEnter} />
              </Stack>
              <Stack
                direction='row'
                justifyContent="start"
                alignItems='center'
                spacing={3}
              >

                {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Mailing Name:</Typography> */}
                {/*  */}
                <TextField id="outlined-basic" fullWidth label="E-mail" variant="outlined" size='small' onKeyDown={handleEnter} />
              </Stack>
              <Stack
                direction='row'
                justifyContent="start"
                alignItems='center'
                spacing={3}
              >

                {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Mailing Name:</Typography> */}
                {/*  */}
                <TextField id="outlined-basic" fullWidth label="Website" variant="outlined" size='small' onKeyDown={handleEnter} />
              </Stack>
            </Box>

          </Grid>

          <Grid lg={6} item xs={10} md={10}>
            <Typography mt={1} variant='h6' color="initial" style={{ textDecoration: "underline", textAlign: 'center' }}>Book and Financial Years Details</Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '70ch' },
              }}
              noValidate
              autoComplete="off"
            >
              {/* <Item>xs=6 md=8</Item> */}
              <Stack
                direction='row'
                justifyContent="start"
                alignItems='center'
                spacing={3}
              >

                {/* <Typography variant='body1' color="initial" style={{ width: '65%', fontSize: "18px" }}>Financial Year from:</Typography> */}
                {/*  */}
                <TextField type='date' onKeyDown={handleEnter} id="outlined-basic" fullWidth label="Financial Year from" variant="outlined" size='small' InputLabelProps={{ shrink: true }} />
              </Stack>
              <Stack
                direction='row'
                justifyContent="start"
                alignItems='center'
                spacing={3}

              >

                {/* <Typography variant='body1' color="initial" style={{ width: '65%', fontSize: "18px" }}>Books beginning from:</Typography> */}
                {/*  */}
                <TextField sx={{ mt: 1 }} type='date' id="outlined-basic" fullWidth label="Books beginning from" variant="outlined" size='small' onKeyDown={handleEnter} InputLabelProps={{ shrink: true }} />
              </Stack>
              <Typography variant='h6' color="initial" style={{ textDecoration: "underline", textAlign: 'center' }}>Security  Control</Typography>
              <Stack
              // direction='row'
              // justifyContent="start"
              // alignItems='center'
              // spacing={3}
              >

                {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>TallyVault password:</Typography> */}
                {/*  */}
                <TextField id="outlined-basic" fullWidth label="TallyVault Password (if any) " variant="outlined" size='small' onKeyDown={handleEnter} autocomplete="off" />
              </Stack>
              <Stack

              >

                {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Repeat Password:</Typography> */}

                <TextField sx={{ mt: 1 }} type='password' id="outlined-basic" fullWidth label="Repeat Password" variant="outlined" size='small' onKeyDown={handleEnter} autocomplete="off" />

                <Typography variant='body1' style={{ fontFamily: "italic", color: 'black' }}><i>( Warning Forgetting TallyVault password will render your data inaccessible.)</i></Typography>
              </Stack>

             <FormControl sx={{ m: 1, minWidth: 125 }}>
                <InputLabel id="demo-simple-select-helper-label">Select Use Security Control</InputLabel>
                <Select
                  onKeyDown={handleEnter}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  name='security'
                  // size="small"
                  label="Select Use Security Control"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Yes</MenuItem>
                  <MenuItem value={20}>NO</MenuItem>
                </Select>
                <Typography variant='body1' style={{ fontFamily: "italic", color: 'black' }}><i>( Enable security to avail TSS features)</i></Typography>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>

            </Box>

          </Grid>

        </Grid>
        <hr />
        <Typography sx={{ mt: 3 }} variant='h6' style={{ textAlign: "center", fontSize: '20px', textDecoration: 'underline' }}> Base Currency Information</Typography>
        <Box>
          <Grid container spacing={2}>

            <Grid lg={6} item xs={12} md={10}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '70ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <FormControl sx={{ m: 1, minWidth: 125 }}>
                  <InputLabel id="demo-simple-select-helper-label">Select Base Currency Symbol</InputLabel>
                  <Select
                    name="symbol"
                    onKeyDown={handleEnter}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"

                    size="small"
                    label="Select Base Currency Symbol"
                  // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Yes</MenuItem>
                    <MenuItem value={20}>NO</MenuItem>
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 125 }}>
                  <InputLabel id="demo-simple-select-helper-label">Select Formal Name</InputLabel>
                  <Select
                    name="formalName"
                    onKeyDown={handleEnter}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"

                    size="small"
                    label="Select Formal Name"
                  // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Yes</MenuItem>
                    <MenuItem value={20}>NO</MenuItem>
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 125 }}>
                  <InputLabel id="demo-simple-select-helper-label">Select Suffix Symbol To Amount</InputLabel>
                  <Select
                    name="suffix"
                    onKeyDown={handleEnter}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"

                    size="small"
                    label="Select Suffix Symbol To Amount"
                  // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Yes</MenuItem>
                    <MenuItem value={20}>NO</MenuItem>
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 125 }}>
                  <InputLabel id="demo-simple-select-helper-label">Select Space Between Amount And Symbol</InputLabel>
                  <Select
                    name="space"
                    onKeyDown={handleEnter}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"

                    size="small"
                    label="Select Space Between Amount And Symbol"
                  // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Yes</MenuItem>
                    <MenuItem value={20}>NO</MenuItem>
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 125 }}>
                  <InputLabel id="demo-simple-select-helper-label">Select Show Amount In Millions</InputLabel>
                  <Select
                    name="amount"
                    onKeyDown={handleEnter}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"

                    size="small"
                    label="Select Show Amount In Millions"
                  // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Yes</MenuItem>
                    <MenuItem value={20}>NO</MenuItem>
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
              </Box>


            </Grid>
            <Grid lg={6} item xs={12} md={10}>

              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '70ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Stack>

                  {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Address:</Typography> */}
                  {/*  */}
                  <TextField id="outlined-basic" fullWidth label="Number of Decimal Place" variant="outlined" size='small' onKeyDown={handleEnter} />
                </Stack>
                <Stack>
                  {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Address:</Typography> */}
                  <TextField id="outlined-basic" fullWidth label="Word Representing amount after decimal" variant="outlined" size='small' onKeyDown={handleEnter} />
                </Stack>
                <Stack>
                  {/* <Typography variant='body1'  color="initial" style={{ width: '65%', fontSize: "18px" }}>Address:</Typography> */}
                  <TextField id="outlined-basic" fullWidth label="No of Decimal places for amount in word" variant="outlined" size='small' onKeyDown={handleEnter} />
                </Stack>
              </Box>
            </Grid>

          </Grid>
          <Box sx={{ textAlign: "center" }} >
            <Button style={{ padding: "15px 50px 15px 50px" }} variant="contained" color="primary">
              Submit
            </Button>

          </Box>
        </Box>


        <Grid sx={{mt:2}} container spacing={0}>
          <Grid item lg={3} xs={12}>
            <Box sx={{ border: "2px solid black", padding: "40px 0" , boxShadow: "0px 5px 2px black",}}>
              <Typography sx={{textAlign:"center"}}>Logo</Typography>
            </Box>
          </Grid>
          <Grid item lg={3} xs={12}>
          <Box sx={{ border: "2px solid black", padding: "40px 0" , boxShadow: "0px 5px 2px black",}}>
              <Typography sx={{textAlign:"center"}}>Contents</Typography>
            </Box>
          </Grid>
          <Grid item lg={3} xs={12}>
          <Box sx={{ border: "2px solid black", padding: "40px 0" , boxShadow: "0px 5px 2px black",}}>
              <Typography sx={{textAlign:"center"}}>Contents</Typography>
            </Box>
          </Grid>
          <Grid item lg={3} xs={12}>
          <Box sx={{ border: "2px solid black", padding: "40px 0" , boxShadow: "0px 5px 2px black",}}>
              <Typography sx={{textAlign:"center"}}>Contents</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CreateCompany

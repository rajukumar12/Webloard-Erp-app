import React, { useState } from 'react'
import { Typography, TextField, Stack, Box, Grid, Button, FormHelperText } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useForm } from "react-hook-form";
const label = { inputProps: { 'aria-label': 'Switch demo' } };


const CreateCompany = () => {

    const [showTitle, setShowTitle] = useState(false)
    const [age, setAge] = React.useState({
        country: "",
        state: "",
        pincode: "",
        security: ""

    });
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleBlur = (event) => {
        console.log(event,'blur==')
    }

    function handleEnter(event) {
        console.log(event.key, event.keyCode, 'key===')
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        if (event.keyCode === 13) {
            if ((index + 2) < form.elements.length) {
                form.elements[index + 2]?.focus();
            }
            // event.preventDefault();
        } else if (event.keyCode === 27) {            
            if ((index - 2) > 0) {
                form.elements[index - 2]?.focus();
            }
            event.preventDefault();
        }
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    console.log(showTitle)
    const handelSwitchChange = (e) => {
        setShowTitle(e.target.checked)
        console.log(e.target.checked)

    }
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


                <Stack
                    direction='row'
                    justifyContent='end'
                >
                    <Box style={{ border: '2px solid black', padding: "5px 8px 5px 5px ", borderRadius: '10px' }}>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={handelSwitchChange} checked={showTitle} />}
                            label="Show Title"
                            labelPlacement="start"

                        />
                    </Box>
                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    spacing={1}
                                >
                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '30%', fontSize: "18px" }}> Directory:</Typography> : ""}

                                    <TextField type='file'
                                        id="outlined-basic"
                                        fullWidth label=""
                                        variant="outlined"
                                        size='small'
                                        onKeyDown={handleEnter}
                                        name="directory"
                                        {...register("directory", { required: " Directory file is required" })}
                                        error={Boolean(errors.directory)}
                                        helperText={errors.directory?.message}
                                    />
                                </Stack>

                                <Stack
                                    direction='row'
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1}
                                >
                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '30%', fontSize: "18px" }}> Name:</Typography> : ""}


                                    <TextField id="outlined-basic"
                                        fullWidth
                                        label="Name"
                                        variant="outlined"
                                        size='small'
                                        onBlur={handleBlur}
                                        // onKeyDown={handleEnter}
                                        name="name"
                                        {...register("name", { required: "  Name field is required" })}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name?.message}
                                    />
                                </Stack>
                                <Typography mt={1} variant='h6' color="initial" style={{ textDecoration: "underline", textAlign: 'center', fontSize: '18px' }}>Primary Mailing Details</Typography>
                                <Stack
                                    direction='row'
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1} >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '30%', fontSize: "18px" }}>Mailing Name:</Typography> : ""}
                                    <TextField id="outlined-basic"
                                        fullWidth
                                        label="Mailing Name"
                                        variant="outlined"
                                        size='small'
                                        onKeyDown={handleEnter}
                                        name="mail"
                                        {...register("mail", { required: "  Mailing field is required" })}
                                        error={Boolean(errors.mail)}
                                        helperText={errors.mail?.message}

                                    />
                                </Stack>
                                <Stack
                                    direction='row'
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1}
                                >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '30%', fontSize: "18px" }}>Address:</Typography> : ""}
                                    <TextField id="outlined-basic"
                                        fullWidth
                                        label="Address"
                                        variant="outlined"
                                        size='small'
                                        onKeyDown={handleEnter}
                                        name="address"
                                        {...register("address", { required: "  Address field is required" })}
                                        error={Boolean(errors.address)}
                                        helperText={errors.address?.message}
                                    />
                                </Stack>


                                {showTitle ? <Typography variant='body1' color="initial" style={{ width: '32%', fontSize: "18px", marginBottom: "0px" }}>Select Country:</Typography> : ""}
                                <FormControl sx={{ minWidth: 125 }} error={Boolean(errors.country)}>
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
                                        {...register("country", { required: "   Country select  is required" })}

                                        helperText={errors.country?.message}
                                    >

                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Yes</MenuItem>
                                        <MenuItem value={20}>NO</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.country?.message}</FormHelperText>
                                </FormControl>


                                {showTitle ? <Typography variant='body1' color="initial" style={{ width: '65%', fontSize: "18px", marginBottom: "0px" }}>Select State:</Typography> : ""}
                                <FormControl sx={{ minWidth: 125 }} error={Boolean(errors.state)}>
                                    <InputLabel id="demo-simple-select-helper-label">Select State</InputLabel>
                                    <Select
                                        name="state"
                                        onKeyDown={handleEnter}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        size="small"
                                        label="Select State"
                                        // onChange={handleChange}
                                        {...register("state", { required: "   State select  is required" })}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Yes</MenuItem>
                                        <MenuItem value={20}>NO</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.state?.message}</FormHelperText>
                                </FormControl>
                                {showTitle ? <Typography variant='body1' color="initial" style={{ width: '65%', fontSize: "18px", marginBottom: "0px" }}>Select Pin code:</Typography> : ""}
                                <FormControl sx={{ minWidth: 125 }} error={Boolean(errors.pincode)}>
                                    <InputLabel id="demo-simple-select-helper-label">Select Pin code</InputLabel>
                                    <Select
                                        name="pincode"
                                        onKeyDown={handleEnter}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        size="small"
                                        label="Select Country"
                                        // onChange={handleChange}
                                        {...register("pincode", { required: "   Pin code select  is required" })}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Yes</MenuItem>
                                        <MenuItem value={20}>NO</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.state?.message}</FormHelperText>
                                </FormControl>
                                <Typography mt={1} variant='h6' color="initial" style={{ textDecoration: "underline", textAlign: 'center', fontSize: '18px' }}>Contact Details</Typography>
                                <Stack
                                    direction='row'
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1}
                                >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '25%', fontSize: "18px" }}>Phone no:</Typography> : ""}
                                    <TextField id="outlined-basic"
                                        fullWidth
                                        label="Phone no"
                                        variant="outlined"
                                        size='small'
                                        onKeyDown={handleEnter}
                                        name="phone_no"
                                        {...register("phone_no", { required: " Phone no field is required" })}
                                        error={Boolean(errors.phone_no)}
                                        helperText={errors.phone_no?.message}
                                    />
                                </Stack>
                                <Stack
                                    direction='row'
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1}
                                >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '25%', fontSize: "18px" }}>Mobile no:</Typography> : ""}
                                    <TextField
                                        type='number'
                                        id="outlined-basic"
                                        fullWidth
                                        label="Mobile no"
                                        variant="outlined"
                                        size='small'
                                        onKeyDown={handleEnter}
                                        name="mobile_no"
                                        {...register("mobile_no", { required: " Mobile no field is required" })}
                                        error={Boolean(errors.mobile_no)}
                                        helperText={errors.mobile_no?.message}
                                    />
                                </Stack>
                                <Stack
                                    direction='row'
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1}
                                >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '25%', fontSize: "18px" }}>Fax no:</Typography> : ""}
                                    <TextField
                                        id="outlined-basic"
                                        fullWidth
                                        label="Fax no"
                                        variant="outlined"
                                        size='small'
                                        onKeyDown={handleEnter}
                                        name="fax_no"
                                        {...register("fax_no", { required: " Fax no field is required" })}
                                        error={Boolean(errors.fax_no)}
                                        helperText={errors.fax_no?.message}
                                    />
                                </Stack>
                                <Stack
                                    direction='row'
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1}
                                >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '25%', fontSize: "18px" }}>E-mail:</Typography> : ""}
                                    <TextField
                                        id="outlined-basic"
                                        fullWidth
                                        label="E-mail"
                                        variant="outlined"
                                        size='small'
                                        onKeyDown={handleEnter}
                                        name="e_mail"
                                        {...register("e_mail", { required: " E-mail field is required" })}
                                        error={Boolean(errors.e_mail)}
                                        helperText={errors.e_mail?.message}
                                    />
                                </Stack>
                                <Stack
                                    direction='row'
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1}
                                >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '25%', fontSize: "18px" }}>Website:</Typography> : ""}
                                    <TextField
                                        id="outlined-basic"
                                        fullWidth
                                        label="Website"
                                        variant="outlined"
                                        size='small'
                                        onKeyDown={handleEnter}
                                        name="website"
                                        {...register("website", { required: " Website field is required" })}
                                        error={Boolean(errors.website)}
                                        helperText={errors.website?.message}
                                    />
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
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1}
                                >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '52%', fontSize: "18px" }}>Financial Year from:</Typography> : ""}
                                    <TextField
                                        type='date'
                                        onKeyDown={handleEnter}
                                        id="outlined-basic"
                                        fullWidth l
                                        abel="Financial Year from"
                                        variant="outlined" s
                                        ize='small'
                                        InputLabelProps={{ shrink: true }}
                                        name="date"
                                        {...register("date", { required: " Financial Year date is required" })}
                                        error={Boolean(errors.date)}
                                        helperText={errors.date?.message}
                                    />
                                </Stack>
                                <Stack
                                    direction='row'
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1}
                                >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '52%', fontSize: "18px" }}>Books beginning from:</Typography> : ""}
                                    <TextField
                                        sx={{ mt: 1 }}
                                        type='date'
                                        id="outlined-basic"
                                        fullWidth
                                        label="Books beginning from"
                                        variant="outlined"
                                        size='small'
                                        onKeyDown={handleEnter}
                                        InputLabelProps={{ shrink: true }}
                                        name="book"
                                        {...register("book", { required: " Books beginning date is required" })}
                                        error={Boolean(errors.book)}
                                        helperText={errors.book?.message}
                                    />
                                </Stack>
                                <Typography variant='h6' color="initial" style={{ textDecoration: "underline", textAlign: 'center' }}>Security  Control</Typography>
                                <Stack
                                    direction='row'
                                    justifyContent='start'
                                    alignItems='center'
                                    spacing={1}
                                >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '52%', fontSize: "18px" }}>TallyVault password:</Typography> : ""}
                                    <TextField 
                                    id="outlined-basic"
                                     fullWidth 
                                     label="TallyVault Password (if any) " 
                                     variant="outlined" 
                                     size='small' 
                                     onKeyDown={handleEnter}
                                      autocomplete="off" 
                                        name='tallyvault'
                                        {...register("tallyvault", { required: " TallyVault password field is required" })}
                                        error={Boolean(errors.tallyvault)}
                                        helperText={errors.tallyvault?.message}
                                      />
                                </Stack>
                                <Stack
                                    // direction='row'
                                    // justifyContent='start'
                                    // alignItems='center'
                                    // spacing={1}
                                >

                                    {showTitle ? <Typography variant='body1' color="initial" style={{ width: '48%', fontSize: "18px" }}>Repeat Password:</Typography> : ""}

                                    <Box>
                                        <TextField sx={{ mt: 1 }}
                                         type='password' 
                                         id="outlined-basic"
                                          fullWidth 
                                          label="Repeat Password" 
                                          variant="outlined"
                                           size='small' 
                                           onKeyDown={handleEnter} 
                                           autocomplete="off"
                                           name='repeatepass'
                                        {...register("repeatepass", { required: " Repeat password field is required" })}
                                        error={Boolean(errors.repeatepass)}
                                        helperText={errors.repeatepass?.message}
                                            />
                                        <Typography variant='body1' style={{ fontFamily: "italic", color: 'black' }}><i>( Warning Forgetting TallyVault password will render your data inaccessible.)</i></Typography>

                                    </Box>
                                </Stack>
                                {showTitle ? <Typography sx={{ m: 2 }} variant='body1' color="initial" style={{ width: '60%', fontSize: "18px", marginBottom: "0px" }}>Select Use Security Control:</Typography> : ""}
                                <FormControl sx={{ m: 1, minWidth: 125 }} error={Boolean(errors.security)}>
                                    <InputLabel id="demo-simple-select-helper-label">Select Use Security Control</InputLabel>
                                    <Select
                                        onKeyDown={handleEnter}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        name='security'
                                        size="small"
                                        label="Select Use Security Control"
                                        onChange={handleChange}
                                        {...register("security", { required: " Use Security Controlselect  is required" })}

                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Yes</MenuItem>
                                        <MenuItem value={20}>NO</MenuItem>
                                    </Select>
                                    <Typography variant='body1' style={{ fontFamily: "italic", color: 'black' }}><i>( Enable security to avail TSS features)</i></Typography>
                                    <FormHelperText>{errors.security?.message}</FormHelperText>
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
                                    {showTitle ? <Typography sx={{ mt: 1 }} variant='body1' color="initial" style={{ width: '65%', fontSize: "18px", marginBottom: "0px" }}>Select Base Currency Symbol:</Typography> : ""}
                                    <FormControl sx={{ m: 1, minWidth: 125 }} error={Boolean(errors.symbol)}>
                                        <InputLabel id="demo-simple-select-helper-label">Select Base Currency Symbol</InputLabel>
                                        <Select
                                            name="symbol"
                                            onKeyDown={handleEnter}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            size="small"
                                            label="Select Base Currency Symbol"
                                        // onChange={handleChange}
                                        {...register("symbol", { required: "   Base Currency Symbol select  is required" })}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Yes</MenuItem>
                                            <MenuItem value={20}>NO</MenuItem>
                                        </Select>
                                        <FormHelperText>{errors.symbol?.message}</FormHelperText>
                                    </FormControl>
                                    {showTitle ? <Typography sx={{ mt: 2 }} variant='body1' color="initial" style={{ width: '65%', fontSize: "18px", marginBottom: "0px" }}>Select Formal Name:</Typography> : ""}
                                    <FormControl sx={{ m: 1, minWidth: 125 }} error={Boolean(errors.formalName)}>
                                        <InputLabel id="demo-simple-select-helper-label">Select Formal Name</InputLabel>
                                        <Select
                                            name="formalName"
                                            onKeyDown={handleEnter}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            size="small"
                                            label="Select Formal Name"
                                        // onChange={handleChange}
                                        {...register("formalName", { required: "   Formal Name select  is required" })}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Yes</MenuItem>
                                            <MenuItem value={20}>NO</MenuItem>
                                        </Select>
                                        <FormHelperText>{errors.formalName?.message}</FormHelperText>
                                    </FormControl>

                                    {showTitle ? <Typography sx={{ mt: 1 }} variant='body1' color="initial" style={{ width: '65%', fontSize: "18px", marginBottom: "0px" }}>Select Suffix Symbol To Amount:</Typography> : ""}
                                    <FormControl sx={{ mt: 1, minWidth: 125 }} error={Boolean(errors.suffix)}>
                                        <InputLabel id="demo-simple-select-helper-label">Select Suffix Symbol To Amount</InputLabel>
                                        <Select
                                            name="suffix"
                                            onKeyDown={handleEnter}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            size="small"
                                            label="Select Suffix Symbol To Amount"
                                        // onChange={handleChange}
                                        {...register("suffix", { required: "   Suffix Symbol To Amount select  is required" })}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Yes</MenuItem>
                                            <MenuItem value={20}>NO</MenuItem>
                                        </Select>
                                        <FormHelperText>{errors.suffix?.message}</FormHelperText>
                                    </FormControl>
                                    {showTitle ? <Typography sx={{ mt: 1 }} variant='body1' color="initial" style={{ width: '65%', fontSize: "18px", marginBottom: "0px" }}>Select Space Between Amount And Symbol:</Typography> : ""}
                                    <FormControl sx={{ m: 1, minWidth: 125 }} error={Boolean(errors.space)}>
                                        <InputLabel id="demo-simple-select-helper-label">Select Space Between Amount And Symbol</InputLabel>
                                        <Select
                                            name="space"
                                            onKeyDown={handleEnter}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            size="small"
                                            label="Select Space Between Amount And Symbol"
                                            
                                            {...register("space", { required: "Space Between Amount And Symbol select  is required" })}
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Yes</MenuItem>
                                            <MenuItem value={20}>NO</MenuItem>
                                        </Select>
                                        <FormHelperText>{errors.space?.message}</FormHelperText>

                                    </FormControl>
                                    {showTitle ? <Typography sx={{ mt: 1 }} variant='body1' color="initial" style={{ width: '65%', fontSize: "18px", marginBottom: "0px" }}>Select Show Amount In Millions:</Typography> : ""}
                                    <FormControl sx={{ m: 1, minWidth: 125 }} error={Boolean(errors.amount)}>
                                        <InputLabel id="demo-simple-select-helper-label">Select Show Amount In Millions</InputLabel>
                                        <Select
                                            name="amount"
                                            onKeyDown={handleEnter}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            size="small"
                                            label="Select Show Amount In Millions"
                                        // onChange={handleChange}
                                        {...register("amount", { required: "Show Amount In Millions select  is required" })}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Yes</MenuItem>
                                            <MenuItem value={20}>NO</MenuItem>
                                        </Select>
                                        <FormHelperText>{errors.amount?.message}</FormHelperText>
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

                                        {showTitle ? <Typography variant='body1' color="initial" style={{ width: '65%', fontSize: "18px" }}>Number of Decimal Place:</Typography> : ""}
                                        <TextField 
                                        id="outlined-basic"
                                         fullWidth 
                                         label="Number of Decimal Place" 
                                         variant="outlined" 
                                         size='small' 
                                         onKeyDown={handleEnter}
                                         name='place'
                                        {...register("place", { required: " Number of Decimal Place field is required" })}
                                        error={Boolean(errors.place)}
                                        helperText={errors.place?.message}
                                          />
                                    </Stack>
                                    <Stack>
                                        {showTitle ? <Typography variant='body1' color="initial" style={{ width: '65%', fontSize: "18px" }}>Word Representing amount after decimal:</Typography> : ""}
                                        <TextField
                                         id="outlined-basic"
                                          fullWidth 
                                          label="Word Representing amount after decimal" 
                                          variant="outlined" 
                                          size='small' 
                                          onKeyDown={handleEnter} 
                                          name='word'
                                        {...register("word", { required: "Word Representing amount after decimal field is required" })}
                                        error={Boolean(errors.word)}
                                        helperText={errors.word?.message}
                                          />
                                    </Stack>
                                    <Stack>
                                        {showTitle ? <Typography variant='body1' color="initial" style={{ width: '65%', fontSize: "18px" }}>No of Decimal places for amount in word:</Typography> : ""}
                                        <TextField 
                                        id="outlined-basic" 
                                        fullWidth 
                                        label="No of Decimal places for amount in word" 
                                        variant="outlined" 
                                        size='small'
                                         onKeyDown={handleEnter} 
                                         name='disamount'
                                        {...register("disamount", { required: "No of Decimal places for amount in wordl field is required" })}
                                        error={Boolean(errors.disamount)}
                                        helperText={errors.disamount?.message}
                                         />
                                    </Stack>
                                </Box>
                            </Grid>

                        </Grid>
                        <Box sx={{ textAlign: "center" }} >
                            <Button type="submit" style={{ padding: "15px 50px 15px 50px" }} variant="contained" color="primary">
                                Submit
                            </Button>

                        </Box>
                    </Box>


                    <Grid sx={{ mt: 2 }} container spacing={0}>
                        <Grid item lg={3} xs={12}>
                            <Box sx={{ border: "2px solid black", padding: "40px 0", boxShadow: "0px 5px 2px black", }}>
                                <Typography sx={{ textAlign: "center" }}>Logo</Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <Box sx={{ border: "2px solid black", padding: "40px 0", boxShadow: "0px 5px 2px black", }}>
                                <Typography sx={{ textAlign: "center" }}>Contents</Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <Box sx={{ border: "2px solid black", padding: "40px 0", boxShadow: "0px 5px 2px black", }}>
                                <Typography sx={{ textAlign: "center" }}>Contents</Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <Box sx={{ border: "2px solid black", padding: "40px 0", boxShadow: "0px 5px 2px black", }}>
                                <Typography sx={{ textAlign: "center" }}>Contents</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    )
}

export default CreateCompany

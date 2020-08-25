import React,{useState,useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as firebase from 'firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="./">
        Medi - Medical Emergency Help
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpDriver() {
  const classes = useStyles();
  const [fname,setfname] = useState("");
  const [lname,setLname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [age,setAge] = useState("");
  const [bloodGroup,setBloodGroup] = useState("");
  const licenceFront = useRef(null);
  const licenceBack = useRef(null);
  const [frontPicture,setFrontPicture] = useState({});
  const [backPicture,setBackPicture] = useState({});

  function onChangeFront(event){
      event.stopPropagation();
      event.preventDefault();
      var file = event.target.files[0];
      if(file){
          setFrontPicture(file);
          console.log(file);
      }
  }

  function onChangeBack(event){
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    if(file){
        setBackPicture(file);
    }
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Medi Driver Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                onChange ={(event)=>setfname(event.target.value)}
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                onChange={(event)=>setLname(event.target.value)}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(event)=>setEmail(event.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                onChange={(event)=>setPassword(event.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                onChange={(event)=>setPhone(event.target.value)}
                label="Phone Number"
                type="number"
                id="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // autoComplete="fname"
                name="bloodGroup"
                variant="outlined"
                required
                fullWidth
                onChange={(event)=>setBloodGroup(event.target.value)}
                id="bloodGroup"
                label="Blood Group"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // autoComplete="fname"
                name="Age"
                variant="outlined"
                required
                fullWidth
                onChange={(event)=>setAge(event.target.value)}
                id="Age"
                label="Your Age"
              />
            </Grid>
            <Grid item xs={12}>
                <input type="file" ref={licenceFront} style={{display:"none"}} onChange={onChangeFront}/>
                <Button
                    color="secondary"
                    fullWidth
                    onClick={()=>{
                        licenceFront.current.click();
                    }}
                >
                    {frontPicture.name?"FRONT SIDE: "+frontPicture.name:"Upload Front Side Of Driver's Licence"}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <input type="file" ref={licenceBack} style={{display:"none"}} onChange={onChangeBack}/>
                <Button
                    color="secondary"
                    fullWidth
                    onClick={()=>{
                        licenceBack.current.click();
                    }}
                >
                    {backPicture.name?"BACK SIDE: "+backPicture.name:"Upload Back Side Of Driver's Licence"}
                </Button>
            </Grid>
          </Grid>
          <Button
            onClick={()=>{
              var rootRef = firebase.database().ref().child('drivers');
              rootRef.push({
                FirstName:fname,
                LastName:lname,
                Email:email,
                Password:password,
                Phone:phone,
                Age:age,
                BloodGroup:bloodGroup,
                FrontPicture:"DriverLicence/"+phone+"/"+frontPicture.name,
                BackPicture:"DriverLicence/"+phone+"/"+backPicture.name,
                Status:"Pending"
              });
              const promise = firebase.auth().createUserWithEmailAndPassword(email,password);
              promise.then(user=>{
                const FrontPicture = firebase.storage().ref("DriverLicence/"+phone+"/"+frontPicture.name);
                const taskFront = FrontPicture.put(frontPicture);
                taskFront.on('state_changed',
                    function complete(){
                        console.log('Front Side Image Uploaded');
                    },
                    function error(err){
                        console.log(err);
                    }
                );
                
                const BackPicture = firebase.storage().ref("DriverLicence/"+phone+"/"+backPicture.name);
                const taskBack = BackPicture.put(backPicture);
                taskBack.on('state_changed',
                    function complete(){
                        console.log('Back Side Image Uploaded');
                    },
                    function error(err){
                        console.log(err);
                    }
                );
                console.log(user);
                alert('Sign up Successfull');
                window.location = "/Driver/SignIn"
                
              }).catch(e=>{
                console.log(e)
              })
            }}
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="./SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
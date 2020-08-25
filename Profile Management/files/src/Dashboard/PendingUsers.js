import React,{useEffect,useState} from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import * as firebase from 'firebase';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function PendingUsers() {
    const [users,setUsers] = useState([]);
    useEffect(() => {
        const ref = firebase.database().ref().child('drivers');
        var tmp = [];
        ref.on("value",function(snapshot){
            const data = snapshot.val();
            for(var x in data){
                tmp.push(Object.assign(data[x],{id:x}));
            }
            setUsers(tmp);
        });
    }, []);
    
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Pending Drivers Approval</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Blood Group</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>View Licence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.FirstName}</TableCell>
              <TableCell>{row.LastName}</TableCell>
              <TableCell>{row.Phone}</TableCell>
              <TableCell>{row.Email}</TableCell>
              <TableCell>{row.Age}</TableCell>
              <TableCell>{row.BloodGroup}</TableCell>
              <TableCell>{row.Status}</TableCell>
              <TableCell>
                    <Button
                        color="secondary"
                        fullWidth
                        onClick={()=>{
                            // licenceFront.current.click();
                        }}
                    >
                        See Licence
                    </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Pending Drivers
        </Link>
      </div>
    </React.Fragment>
  );
}
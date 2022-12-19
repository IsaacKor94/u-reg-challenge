import './App.css';
import { Typography, Grid, Container, Box, TextField, Card, CardContent, Divider, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import moment from 'moment/moment';
import { useEffect } from 'react';
import axios from 'axios';




function App() {

  const [date, setDate] = useState(null);
  const [list, setList] = useState(null);


  const handleChange = (value) => {
    setDate(value);
    apiCalling('historical?date=' + value.format('YYYY-MM-DD') + '&source=SGD');
  }

  const apiCalling = (url) => {

    var myHeaders = new Headers();
    myHeaders.append("apikey", "1b36DqaK4YxZjR6JqVhwvcvYPpPa19rf");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch("https://api.apilayer.com/currency_data/" + url, requestOptions)
      .then(response => response.json()).then(ret => {
        setList(ret.quotes);
      }).catch(error => alert('error', error));
  }

  useEffect(() => {
    apiCalling('live?source=SGD');

  }, []);

  return (
    <div className="App" >
      <Container >
        <Grid item style={{ backgroundColor: 'black' }}>
          <Typography variant="h6" sx={{ 'color': 'white', padding: '5px' }}>
            Yet Another Forex
          </Typography>

        </Grid>

        <Grid item >
          <Grid container justifyContent='space-between' sx={{ padding: '10px' }} >
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              {(date == null) ? 'Live SDG Rate' : 'SGD Rate as of ' + date.format('YYYY-MM-DD')}
            </Typography>

            <DatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>

          <Grid container direction={'row'} spacing={3} alignItems='center' justifyContent={'center'}>
            {
              (list != null) ? Object.entries(list).map((val) =>
                <Grid item xs={3} key={val[0]}>
                  <Card >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Grid item style={{ backgroundColor: 'lightgrey' }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {val[0].replace('SGD', '')}
                        </Typography>
                      </Grid>

                      <Divider />
                      <Typography variant="h5" color="text.secondary">
                        {val[1]}
                      </Typography>
                    </CardContent>
                  </Card></Grid>
              ) : <CircularProgress></CircularProgress>
            }

          </Grid>





        </Grid>



      </Container>
    </div>
  );
}

export default App;

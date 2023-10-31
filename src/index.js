const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes=require('./routes/user');
const userReportRoutes=require('./routes/user report');

//Use the CORS middleware to allow requests from your Flutter app
app.use(cors());
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use('/user', userRoutes);
app.use('/userReport', userReportRoutes);

// Starting the server
app.listen(app.get('port'), () => {
    const serverURL = `http://localhost:${app.get('port')}`; 
    console.log(serverURL);
    console.log('Server on port', app.get('port'));
});
const { Router } = require('express');
const router = Router();

// const mysqlConnection = require('../databases');
// const { route } = require('express/lib/application');

// router.get('/', (req,res) => {
//     res.status(200).json('Server on port 4000 and Database is connected')
// });

// router.get('/:users', (req,res) => {
//     mysqlConnection.query('select * from user', (error, rows, fields) => {
//         if(!error) {
//             res.json(rows);
//         } else {
//             console.log(error);
//         }
//     });
// });

// //This function allows us concatenate 'id' to url => localhost:4000/id
// router.get('/:users/:id', (req,res) => {
//     const {id} = req.params;
//     mysqlConnection.query('select * from user where id = ?', [id], (error, rows, fields) => {
//         if(!error) {
//             res.json(rows);
//         } else {
//             console.log(error);
//         }
//     })
// });

// router.post('/:users', (req, res) => {
//     const { id, password} = req.body;
//     console.log(req.body);
//     mysqlConnection.query('insert into user(id, password) values (?, ?)', [ id, password], (error, rows, fields) => {
//         if(!error) {
//             res.json({Status : "User added"})
//         } else {
//             console.log(error);
//         }
//     });
// })

// router.post('/login', (req, res) => {
//     const { id, password } = req.body; // Assuming the client sends id and password in the request body
  
//     // Query the database to find a user with the provided id
//     mysqlConnection.query('SELECT * FROM user WHERE id = ?', [id], (error, rows, fields) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Internal server error' });
//       }
  
//       // Check if a user with the provided id exists
//       if (rows.length === 0) {
//         return res.status(401).json({ message: 'User not found' });
//       }
  
//       const user = rows[0];
  
//       // Check if the provided password matches the stored password (you should use a secure hash)
//       if (password !== user.password) {
//         return res.status(401).json({ message: 'Invalid password' });
//       }
  
//       // At this point, the login is successful
//       // You may generate a JWT token and return it to the client for future authentication
  
//       return res.status(200).json({ message: 'Login successful', user });
//     });
//   });

const User = [
    { user_id: 24470, user_pass: 'abc123' },
    { user_id: 20230, user_pass: '123abc' },
  ];
  
  router.post('/login', (req, res) => {
    user_id = req.body.user_id;
    user_pass = req.body.user_pass;  
    // Simulate authentication using sample users data
    //const User = User.find((u) => u.user_id === id);
    const user = User.find((u) => u.user_id===user_id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
  
    if (user.user_pass !== user_pass) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  
    // Return a successful login response
  
    res.status(200).json({ message: 'Login successful', user });
  });
  module.exports = router;


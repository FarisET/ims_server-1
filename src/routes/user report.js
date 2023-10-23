const { Router } = require('express');
const router = Router();
var con=require('../databases/database');
const { route } = require('express/lib/application');
const bodyParser = require('body-parser');


router.get('/dashboard/:userid/reports', (req,res) => {
    const userid=req.params.userid;
    const query='select user_report_id, ur.user_id, report_description, date_time, sub_location_name, incident_subtype_description, incident_criticality_level, image from user_report ur join users u on ur.user_id=u.user_id join sub_location sl on ur.sub_location_id=sl.sub_location_id join incident_subtype ist on ur.incident_subtype_id=ist.incident_subtype_id join incident_criticality ic on ur.incident_criticality_id=ic.incident_criticality_id where ur.user_id=?';
    con.query(query,[userid],(error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(200).json(results);
    });
});

router.post('/dashboard/:userid/MakeReport', (req,res) => {
    const report_description=req.body.report_description;
    const date_time=req.body.date_time;
    const sub_location_id=req.body.sub_location_id;
    const incident_subtype_id=req.body.incident_subtype_id;
    const incident_criticality_id=req.body.incident_criticality_id;
    const image=req.body.image;
    const user_id=req.body.user_id;

    // Convert the base64 image to binary data (Buffer)
    const imageBufferBinaryForm = Buffer.from(image, 'base64');

    const query='insert into user_report(report_description, date_time, sub_location_id, incident_subtype_id, incident_criticality_id, image, user_id) values (?,?,?,?,?,?,?)';
    const values=[report_description,date_time,sub_location_id,incident_subtype_id,incident_criticality_id,imageBufferBinaryForm,user_id];
    con.query(query, values, (error,results) => {
        if(error){
            console.log(error);
            return res.status(500).json({message: 'error inserting'});
        }
        return res.status(200).json({message: 'report submitted'});
    })
});

module.exports = router;
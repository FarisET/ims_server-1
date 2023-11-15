const { Router } = require('express');
const router = Router();
var con=require('../databases/database');
const { route } = require('express/lib/application');
const bodyParser = require('body-parser');
const moment = require('moment');



// router.post('/dashboard/:userid/MakeActionReport', (req,res) => {
//     const report_description=req.body.report_description;
//     const question_one=req.body.question_one;
//     const question_two=req.body.question_two;
//     const question_three=req.body.question_three;
//     const question_four=req.body.question_four;
//     const question_five=req.body.question_five;
//     const resolution_description=req.body.resolution_description;
//     const proof_image=req.body.image;
//     const user_report_id=req.body.user_report_id;
//     const action_team_id=req.params.userid;
//     const jsondate_time=req.body.date_time;

//     console.log(action_team_id);

//     //convert date_time to mysql format
//     const momentobj=moment(jsondate_time,moment.ISO_8601);
//     const mysqldatetime=momentobj.format('YYYY-MM-DD HH:mm:ss');
//     // Convert the base64 image to binary data (Buffer)
//     const imageBufferBinaryForm = Buffer.from(proof_image, 'base64');

//     const query='insert into action_report(report_description, question_one, question_two, question_three, question_four, question_five, resolution_description, proof_image, user_report_id, action_team_id, date_time) values (?,?,?,?,?,?,?,?,?,?,?)';
//     const values=[report_description,question_one,question_two,question_three,question_four,question_five,resolution_description,imageBufferBinaryForm,user_report_id,action_team_id,mysqldatetime];
//     con.query(query, values, (error,results) => {
//         if(error){
//             console.log(error);
//             console.log('error in making action report');
//             return res.status(500).json({status: 'error inserting'});
//         }
//         console.log(results)
//         return res.status(200).json({status: 'report submitted'});
//     })
// });

router.post('/dashboard/:userid/MakeActionReport', (req,res) => {
    const reported_by=req.body.reported_by;
    const surrounding_image=req.body.surrounding_image;
    const report_description=req.body.report_description;
    const question_one=req.body.question_one;
    const question_two=req.body.question_two;
    const question_three=req.body.question_three;
    const question_four=req.body.question_four;
    const question_five=req.body.question_five;
    const resolution_description=req.body.resolution_description;
    const proof_image=req.body.proof_image;
    const user_report_id=req.body.user_report_id;
    const action_team_id=req.params.userid;
    // const jsondate_time=req.body.date_time;
    console.log(action_team_id);

    //convert date_time to mysql format
    // const momentobj=moment(jsondate_time,moment.ISO_8601);
    // const mysqldatetime=momentobj.format('YYYY-MM-DD HH:mm:ss');
    // Convert the base64 image to binary data (Buffer)
    const query1='select getActionTeamIDfromUserID(?) as action_team_id';
    con.query(query1,[action_team_id],(error,results1) => {
        if (error) {
            console.log(error);
            console.log('Error fetching action_team_id');
            return res.status(500).json({ status: 'error fetching action_team_id' });
        }

        if (results1.length === 0 || !results1[0].action_team_id) {
            console.log('Action team ID not found for the user');
            return res.status(404).json({ status: 'action_team_id not found' });
        }
        const actionTeamId = results1[0].action_team_id;
        const values=[];
        values.push(reported_by);

        if(surrounding_image){
            const imageBufferBinaryForm1 = Buffer.from(surrounding_image, 'base64');
            values.push(imageBufferBinaryForm1);
        }else values.push(null);

        values.push(report_description);

        if(question_one){
            values.push(question_one);
        }else values.push(null);

        if(question_two){
            values.push(question_two);
        }else values.push(null);

        if(question_three){
            values.push(question_three);
        }else values.push(null);

        if(question_four){
            values.push(question_four);
        }else values.push(null);

        if(question_five){
            values.push(question_five);
        }else values.push(null);

        values.push(resolution_description);

        const imageBufferBinaryForm2 = Buffer.from(proof_image, 'base64');
        console.log(imageBufferBinaryForm2);
        values.push(imageBufferBinaryForm2);
        
        values.push(user_report_id);
        values.push(actionTeamId);

        const query='insert into action_report(reported_by,surrounding_image,report_description, question_one, question_two, question_three, question_four, question_five, resolution_description, proof_image, user_report_id, action_team_id) values (?,?,?,?,?,?,?,?,?,?,?,?)';
        // const values=[report_description,question_one,question_two,question_three,question_four,question_five,resolution_description,imageBufferBinaryForm,user_report_id,action_team_id];
        con.query(query, values, (error,results2) => {
            if(error){
                console.log(error);
                console.log('error in making action report');
                return res.status(500).json({status: 'error inserting'});
            }
            console.log(results2)
            return res.status(200).json({status: 'report submitted'});
        })
    })
    
});

router.get('/dashboard/:userid/fetchAssignedTasks', (req,res) => {
    const action_team_id=req.params.userid;
    console.log('name:'+action_team_id);
    const status='assigned';
    const query='select atk.user_report_id, report_description, date_of_assignment, sub_location_name, incident_subtype_description, incident_criticality_level, image, atk.status from assigned_tasks atk join action_team atm on atk.action_team_id=atm.action_team_id join user_report ur on ur.user_report_id=atk.user_report_id join users u on ur.user_id=u.user_id join sub_location sl on ur.sub_location_id=sl.sub_location_id join incident_subtype ist on ur.incident_subtype_id=ist.incident_subtype_id join incident_criticality ic on ur.incident_criticality_id=ic.incident_criticality_id where atm.user_id=? order by case when atk.status=? then 1 else 2 end, date_of_assignment desc';
    con.query(query,[action_team_id,status],(error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({ status: 'Internal server error' });
        }
        var result = JSON.parse(JSON.stringify(results));
        console.log(result.length)
        console.log(result)      
        return res.status(200).json(result);
    });
});

module.exports = router;
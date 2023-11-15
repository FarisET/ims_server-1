const { Router } = require('express');
const router = Router();
var con=require('../databases/database');


router.get('/fetchIncidentsReported', (req,res) => {
    const query='call getIncidentsReported()';
    con.query(query, (error,results) => {
        if(error){
            console.log(error);
            console.log('error in fetching reported incidents');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        // var result = JSON.parse(JSON.stringify(results));
        // console.log(result.length)
        // console.log(result)      
        // return res.status(200).json(result);
        const incidentCount = results[0][0].incidents_reported;
     //   console.log('Incident count:', incidentCount);
        return res.status(200).send(incidentCount.toString());
    });
});

router.get('/fetchIncidentsResolved', (req,res) => {
    const query='call getIncidentsResolved()';
    con.query(query, (error,results) => {
        if(error){
            console.log(error);
            console.log('error in fetching resolved incidents');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        // var result = JSON.parse(JSON.stringify(results));
        // console.log(result.length)
        // console.log(result)      
        // return res.status(200).json(result);
        const incidentCount = results[0][0].incidents_resolved;
      //  console.log('Incident count:', incidentCount);
        return res.status(200).send(incidentCount.toString());
    });
});

router.get('analytics/fetchTotalIncidentsOnTypes', (req,res) => {
    const query='call getTotalIncidentsOnTypes()';
    con.query(query, (error,results) => {
        if(error){
            console.log(error);
            console.log('error in fetching incidents based on type');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        var result = JSON.parse(JSON.stringify(results));
        console.log(result.length)
    //    console.log(result)      
        return res.status(200).json(result);
    });
});

router.get('/fetchTotalIncidentsOnSubTypes', (req,res) => {
    const query='call getTotalIncidentsOnSubTypes()';
    con.query(query, (error,results) => {
        if(error){
            console.log(error);
            console.log('error in fetching incidents based on subtype');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        var result = JSON.parse(JSON.stringify(results));
        console.log(result.length)
        console.log(result)      
        return res.status(200).json(result);
    });
});

router.get('/fetchTotalIncidentsOnLocations', (req,res) => {
    const query='call getTotalIncidentsOnLocations()';
    con.query(query, (error,results) => {
        if(error){
            console.log(error);
            console.log('error in fetching incidents based on location');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        var result = JSON.parse(JSON.stringify(results));
        console.log(result.length)
        console.log(result)      
        return res.status(200).json(result);
    });
});

module.exports = router;
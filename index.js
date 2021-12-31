const express = require('express');
var bodyParser = require('body-parser');
const app = express();

let jobsList = require('./jobs.json');

app.use(express.static('static'));

app.use(express.urlencoded({
    extended: true
}))

app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/getJobCategories', (req,res) => {
    // get keys of nested JSON object
    var numbers = Object.keys(jobsList)
    let category = '';
                    for (n of numbers){
                        // get each individual job category
                        category += jobsList[n]["categories"]
                    }

                    // turn the string of job categories into an array
                    var categoryArr = category.split(',');

                    const count = {}
                        
                    // find count of each job category
                    categoryArr.forEach(item => {
                        if (count[item]) {
                            count[item] +=1
                            return
                        }
                        count[item] = 1
                    })
                    
                    // return count of each job category
                    res.send(count);            
})

// All jobs in a given city (sent in the query string)
app.get('/getCity', (req,res) => {
    var numbers = Object.keys(jobsList)
    let content = '';
                    for (n of numbers){
                        // if the city name is in title
                        if((jobsList[n]["title"]).includes(req.query.city)){
                            content += '<div>';
                            content += "Title: " + jobsList[n]["title"] + " Categories: " + jobsList[n]["categories"]
                            content += '</div>'
                            content += '\n';
                        }
                    }  
    res.send(content);           
})

// Get all jobs based on category entered by user (sent as a parameter)
app.get('/:jobs', (req,res) => {
    var numbers = Object.keys(jobsList)
    let content = '';

                    for (n of numbers){
                        if((jobsList[n]["categories"]).includes(req.params.jobs)){
                            content += '<div>';
                            content += "Title: " + jobsList[n]["title"] + " Categories: " + jobsList[n]["categories"]
                            content += '</div>'
                            content += '\n';
                        }
                    }

    res.send(content);
})

app.listen(80);
const express = require('express')
const app = express()
const test = require('./bdd.json')
const path = require('path')
const fs = require('fs')
	




app.use(express.static(__dirname + '/public'));



app.get('/', (req,res)=>{

 
 
    
   res.sendFile(path.join(__dirname+'/views/index.html'))
})



app.get('/lac/:id', (req, res) => {
    const id = parseInt(req.params.id) 
    const parking = test.find(parking => parking.id === id) 
    res.status(200).json(parking)
})



app.listen(9999,  () => {
    console.log('Serveur à l\'écoute : http://localhost:9999')
})
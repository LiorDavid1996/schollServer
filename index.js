const express = require("express");
const fs =require("fs")
const app = express();
const port = 8080;
const cors = require("cors");
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const names = ["lior", "dan", "yacov", "dalia", "batel", "aviel", "ron","chen"];
const student = [
  { name: "lior", last: "david", age: "26", id: 0 },
  { name: "dan", last: "yaso", age: "25", id: 1 },
  { name: "daniel", last: "malada", age: "23", id: 2 },
  { name: "yacov", last: "ingedo", age: "32", id: 3 },
];

app.get("/",(req,res)=>{
res.send("server OK")
})
app.get("/names",(req,res)=>{
  res.send({message:"success",names})
})
app.get("/students",(req,res)=>{
  res.send({message:"success",student})
})
app.get("/:id",(req,res)=>{
  const userItem = student.find(item => item.id==req.params.id)
  userItem? res.send(userItem) :res.send("no user ")
})

app.post("/newNames",(req,res)=>{
  names.push(req.body.name)
  res.send("success")
})

app.post('/saveData', (req, res) => {
  fs.appendFile('./test-file.txt',JSON.stringify(req.body.data) , (error) => {
      if (error) return res.send("save data failed");
      res.send("success")
  })
})
app.get("/teachers",(req,res)=>{
  fs.readFile("./test-file.txt",{encoding:"utf8"},(error,content)=>{
    if(error)return res.send({massage:error})
    res.send({ massage: "success", content })
    
  })
})
app.get('/getData', (req, res) => {
  fs.readFile('./test-file..txt', { encoding: 'utf8' }, (error, content) => {
      if (error) return res.send({ massage: error });
      res.send({ massage: "success", content })
  })
})

app.delete("/student/delete/:id",(req,res)=>{
  const userIndex= getIndex(req)
   student.splice(userIndex,1)
   res.send({message:"success",student})

})
app.put("/student/update/:id",(req,res)=>{
  const userIndex =getIndex(req)
  student[userIndex]= req.body.data
  res.send( student)
})
app.listen(port, () => {
  console.log("my server");
});

function getIndex(req){
  
  const userItem = student.find(user => user.id ==req.params.id)
 const userIndex=student.indexOf(userItem)
  return userIndex

}
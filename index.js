const express = require("express"); // commob JS module
const shortid = require("shortid");
const server = express();

server.use(express.json());


let users = [
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
      }
];

 

server.get("/api/users", ( req, res ) => {
    res.status(200).json(users);
    if(!users){
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})
server.get('/api/users/:id', (req, res) => {
    const user = users.find(use => use.id == req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  });
const nextId = users.length;
server.post("/api/users", ( req, res ) => {
    const user =  req.body;  

    user.id = shortid.generate()

    if(user){ 
      users.push(user);
      res.status(201).json(user)
    }
    if(!user.name || !user.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else{
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }  
    
  })

  server.delete("/api/users/:id", (req, res) => {
    if (!req.params.id){
      res.status(400).send("Your request is missing the users id");
    }
    
    if(req.params.id){
      users= users.filter(use => `${use.id}` !== req.params.id);
      res.status(202).json(req.params.id);
    }else{
      res.status(500).json({ errorMessage: "The user could not be removed" })
    }
  });

  server.put("/api/users/:id", ( req, res ) => {
  
        users = users.map(use => {
        if (`${use.id}` === req.params.id) {
          return req.body;
        }
        return use;
      });
      res.status(200).send(req.body);
  
      if (!req.params.id)
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
      if (
        !req.body.id ||
        !req.body.name ||
        !req.body.bio
        
      ) {
        res
          .status(404)
          .send({ errorMessage: "Please provide name and bio for the user." });
      }else{
        res.status(500).json({ errorMessage: "The user information could not be modified." })
      }
  
    
  })
  
const port = 4000;
server.listen(port, () => console.log("server is listening to localhost 4000"))
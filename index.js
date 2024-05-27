const express = require('express')
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

port = process.env.PORT || 3000;

const posts = [
    "I am a bad Boy",
    "Don't come near",
    "Nigeria is not my country"
  ];

  app.get('/',(req, res)=>{
    res.status(200).json('Welcome to hompage')
});

app.post('/ola',(req, res)=>{
    res.status(200).json('What are you looking for')
});

app.post('/posts/create', (req,res)=>{

    const post = req.body.title

    posts.push(post);

    res.status(201).json(posts);
});

app.get('/posts',(req, res)=>{
 
    res.status(200).json(posts);

});

app.get('/posts/:id', (req,res)=>{

    console.log(req.params.id);

   const post = posts.find((item, i) =>i == parseInt(req.params.id));

   if(!post){
    return res.status(404).json({message: 'Post not found'})
   }

    res.status(200).json(post);
});


app.patch('/posts/:id/update', (req, res)=>{

const post = posts.find((post, i) => i == parseInt(req.params.id));

   if(!post){
    return res.status(404).json({message: 'Post not found'})
   }

   const title = req.body.title;

   const newPosts = posts.map((item)=>{

    if (item == post){
        return title;
    }else{
        return item;

    }


   });

   return res.status(200).json({message: "Post updated", newPosts});
});


app.delete('/posts/delete/:id', (req, res)=>{

    const post = posts.find((post, i) => i == parseInt(req.params.id));
    
       if(!post){
        return res.status(404).json({message: 'Post not found'})
       }

    const index = posts.indexOf(post);

    posts.splice(index,1);

    res.status(200).json({msg:"Post Deleted", posts});

    });    



app.listen(port,()=>{console.log(`Listening to server on port ${port}`)});

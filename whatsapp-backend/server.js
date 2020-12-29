
//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
//import cors from 'cors';

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1129234",
    key: "d2db8e4e144fc6d17750",
    secret: "871784e58aac32cdd33d",
    cluster: "eu",
    useTLS: true
  });

  const db = mongoose.connection;

  db.once('open', () => {
      console.log('db connected');

      const msgCollection = db.collection('messagecontents');
      const changeStream = msgCollection.watch();

      changeStream.on('change', (change) => {
          console.log('a change occured', change);

          if(change.operationType === 'insert'){
              const messageDetails = change.fullDocument;
              pusher.trigger('messages', 'inserted', {
                  name: messageDetails.name,
                  message: messageDetails.message,
                  timestamp: messageDetails.timestamp,
                  received: messageDetails.received,
              });
           
          }
          else{
              console.log('error triggering pusher')  
        }
      });
  });

//middleware
app.use(express.json());
//app.use(cors());

 app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', '*');
   next();
});


//Db Config
const connection_url = 'mongodb+srv://admin:htc6uXilrbtwJeU2@cluster0.tgg5p.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})


//???




//api routes
app.get('/', (req, res) => {
    res.send('hello tunde');
})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})





app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})


//listen
app.listen(port, ()=> console.log(`running on port: ${port}`));






















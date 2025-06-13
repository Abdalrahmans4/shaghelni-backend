import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pgclient from './db.js';
import freelancers from './routes/freelancers.js';

 const PORT = process.env.PORT || 5001;


const app  = express();
app.use(express.json());
dotenv.config();
app.use(cors());


 
 app.use("/api/freelancers", freelancers);
pgclient.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to PostgreSQL:', err.message);
    process.exit(1); 
  });






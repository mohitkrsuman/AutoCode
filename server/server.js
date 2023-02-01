import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const port = 5000;
dotenv.config();

const configuration = new Configuration({
   apiKey : process.env.OPEN_API_KEY,
})

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
   res.status(200).send({
      message: 'Hello World',
   })
});

app.post('/', async(req, res) => {
   try{
      const prompt = req.body.prompt;

      const response = await openai.createCompletion({
         model: "text-davinci-003",
         prompt: `${prompt}`,
         temperature: 0,       // time taken to generate response
         max_tokens: 3000,    // length of responses
         top_p: 1,
         frequency_penalty: 0.5,  // similar responses often
         presence_penalty: 0,   // 
      });
      res.status(200).send({
         bot : response.data.choices[0].text,
      });
   }catch(err){
        console.log(err);
        res.status(500).send({err});
   }
});

app.listen(port, () => {
   console.log(`Server is running on port http://localhost:${port}`);
})



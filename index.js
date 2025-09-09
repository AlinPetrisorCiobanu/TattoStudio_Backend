   import express from "express";
   import cors from "cors";
   import conectionDB from "./src/config/db.js";
   import dot_env_conf from "./src/config/dotenv.js";
   import router from "./src/routes/userRoutes.js";
   

   const app = express();

   const PORT = dot_env_conf.PORTDB || 8000;

   app.use(express.json());
   app.use(cors())

   app.get('/' , (req , res) => {
    res.status(200).json({status: "OK"})
})

   app.use('/', router)

   app.listen(PORT, () => {
    console.log("Servidor Levantado")
})

   conectionDB()

   export default app;
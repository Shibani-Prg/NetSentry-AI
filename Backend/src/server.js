
   const app = require("./app");
   const env = require("./config/env");

   app.listen(env.PORT, () => {
     console.log(`NetSentry AI backend running on port ${env.PORT}`);
   });
   
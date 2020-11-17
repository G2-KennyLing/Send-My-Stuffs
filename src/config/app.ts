import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import environment from "../environment";
import { UsersRoutes } from "../routes/users";
import { CommonRoutes } from "../routes/common";

class App {

   public app: express.Application;
   public mongoUrl: string = 'mongodb://localhost:27017/' + environment.getDBName();

   private UsersRoutes: UsersRoutes = new UsersRoutes();
   private commonRoutes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.UsersRoutes.route(this.app);
      this.commonRoutes.route(this.app);
   }

   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }

}
export default new App().app;
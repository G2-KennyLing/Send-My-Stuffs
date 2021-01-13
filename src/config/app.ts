import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import environment from "../environment";
import { UsersRoutes } from "../routes/users";
import { CountryRoutes } from "../routes/country";
import { CommonRoutes } from "../routes/common";
import { AuthRoutes} from "../routes/auth";

class App {

   public app: express.Application;
   public mongoUrl: string = 'mongodb://localhost:27017/' + environment.getDBName();

   private UsersRoutes: UsersRoutes = new UsersRoutes();
   private AuthRoutes: AuthRoutes = new AuthRoutes();
   private commonRoutes: CommonRoutes = new CommonRoutes();
   private CountryRoutes: CountryRoutes = new CountryRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.UsersRoutes.route(this.app);
      this.CountryRoutes.route(this.app);
      this.commonRoutes.route(this.app);
   }

   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
      require("dotenv").config();
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }

}
export default new App().app;

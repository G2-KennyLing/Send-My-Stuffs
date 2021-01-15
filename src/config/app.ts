import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import environment from "../environment";
import { UsersRoutes } from "../routes/users";
<<<<<<< HEAD
import { SeaportRoutes } from "../routes/seaport";
=======
import { PartnersRoutes } from "../routes/partners";
>>>>>>> develop
import { CountryRoutes } from "../routes/country";
import { CommonRoutes } from "../routes/common";
import { AuthRoutes} from "../routes/auth";

class App {

   public app: express.Application;
   public mongoUrl: string = 'mongodb://localhost:27017/' + environment.getDBName();

   private UsersRoutes: UsersRoutes = new UsersRoutes();
<<<<<<< HEAD
   private SeaportRoutes: SeaportRoutes = new SeaportRoutes();
=======
   private PartnersRoutes: PartnersRoutes = new PartnersRoutes();
>>>>>>> develop
   private AuthRoutes: AuthRoutes = new AuthRoutes();
   private commonRoutes: CommonRoutes = new CommonRoutes();
   private CountryRoutes: CountryRoutes = new CountryRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.UsersRoutes.route(this.app);
<<<<<<< HEAD
      this.SeaportRoutes.route(this.app);
=======
      this.PartnersRoutes.route(this.app);
>>>>>>> develop
      this.CountryRoutes.route(this.app);
      this.AuthRoutes.route(this.app);
      this.commonRoutes.route(this.app);
   }

   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
      require("dotenv").config();
      this.app.use(cors());
      this.app.use(cookieParser());
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }

}
export default new App().app;

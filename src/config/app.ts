import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import environment from "../environment";
import { AuthRoutes} from "../routes/auth";
import { UserRoutes } from "../routes/user";
import { PartnerRoutes } from "../routes/partner";
import { CountryRoutes } from "../routes/country";
import { SeaportRoutes } from "../routes/seaport";
import { StateRoutes } from "../routes/state";
import { CommonRoutes } from "../routes/common";
import ShipmentRoute from "../routes/shipment";

class App {
  public app: express.Application;
  public mongoUrl: string = "mongodb://localhost:27017/" + environment.getDBName();

   private AuthRoutes: AuthRoutes = new AuthRoutes();
   private UserRoutes: UserRoutes = new UserRoutes();
   private PartnerRoutes: PartnerRoutes = new PartnerRoutes();
   private ShipmentRoutes: ShipmentRoute = new ShipmentRoute();
   private CountryRoutes: CountryRoutes = new CountryRoutes();
   private SeaportRoutes: SeaportRoutes = new SeaportRoutes();
   private StateRoutes: StateRoutes = new StateRoutes();
   private commonRoutes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.AuthRoutes.route(this.app);
      this.UserRoutes.route(this.app);
      this.PartnerRoutes.route(this.app);
      this.CountryRoutes.route(this.app);
      this.SeaportRoutes.route(this.app);
      this.ShipmentRoutes.route(this.app);
      this.StateRoutes.route(this.app);
      this.commonRoutes.route(this.app);
   }

   private config(): void {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(cors());
      this.app.use(cookieParser());
      require("dotenv").config();
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }
}
export default new App().app;

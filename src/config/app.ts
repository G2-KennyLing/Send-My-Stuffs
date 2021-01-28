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
import { AirportRoutes } from "../routes/airport";
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
   private AirportRoutes: AirportRoutes = new AirportRoutes();
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
      this.AirportRoutes.route(this.app);
      this.ShipmentRoutes.route(this.app);
      this.commonRoutes.route(this.app);
   }

   private config(): void {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
      const headers = {
         origin: "http://localhost:4200",
         credentials: true,
         method: "GET,POST,PUT,PATCH,DELETE,HEAD",
       };
      this.app.use(cors(headers));
      this.app.use(cookieParser());
      require("dotenv").config();
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }
}
export default new App().app;

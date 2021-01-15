import { AuthController } from "./../controllers/authController";
import ShipmentController from "../controllers/shipmentController";
import { Request, Response, Application, Router } from "express";
export default class UsersRoutes {
  private ShipmentController: ShipmentController = new ShipmentController();
  private AuthController: AuthController = new AuthController();
  private Route: Router = Router();
  public route(app: Application) {
    this.Route.get("/shipments", (req: Request, res: Response) => {
      this.ShipmentController.getAllShipments(req, res);
    });
    this.Route.post("/shipment", (req: Request, res: Response) => {
      this.ShipmentController.createShipment(req, res);
    });
    this.Route.get("/shipment/overview", (req: Request, res: Response) => {
      this.ShipmentController.overviewShipment(req, res);
    });
    this.Route.get("/shipment/:_id", (req: Request, res: Response) => {
      this.ShipmentController.getShipment(req, res);
    });
    this.Route.put("/shipment/:_id", (req: Request, res: Response) => {
      this.ShipmentController.updateShipment(req, res);
    });
    app.use("/", this.AuthController.isSignIn, this.Route);
  }
}

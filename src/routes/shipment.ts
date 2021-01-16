import { AuthController } from "./../controllers/authController";
import ShipmentController from "../controllers/shipmentController";
import { Request, Response, Application, Router } from "express";

export default class ShipmentRoutes {
  private ShipmentController: ShipmentController = new ShipmentController();
  private authController: AuthController = new AuthController();
  private Route: Router = Router();

  public route(app: Application) {
    const isSignIn = this.authController.isSignIn;
    this.Route.post('/shipment',isSignIn, (req: Request, res: Response) => {
      this.ShipmentController.createShipment(req, res);
    });

    this.Route.get("/shipments", (req: Request, res: Response) => {
      this.ShipmentController.getListShipments(req, res);
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
    
    app.use("/", this.authController.isSignIn, this.Route);
  }
}

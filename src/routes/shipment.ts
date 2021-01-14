import { AuthController } from "./../controllers/authController";
import ShipmentController from "../controllers/shipmentController";
import { Request, Response, Application, Router } from "express";
export default class UsersRoutes {
  private controller: ShipmentController;
  private AuthController: AuthController;
  private Route: Router;
  constructor() {
    this.controller = new ShipmentController();
    this.AuthController = new AuthController();
    this.Route = Router();
  }
  public route(app: Application) {
    this.Route.get("shipments/", (req: Request, res: Response) => {
      this.controller.getAll(req, res);
    });
    this.Route.post("shipment/", (req: Request, res: Response) => {
      this.controller.create(req, res);
    });
    this.Route.get("shipments/overview", (req: Request, res: Response) => {
      this.controller.overview(req, res);
    });
    this.Route.get("shipment/:_id", (req: Request, res: Response) => {
      this.controller.getById(req, res);
    });
    this.Route.put("shipment/:_id", (req: Request, res: Response) => {
      this.controller.update(req, res);
    });
    app.use("/", this.AuthController.isSignIn, this.Route);
  }
}

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
    this.Route.get("/", (req: Request, res: Response) => {
      this.controller.getAll(req, res);
    });
    this.Route.post("/", (req: Request, res: Response) => {
      this.controller.create(req, res);
    });
    this.Route.get("/overview", (req: Request, res: Response) => {
      this.controller.overview(req, res);
    });
    this.Route.get("/:_id", (req: Request, res: Response) => {
      this.controller.getById(req, res);
    });
    this.Route.put("/:_id", (req: Request, res: Response) => {
      this.controller.update(req, res);
    });
    app.use("/api/shipment", this.AuthController.isSignIn, this.Route);
  }
}

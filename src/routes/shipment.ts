import ShipmentController from "../controllers/shipmentController";
import { Request, Response, Application } from "express";
export default class UsersRoutes {
  private controller: ShipmentController;
  constructor() {
    this.controller = new ShipmentController();
  }
  public route(app: Application) {
    app.get("/api/shipment", (req: Request, res: Response) => {
      this.controller.getAll(req, res);
    });
    app.post("/api/shipment", (req: Request, res: Response) => {
      this.controller.create(req, res);
    });
  }
}

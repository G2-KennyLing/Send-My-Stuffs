import { AuthController } from "./../controllers/authController";
import ShipmentController from "../controllers/shipmentController";
import { Request, Response, Application } from "express";

export default class ShipmentRoutes {
    private shipmentController: ShipmentController = new ShipmentController();
    private authController: AuthController = new AuthController();

    public route(app: Application) {

      const isSignIn = this.authController.isSignIn;

      app.post('/shipment', isSignIn, (req: Request, res: Response) => {
        this.shipmentController.createShipment(req, res);
      });

      app.get('/shipments', isSignIn, (req: Request, res: Response) => {
        this.shipmentController.getListShipments(req, res);
      });

      app.get('/shipment/:id', isSignIn, (req: Request, res: Response) => {
        this.shipmentController.getShipment(req, res);
      });

      app.get('/shipment/overview', isSignIn, (req: Request, res: Response) => {
        this.shipmentController.overviewShipment(req, res);
      });
      
      app.put('/shipment/:id', isSignIn, (req: Request, res: Response) => {
        this.shipmentController.updateShipment(req, res);
      });
  }
}

import { Request, Response } from "express";

class HomeController {

  index(req: Request, res: Response) {

    res.status(200).json({
      tudoCerto: true
    });
  }

}

export default new  HomeController();

import { Request, Response } from 'express';

import { CasesModel } from '../../models/case';
import { Express } from 'express';

/**
 * Represents the routes for the handling user cases.
 */
export class CasesRoute {

  constructor(app: Express) {
    this.registerRoutes(app);
  }

  /**
   * 
   * @param app - The Express application object.
   *  It is used to register the routes for the calculator.
   *  The routes are:
   *    - POST /user/cases/email - Insert a case with an email ID as the contact.
   *    - POST /user/cases/phone - Insert a case with a phone number as the contact.
   * 
   */
  registerRoutes(app: Express) {
    app.post('/user/cases/email', this.insertCaseEmail);
    app.post('/user/cases/phone', this.insertCasePhone);

    console.log("Registered Cases route(s)");
  }

  async insertCaseEmail(req: Request, res: Response) {
    const { name, email, note } = req.body;

    const casesModel = new CasesModel();

    const caseID = await casesModel.insertCaseEmail(name, email, note);
    if (!caseID) {
      return res.status(500).json({ message: 'Failed to insert case' });
    }
    return res.status(201).json({ id: caseID });
  }

  async insertCasePhone(req: Request, res: Response) {
    const { name, phone, note } = req.body;

    const casesModel = new CasesModel();
    const id = await casesModel.generateID();

    const result = await casesModel.insertCasePhone(name, phone, note);
    if (!result) {
      return res.status(500).json({ message: 'Failed to insert case' });
    }
    return res.status(201).json({ id: id });

  }
}
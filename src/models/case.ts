import { Collection } from "./collection";
import { getTimestampInMs } from "../utils/tools";

export class CasesModel extends Collection {
  constructor() {
    super('cases');
  }

  async getCaseByID(id: string) {
    return await this.findOne({ id: id });
  }

  async getCases() {
    return await this.findMany({});
  }

  async insertCaseEmail(name: string, email: string, note: string) {
    const id = this.generateID();
    const data = {
      id: id,
      name: name,
      email: email,
      note: note,
      insertedAt: getTimestampInMs()
    }
    if (!(await this.insertOne(data))) {
      return null;
    }
    return id;
  }

  async insertCasePhone(name: string, phone: string, note: string) {
    const id = this.generateID();
    const data = {
      id: id,
      name: name,
      phone: phone,
      note: note,
      insertedAt: getTimestampInMs()
    }
    if (!(await this.insertOne(data))) {
      return null;
    }
    return id;
  }
}

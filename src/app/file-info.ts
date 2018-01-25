import { User } from "./user";

export class FileInfo {

  constructor(
    public originalFileName: string,
    public xmlFileName: string,
    public title: string,
    public uploaderInfo: User,
    public description?: string
  ) { }
}

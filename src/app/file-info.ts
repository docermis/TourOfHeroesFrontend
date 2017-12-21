export class FileInfo {

  constructor(
    public originalFileName: string,
    public xmlFileName: string,
    public title: string,
    public uploaderName: string,
    public description?: string
  ) { }
}

import { NextFunction, Request, Response, Router } from "express"
import { BookMarkService } from "../services/bookmark.service"

export class BookMarkController {
  public router = Router()

  constructor(private bookMarkService: BookMarkService) {
    this.setRoutes()
  }

  public setRoutes():void {
    this.router.get("/", this.all)
    this.router.post("/add", this.add)
    this.router.put("/edit/:id", this.edit)
    this.router.get("/read/:id", this.read)
    this.router.delete("/delete/:id", this.delete)
  }

  private all = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const list = await this.bookMarkService.all()
    res.send(list)
  }

  private add = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
      const video = await this.bookMarkService.add(req.body)
      res.send(video)
    } catch (e) {
      next(e)
    }
  }

  private edit = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
      const result = await this.bookMarkService.edit(req.body, req.params.id)
      res.send({ save: result })
    } catch (e) {
      next(e)
    }
  }

  private read = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
      const bookMark = await this.bookMarkService.read(req.params.id)
      res.send(bookMark)
    } catch (e) {
      next(e)
    }
  }

  private delete = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
      const result = await this.bookMarkService.delete(req.params.id)
      res.send({ save: result })
    } catch (e) {
      next(e)
    }
  }
}
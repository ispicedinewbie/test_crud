import bodyParser from "body-parser"
import compression from "compression"
import express from "express"
import { db } from "../constants/config"
import { BookMarkController } from "../controller/bookmark.controller"
import { BookMarkService } from "../services/bookmark.service"
import HttpException from "./HttpException"


class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.setCors()
    this.setConfig()
    this.setMysqlConfig()
    this.setControllers()
    this.setError()
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }))
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
    this.app.use(compression())
  }

  private setCors() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Expose-Headers", "x-total-count");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
      res.header("Access-Control-Allow-Headers", "Content-Type,authorization");  
      next()
    })
  }

  private async setMysqlConfig() {
    await db.sync({force: true, alter: true})
  }

  private setControllers() {
    const bookmarkController = new BookMarkController(new BookMarkService)
    this.app.use("/bookmark", bookmarkController.router)
  }

  private setError(){
    this.app.use((error: HttpException, request: express.Request, response: express.Response, next: express.NextFunction):void => {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong'
      response
        .status(status)
        .send({
          status,
          message
        })
    })  
  }
}

export default new App().app
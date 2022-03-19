import {Model, Column, Table, DataType, HasOne, Scopes } from "sequelize-typescript";
import { Photo } from "./Photo";
import { Video } from "./Video";

@Table({
  timestamps: true
})
export class BookMark extends Model<BookMark> {
  @Column
  url!: string

  @Column
  title!: string

  @Column
  author!: string

  @Column(DataType.DATE)
  datePublish!: Date

  @Column(DataType.STRING)
  thumbnail!: string

  @HasOne(() => Video)
  video?: Video

  @HasOne(() => Photo)
  photo?: Photo

  // @Column({
  //   type:DataType.VIRTUAL,
  //   get(){
  //     return this.getDataValue('photo') || this.getDataValue('video') //this.photo! || this.video!
  //   }
  // })
  // specificite!:Video | Photo
}
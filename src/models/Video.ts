import {Model, Column, Table, Scopes, ForeignKey, BelongsTo} from "sequelize-typescript"
import { BookMark } from "./BookMark"

@Scopes(() => ({
  full: {
    include: [BookMark]
  }
}))
@Table({ timestamps: false })
export class Video extends Model<Video> {
  @Column
  width!: number

  @Column
  height!: number

  @Column
  duree!: number
  
  @ForeignKey(() => BookMark)
  @Column({
    onDelete: 'CASCADE'
  })
  bookMarkId!: number

  @BelongsTo(() => BookMark)
  bookMark!: BookMark

}
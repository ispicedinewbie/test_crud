import {Model, Column, Table, Scopes, ForeignKey, BelongsTo} from "sequelize-typescript"
import { BookMark } from "./BookMark"

@Scopes(() => ({
  full: {
    include: [BookMark]
  }
}))
@Table({ timestamps: false })
export class Photo extends Model<Photo> {
  @Column
  width!: number

  @Column
  height!: number

  @ForeignKey(() => BookMark)
  @Column({
    onDelete: 'CASCADE'
  })
  bookMarkId!: number

  @BelongsTo(() => BookMark)
  bookMark!: BookMark
}
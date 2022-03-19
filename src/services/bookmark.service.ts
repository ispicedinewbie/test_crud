import axios from "axios"
import { urlApi } from "../constants/config"
import { BookMark } from "../models/BookMark"
import { Photo } from "../models/Photo"
import { Video } from "../models/Video"
import validUrl from "../utils/validUrl"

interface embed {
  author_name:string
  width:number
  height:number
  title:string
  duration?:number
  thumbnail_url:string
  upload_date?: string
}

export class BookMarkService {
  private join =  {
    include: [{
      model: Video,
      as: 'video',
      attributes: { exclude: ['bookMarkId']},
    },
    {
      model: Photo,
      as: 'photo',
      attributes: { exclude: ['bookMarkId']}
    }]
  }

  public async all():Promise<BookMark[]> {
    try{
      return await BookMark.findAll(this.join)
    } catch {
      throw new Error('Erreur lors de la récuperation des données')
    }
  }

  public async add(datas:{url:string}):Promise<BookMark | boolean> {
    const url = datas.url
    if (!validUrl(url)) {
      throw new Error('url invalide')
    }

    const parse = new URL(url)
    let typeUrl = ''
    let type = ''
    if (parse.host === 'vimeo.com') {
      type = 'video'
      typeUrl = urlApi.vimeo + url
    } else if (parse.host === 'www.flickr.com') {
      type = 'photo'
      typeUrl = urlApi.flirk + url
    }
    const data = await this.getEmbed(typeUrl)

    let book:BookMark | undefined
    if (type === 'video') {
      book = this.addVideo(url, data)
    } else if (type === 'photo') {
      book = this.addPhoto(url, data)
    }
    
    if (book) {
      try{
        return await book.save()
      } catch (e) {
        throw new Error('Erreur lors de la sauvegarde des données')
      }
    }
    
    return false
  }

  public async read(id:string):Promise<BookMark | null>{
    try{
      return await BookMark.findByPk<BookMark>(id, this.join)
    } catch {
      throw new Error('Erreur lors de la récuperation des données')
    }
  }

  public async edit(datas:BookMark, id:string):Promise<boolean>{
    const instance = await this.read(id)
    let retour = false
    if (instance) {
      const filter =  { where: {BookMarkId: instance.id } }
      if (instance.video !== null && datas.video) {
        try{
          await Video.update(datas.video, filter)
        } catch (e) {
          console.log(e)
          throw new Error('Erreur lors de la sauvegarde des données')
        }
      } else if (instance.video !== null && datas.photo) {
        try{
          await Photo.update(datas.photo, filter)
        }catch {
          throw new Error('Erreur lors de la sauvegarde des données')
        }
      }
      
      try{
        retour = !!await BookMark.update<BookMark>(datas, { where: {id: id} })
      }catch {
        throw new Error('Erreur lors de la sauvegarde des données')
      }
    }
    return retour
  }

  public async delete(id:string):Promise<boolean>{
    const affected = await BookMark.destroy({ where: { id: id }})
    return !!affected
  }

  private addPhoto(url:string, data:embed):BookMark{
    return new BookMark(<BookMark>{
      title: data.title,
      url: url,
      author: data.author_name,
      datePublish: new Date(),
      thumbnail: data.thumbnail_url,
      photo: <Photo>{
        width: data.width,
        height: data.height
      }
    }, {
      include : [{
        model: Photo,
        as: 'photo',
        attributes: { exclude: ['id']}
      }]
    })
  }

  private addVideo(url:string, data:embed):BookMark{
    const bookMark = new BookMark(<BookMark>{
      title: data.title,
      url: url,
      author: data.author_name,
      datePublish: new Date(data.upload_date!),
      thumbnail: data.thumbnail_url,
      video: <Video>{
        width: data.width,
        height: data.height,
        duree: data.duration,
      }
    }, {
      include : [{
        model: Video,
        as: 'video',
        attributes: { exclude: ['id']}
      }]
    })
    return bookMark
  }

  private async getEmbed(url:string):Promise<embed> {
    try {
      const { data } = await axios.get<embed>(url,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      return data
    } catch {
      throw new Error('Impossible de récuperer les données')
    }
  }
}
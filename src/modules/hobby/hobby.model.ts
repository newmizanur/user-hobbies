import { ApiProperty } from "@nestjs/swagger";
import { Schema, Document } from "mongoose";


/**
 * Mongoose Hobby Schema
 */
export const Hobby = new Schema({
  passionLevel: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User',required: true },
  __v: { type: Number, select: false }
});


Hobby.method({
  transform():HobbyResponse {
    return new HobbyResponse(this);
  },
});

/**
 * Mongoose Hobby Document
 */
export interface IHobby extends Document{
  /**
   * UUID
   */

  readonly _id: Schema.Types.ObjectId;
  /**
   * Passion Level
   */
  readonly passionLevel: string;
  /**
   * Name
   */
  readonly name: string;
  /**
   * Year
   */
  readonly year: string;

  /**
   * User
   */
  user: Schema.Types.ObjectId

  transform():HobbyResponse;
}


export class HobbyResponse{
  
  @ApiProperty()
  _id: string;

  @ApiProperty()
  passionLevel: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: string;

  @ApiProperty()
  userId: string;

  constructor(hobby: IHobby | any) {
    if(hobby){
      this._id = hobby._id.toString();
      this.passionLevel = hobby.passionLevel;
      this.name = hobby.name;
      this.year = hobby.year;
      this.userId = (hobby.user)['_id'] ? (hobby.user)['_id'].toString() : hobby._id.toString();
    }
  }

  // static fromAny(hobby:any){
  //   let response =  new HobbyResponse(null)
  //   response.
  // }
}
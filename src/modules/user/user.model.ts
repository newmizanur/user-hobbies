import { ApiProperty } from "@nestjs/swagger";
import { HobbyResponse } from "../hobby/hobby.model";
import { Schema, Document } from "mongoose";


/**
 * Mongoose Hobby Schema
 */
export const User = new Schema({
  name: { type: String, required: true },
  hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobby' }]
});


User.method({
  transform():UserResponse {
    return new UserResponse(this);
  },
});

/**
 * Mongoose Hobby Document
 */
export interface IUser extends Document{
  /**
   * UUID
   */

  readonly _id: Schema.Types.ObjectId;

  /**
   * Name
   */
  readonly name: string;
  /**
   * Hobbies
   */
  hobbies: [Schema.Types.ObjectId];

  transform():UserResponse;
}


export class UserResponse{
  
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  name: string;

  @ApiProperty({type: HobbyResponse})
  hobbies: HobbyResponse[];
  

  constructor(user: IUser) {
    this.id = user._id.toString();
    this.name = user.name;
  }
}
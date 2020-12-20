
import { isValidObjectId, Model,  } from "mongoose";
import { InjectModel, Schema,  } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { CreateUserPayload } from "./payload/create.user.payload";
import { PatchUserPayload } from "./payload/patch.user.payload";
import { BasePayload } from "modules/shared/base.payload";
import { IGenericMessageBody } from "modules/shared/interfaces/generic.interface";
import { UserResponse, IUser, User } from "./user.model";
import { IsUppercase } from "class-validator";


/**
 * User Service
 */
@Injectable()
export class UserService {
  /**
   * Constructor
   * @param {Model<IUser>} userModel
   */
  constructor(
    @InjectModel("User") private readonly userModel: Model<IUser>,
  ) {}

   /**
   * Fetches a user from database by id
   * @param {string} id
   * @returns {Promise<UserResponse>} queried user data
   */
  async all(query: BasePayload): Promise<UserResponse[]> {
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 20;

    let hobbies = await this.userModel.find().sort({ _id: -1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .exec();
    return hobbies.map(user=> user.transform());
  }
  /**
   * Fetche a user from database by UUID with hobbies
   * @param {string} id
   * @returns {Promise<UserResponse>} queried user data
   */
  async get(id:string): Promise<UserResponse>  {
    let user:any = await this.userModel.findById(id).populate("hobbies").exec(); //any types because nest-mongoose getting issue with populate types
    if (!user) {
      throw new BadRequestException(
        "The user with that id could not be found.",
      );
    }
    let trasformedUser = user.transform();
    trasformedUser.hobbies = user.hobbies.map(hobby  => hobby.transform())
    return trasformedUser;
  }

  /**
   * Fetches a user from database by UUID
   * @param {string} id
   * @returns {Promise<IUser>} queried user data
   */
  getById(id: string): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }


  /**
   * Create a user with CreateUserPayload fields
   * @param {CreateUserPayload} payload user payload
   * @returns {Promise<UserResponse>} created user data
   */
  async create(payload: CreateUserPayload): Promise<UserResponse> {
    const createdUser = new this.userModel({
      ...payload
    });
    let user = await createdUser.save();
    return user.transform();
  }

  /**
   * Edit User data
   * @param {PatchUserPayload} payload
   * @returns {Promise<UserResponse>} mutated user data
   */
  async edit(payload: PatchUserPayload): Promise<UserResponse> {
    
    let id = payload.id;
    if(!isValidObjectId(id)){
      throw new BadRequestException(
        "The user id is not valid.",
      );
    }
    const user: IUser = await this.userModel.findByIdAndUpdate(id, payload);
    if (!user) {
      throw new BadRequestException(
        "The user with that id does not exist in the system.",
      );
    }
    let updateUser = await this.getById(id);
    return updateUser.transform();
  }

  /**
   * Delete hobby given a id
   * @param {string} id
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(id: string): Promise<IGenericMessageBody> {
    return this.userModel.deleteOne({ _id: id }).then(user => {
      if (user.deletedCount === 1) {
        return { message: `Deleted user request successfull.` };
      } else {
        throw new BadRequestException(
          `Failed to delete a user by the name of ${id}.`,
        );
      }
    });
  }
}

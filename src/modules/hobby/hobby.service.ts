import { isValidObjectId, Model, ObjectId } from "mongoose";
import { InjectModel, Schema } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from "@nestjs/common";
import { HobbyResponse, IHobby, Hobby } from "./hobby.model";
import { CreateHobbyPayload } from "./payload/create.hobby.payload";
import { PatchHobbyPayload } from "./payload/patch.hobby.payload";
import { BasePayload } from "../shared/base.payload";
import { IGenericMessageBody } from "../shared/interfaces/generic.interface";
import { UserService } from "../user/user.service";


/**
 * Hobby Service
 */
@Injectable()
export class HobbyService {
  /**
   * Constructor
   * @param {Model<IHobby>} hobbyModel
   */
  constructor(
    @InjectModel("Hobby") private readonly hobbyModel: Model<IHobby>,
    private readonly userService: UserService,
  ) {}

   /**
   * Fetches a hobby from database by UUID
   * @param {string} id
   * @returns {Promise<IHobby>} queried hobby data
   */
  async all(query: BasePayload): Promise<HobbyResponse[]> {
    //Should take user from token in real life
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 20;

    let hobbies = await this.hobbyModel.find().sort({ _id: -1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .exec();
    return hobbies.map(hobby=> hobby.transform());
  }

  /**
   * Fetches a hobby from database by UUID
   * @param {string} id
   * @returns {Promise<IHobby>} queried hobby data
   */
  get(id: string): Promise<IHobby> {
    return this.hobbyModel.findById(id).exec();
  }

  /**
   * Create a hobby with RegisterPayload fields
   * @param {CreateHobbyPayload} payload hobby payload
   * @returns {Promise<IHobby>} created hobby data
   */
  async create(payload: CreateHobbyPayload): Promise<HobbyResponse> {
    //Todo: Check valid user
    const user = await this.userService.getById(payload.userId);
    if(!user){
      throw new UnauthorizedException(
        "The user id is not valid.",
      );
    }
    const createdHobby = new this.hobbyModel({
      ...payload,
      user
    });
    let hobby = await createdHobby.save();
    user.hobbies.push(hobby._id)
    await user.save();
    return hobby.transform();
  }

  /**
   * Edit Hobby data
   * @param {PatchHobbyPayload} payload
   * @returns {Promise<HobbyResponse>} mutated hobby data
   */
  async edit(payload: PatchHobbyPayload): Promise<HobbyResponse> {
    
    let id = payload.id;
    if(!isValidObjectId(id)){
      throw new BadRequestException(
        "The hobby id is not valid.",
      );
    }
    
    const hobby = await this.hobbyModel.findByIdAndUpdate(
      id,
      payload,
    );
    if (!hobby) {
      throw new BadRequestException(
        "The hobby with that name does not exist in the system.",
      );
    }
    let updateHobby = await this.get(id);
    return updateHobby.transform();
  }

  /**
   * Delete hobby given a id
   * @param {string} id
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(id: string): Promise<IGenericMessageBody> {
    return this.hobbyModel.deleteOne({ _id: id }).then(hobby => {
      if (hobby.deletedCount === 1) {
        return { message: `Deleted request successfull.` };
      } else {
        throw new BadRequestException(
          `Failed to delete a hobby by the name of ${id}.`,
        );
      }
    });
  }
}

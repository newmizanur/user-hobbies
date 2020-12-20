import { Controller, Body, Post, Patch, UseInterceptors, Delete, Param, BadRequestException, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserPayload } from "./payload/create.user.payload";
import { UserResponse, IUser } from "./user.model";
import { PatchUserPayload } from "./payload/patch.user.payload";
import { BasePayload } from "../shared/base.payload";
import { IGenericMessageBody } from "../shared/interfaces/generic.interface";

/**
 * User Controller
 */
@Controller("api/users")
@ApiTags("users")
export class UserController {
  /**
   * Constructor
   * @param {UserService} userService user service
   */
  constructor(
    private readonly userService: UserService,
  ) {}


   /**
   * Retrieves a user
   * @query page page number to fetch
   * @query pageSize number of rows to fetch
   * @returns {Promise<UserResponse>} queried user data
   */
  @Get("/")
  @ApiResponse({ status: 200, description: "Fetch user Request Received" , type: UserResponse, isArray: true})
  @ApiResponse({ status: 400, description: "Fetch user Request Failed" })
  async all(@Query() query: BasePayload): Promise<UserResponse[]> {
    return await this.userService.all(query);
  }

  /**
   * Retrieves a user
   * @param user id
   * @returns {Promise<UserResponse>} queried user data
   */
  @Get(":id")
  @ApiResponse({ status: 200, description: "Fetch user Request Received", type: UserResponse})
  @ApiResponse({ status: 400, description: "Fetch user Request Failed" })
  async get(@Param("id") id: string): Promise<UserResponse> {
    return await this.userService.get(id);
  }


  /**
   * Create a user
   * @param {CreateUserPayload} payload
   * @returns {Promise<UserResponse>} mutated user data
   */
  @Post("/")
  @ApiResponse({ status: 201, description: "Hobby created", type: UserResponse })
  @ApiResponse({ status: 400, description: "Bad Request" })
  async create(@Body() payload: CreateUserPayload): Promise<UserResponse> {
    return await this.userService.create(payload)
  }


  /**
   * Edit a user
   * @param {PatchUserPayload} payload
   * @returns {Promise<UserResponse>} mutated user data
   */
  @Patch("/")
  @ApiResponse({ status: 200, description: "Patch user Request Received", type: UserResponse })
  @ApiResponse({ status: 400, description: "Patch user Request Failed" })
  async patchUser(@Body() payload: PatchUserPayload) : Promise<UserResponse> {
    return await this.userService.edit(payload);
  }


  /**
   * Removes a user
   * @param {string} id the id to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the user has been deleted
   */
  @Delete(":id")
  @ApiResponse({ status: 200, description: "Delete user Request Received", type: UserResponse})
  @ApiResponse({ status: 400, description: "Delete user Request Failed" })
  async delete(
    @Param("id") id: string,
  ): Promise<IGenericMessageBody> {
    return await this.userService.delete(id);
  }
}

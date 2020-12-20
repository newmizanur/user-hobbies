import { Controller, Body, Post, Patch, UseInterceptors, Delete, Param, BadRequestException, Get, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { HobbyService } from "./hobby.service";
import { CreateHobbyPayload } from "./payload/create.hobby.payload";
import { HobbyResponse, IHobby } from "./hobby.model";
import { PatchHobbyPayload } from "./payload/patch.hobby.payload";
import { BasePayload } from "../shared/base.payload";
import { IGenericMessageBody } from "../shared/interfaces/generic.interface";

/**
 * Hobby Controller
 */
@Controller("api/hobbies")
@ApiTags("hobbies")
export class HobbyController {
  /**
   * Constructor
   * @param {HobbyService} hobbyService hobby service
   */
  constructor(
    private readonly hobbyService: HobbyService,
  ) {}


   /**
   * Retrieves a hobby
   * @query page page number to fetch
   * @query pageSize number of rows to fetch
   * @returns {Promise<HobbyResponse>} queried hobby data
   */
  @Get("/")
  @ApiResponse({ status: 200, description: "Fetch hobby Request Received", type: HobbyResponse })
  @ApiResponse({ status: 400, description: "Fetch hobby Request Failed" })
  async all(@Query() query: BasePayload): Promise<HobbyResponse[]> {
    return await this.hobbyService.all(query);
  }

  /**
   * Retrieves a hobby
   * @param hobby id
   * @returns {Promise<HobbyResponse>} queried hobby data
   */
  @Get(":id")
  @ApiResponse({ status: 200, description: "Fetch hobby Request Received", type: HobbyResponse  })
  @ApiResponse({ status: 400, description: "Fetch hobby Request Failed" })
  async get(@Param("id") id: string): Promise<HobbyResponse> {
    const hobby = await this.hobbyService.get(id);
    if (!hobby) {
      throw new BadRequestException(
        "The hobby with that id could not be found.",
      );
    }
    return hobby.transform();
  }


  /**
   * Create a hobby
   * @param {CreateHobbyPayload} payload
   * @returns {Promise<IHobby>} mutated hobby data
   */
  @Post("/")
  @ApiResponse({ status: 201, description: "Hobby created", type: HobbyResponse  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async create(@Body() payload: CreateHobbyPayload): Promise<HobbyResponse> {
    return await this.hobbyService.create(payload)
  }


  /**
   * Edit a hobby
   * @param {PatchHobbyPayload} payload
   * @returns {Promise<HobbyResponse>} mutated hobby data
   */
  @Patch("/")
  @ApiResponse({ status: 200, description: "Patch Hobby Request Received", type: HobbyResponse  })
  @ApiResponse({ status: 400, description: "Patch Hobby Request Failed" })
  async patchHobby(@Body() payload: PatchHobbyPayload) : Promise<HobbyResponse> {
    return await this.hobbyService.edit(payload);
  }


  /**
   * Removes a hobby
   * @param {string} username the username to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the hobby has been deleted
   */
  @Delete(":id")
  @ApiResponse({ status: 200, description: "Delete hobby Request Received", type: HobbyResponse  })
  @ApiResponse({ status: 400, description: "Delete hobby Request Failed" })
  async delete(
    @Param("id") id: string,
  ): Promise<IGenericMessageBody> {
    return await this.hobbyService.delete(id);
  }
}

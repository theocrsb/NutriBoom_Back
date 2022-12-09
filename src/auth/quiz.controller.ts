import { UseGuards } from "@nestjs/common";
import { Roles } from "./role.decorator";
import { RolesGuard } from "./roles.guard";

@UseGuards(RolesGuard);
@Roles('admin', 'user')
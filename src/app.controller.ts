import { Controller, Get, Render } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  @ApiExcludeEndpoint()
  index(): void {
    // this endpoint renders static page
  }
  @Get('websocket')
  @Render('websocket')
  @ApiExcludeEndpoint()
  websocket(): void {
    // this endpoint renders static page
  }
}

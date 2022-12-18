import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Response, HttpStatus, Req, Res } from '@nestjs/common';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import * as svgCaptcha from "svg-captcha";

@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) { }

  @Post()
  create(@Body() createDemoDto: CreateDemoDto) {
    console.log(createDemoDto);

    return this.demoService.create(createDemoDto);
  }

  @Get()
  findAll() {
    return this.demoService.findAll();
  }

  @Get("findWithQuery")
  findWithQuery(@Query() query) {
    console.log(query);
    console.log(query.name);

    return "Ok"
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.demoService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    return this.demoService.update(+id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoService.remove(+id);
  }
  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      // background: '#cc9966',  //背景颜色
    })
    req.session.code = captcha.text //存储验证码记录到session
    res.type('image/svg+xml')
    res.send(captcha.data)
  }

  @Post('create')
  createUser(@Req() req, @Body() body) {
    console.log(req.session.code, body)
    if (req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()) {
      return {
        message: "验证码正确"
      }
    } else {
      return {
        message: "验证码错误"
      }
    }
  }
}

import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

class data<T>{
    data: T //接收一个泛型对象
}

//统一全局返回的response

@Injectable() //标识当前类可以注入
export class Response<T = any> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(d => {
            return {
                data: d,
                status: 0,
                success: true,
                message: ''

            }
        }))
    }

}
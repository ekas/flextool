import { Resolver, Query, Args } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}
  @Query(() => String)
  helloWorld(): string {
    return this.appService.getHello();
  }
  @Query(() => String)
  hello(@Args('name') name: string): string {
    return this.appService.getHelloName(name);
  }
}

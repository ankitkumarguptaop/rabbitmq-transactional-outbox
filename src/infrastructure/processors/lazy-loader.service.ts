import { Injectable, Type } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

@Injectable()
export class LazyLoadHandler {
  constructor(private readonly lazyLoader: LazyModuleLoader) {}

  async handle(module: Type<any>, handler: Type<any>): Promise<any> {
    return this.lazyLoader
      .load(() => module)
      .then((module) => module.get(handler))
      .catch((err) => {
        console.log(
          `Failed to lazy load handler '${handler.name}' in module '${module.name}': ${err.message}`,
        );
        throw err;
      });
  }
}

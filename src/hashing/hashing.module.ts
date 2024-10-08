import { Module } from '@nestjs/common';
import {  HashService } from './hashing.service';

@Module({
  providers: [ HashService],
  exports: [ HashService],
})
export class HashModule {}

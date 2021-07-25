import {Expose,Exclude} from 'class-transformer';
import { IsNumber,IsString } from 'class-validator';
@Exclude()
export class AddProductDto{
@Expose()
@IsString()
title: string;

@Expose()
@IsString()
description: string;

@Expose()
@IsNumber()
price: number;

@Expose()
@IsNumber()
rating: number;

@Expose()
@IsString()
author: string;
}

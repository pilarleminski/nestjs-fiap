import {
    IsNotEmpty,
    IsString,
    IsNumberString,
} from "class-validator";

export class CreateProductsDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumberString()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumberString()
    categoryId: number;

}






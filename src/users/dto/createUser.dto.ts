import { 
    IsNotEmpty, 
    IsEmail,
    IsString,
    MinLength,
    MaxLength,   
} from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}
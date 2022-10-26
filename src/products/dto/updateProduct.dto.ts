import { PartialType } from "@nestjs/mapped-types";
import { CreateProductsDTO } from "./createProduct.dto";

export class UpdateProductDTO extends PartialType (CreateProductsDTO) {}
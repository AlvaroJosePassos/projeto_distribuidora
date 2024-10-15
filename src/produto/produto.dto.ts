import { IsBoolean, IsDateString, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength } from "class-validator";

export class ProdutoDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    nome: string;

    @IsString()
    @MinLength(6)
    armazem: string;

    @IsNumber()
    @IsPositive()
    quantidade: number;

    @IsBoolean()
    @IsOptional()
    perecivel: boolean;

    @IsDateString()
    @IsOptional()
    data_de_validade: Date;

    @IsNumber()
    @IsPositive()
    preco_aquisicao_unitario: number
}
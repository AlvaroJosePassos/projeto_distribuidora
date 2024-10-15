import { IsDate, IsEmail, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength } from "class-validator";

export class TransacaoDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsEmail()
    email_comprador: string;

    @IsString()
    @MinLength(3)
    produto: string;

    @IsNumber()
    @IsPositive()
    quantidade: number;

    @IsNumber()
    @IsPositive()
    valor_da_transacao: number;

    @IsDate()
    @IsOptional()
    data_da_transacao: Date;

    @IsString()
    @IsOptional()
    origem: string;

    @IsString()
    @IsOptional()
    destino: string;

    @IsDate()
    @IsOptional()
    data_de_entrega: Date;
}

export interface FindAllParameters {
    email_comprador: string;
    produto: string;
    data_da_transacao: Date;
}
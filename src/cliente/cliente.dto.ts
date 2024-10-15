import {IsDateString, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUUID, MinLength } from "class-validator";

export class ClienteDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(4)
    nome: string;

    @IsString()
    @MinLength(6)
    localidade: string;

    @IsDateString()
    @IsOptional()
    data_de_cadastro: Date;

    @IsNumber()
    qtd_de_transacoes: number;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    @IsOptional()
    telefone: number;

    @IsString()
    senha: string
}
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Funções básicas do CRUD

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }

  buy(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }

  // Função de realizar compra

  async buyProducts(productsToBuy: { id: number; qntd: number }[]) {
    // Array para colocar os itens que tiveram algum erro ao comprar
    const productsError = [];

    for (const { id, qntd } of productsToBuy) {
      // Pego o produto com o respectivo ID, para checar se ele existe e se a quantidade dele é suficiente para finalizar compra
      const auxProduct = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!auxProduct) {
        // Caso o produto não exista, vai para o array de erros
        productsError.push(id);
      } else if (auxProduct.qntd < qntd) {
        // Caso o produto tenha uma quantidade menor do que a necessária, vai para o array de erros
        productsError.push(id);
      } else {
        // Caso esteja tudo OK, atualizamos a quantidade do produto em questão
        await this.prisma.product.update({
          where: { id },
          data: {
            qntd: {
              // Decrement é uma "Atomic number operation" do Prisma
              // Foi o jeito mais eficiente que achei para realizar essa operação
              // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#atomic-number-operations
              decrement: qntd,
            },
          },
        });
      }
    }

    if (productsError.length == 0) {
      // Caso o array de erros esteja vazio, tudo foi comprado corretamente
      return 'Compra realizada!';
    } else {
      // Caso contrário, houveram alguns itens que não foram comprados e eu decidi retornar para o usuário
      return (
        'Compra parcialmente realizada! Os items com os ID a seguir não foram comprados: ' +
        productsError
      );
    }
  }
}

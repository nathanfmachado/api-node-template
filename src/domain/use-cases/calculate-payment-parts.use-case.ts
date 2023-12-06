import { UseCase } from '@/domain/use-case';
import { PaymentPartsInputModel, PaymentPartsResultModel } from '@/domain/models';
import { ProductRepository } from '@/data/repositories';
import { NotFoundError } from '@/core/errors';


export class CalculatePaymentPartsUseCase implements UseCase<PaymentPartsInputModel, PaymentPartsResultModel> {
  constructor(private productRepository: ProductRepository) {}

  async exec({ productId, parts }: PaymentPartsInputModel): Promise<PaymentPartsResultModel> {
    const product = await this.productRepository.findByIdWithCategory(productId);
    if (!product) {
      throw new NotFoundError();
    }
    if (parts === 1) {
      return {
        parts,
        totalAmount: product.price,
        partAmount: product.price,
      };
    }

    // pv * i / (1 - Math.pow(1 + i, -n))
    const tax = product.category?.tax ?? 0;
    const amount = (product.price * tax / (1 - Math.pow(1 + tax, -parts)));
    const partAmount = Math.ceil(amount * 100) / 100;
    const totalAmount = partAmount * parts;

    return {
      parts,
      totalAmount,
      partAmount,
    };
  }
}

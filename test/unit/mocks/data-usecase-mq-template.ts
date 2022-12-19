export const dataUsecaseMqTemplateMock = `
import { PublishInExchangeService } from '@/data/protocols/mq';
import { CreateExample } from '@/domain/usecases';

export class MqCreateExample implements CreateExample {
  constructor(private readonly publishInExchangeService: PublishInExchangeService) {}
}`;

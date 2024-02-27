import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequestEmployeeService } from './support-request-employee.service';

describe('SupportRequestEmployeeService', () => {
  let service: SupportRequestEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportRequestEmployeeService],
    }).compile();

    service = module.get<SupportRequestEmployeeService>(
      SupportRequestEmployeeService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

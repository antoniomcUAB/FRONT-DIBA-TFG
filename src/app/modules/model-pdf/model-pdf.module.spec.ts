import { ModelPDFModule } from './model-pdf.module';

describe('ModelPDFModule', () => {
  let modelPDFModule: ModelPDFModule;

  beforeEach(() => {
    modelPDFModule = new ModelPDFModule();
  });

  it('should create an instance', () => {
    expect(modelPDFModule).toBeTruthy();
  });
});

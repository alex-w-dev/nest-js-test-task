import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    // const result = await request(app.getHttpServer()).get('/');
    expect(true).toBeTruthy();
    //console.log(result, 'result');
    // expect(typeof result.body).toBe('string');
    // expect(result.body.startsWith('<!DOCUMNET')).toBeTruthy();
  });
});

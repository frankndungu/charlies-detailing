// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { ServiceModule } from './service/service.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'frank_dev',
      password: 'francodosha',
      database: 'charlies_detailing',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    CarModule,
    ServiceModule,
    BookingModule,
  ],
})
export class AppModule {}

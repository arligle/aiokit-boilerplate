/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { MasterModule } from "./master.module";
import { bootstrapBaseWebApp } from '@aiokit/bootstrap';

void bootstrapBaseWebApp(MasterModule);

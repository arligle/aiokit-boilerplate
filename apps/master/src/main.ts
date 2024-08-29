/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { MasterModule } from "./master.module";
import { bootstrapBaseApp } from '@aiokit/bootstrap';

void bootstrapBaseApp(MasterModule);

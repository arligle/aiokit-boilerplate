import { INestApplication } from "@nestjs/common";
import { callOrUndefinedIfException } from "./functions";
import { TYPEORM_FACTORIES_TOKEN, TYPEORM_SEEDERS_TOKEN } from "@aiokit/typeorm/lib/constants";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";
import { Logger } from 'nestjs-pino';

export async function runDatabaseSeeders(
  app: INestApplication,
  logger: Logger,
  shouldRunSeeds: boolean,
) {
  if (!shouldRunSeeds) {
    return;
  }

  const ds = callOrUndefinedIfException(() => app.get(DataSource));
  const seeders = app.get(TYPEORM_SEEDERS_TOKEN);
  const factories = app.get(TYPEORM_FACTORIES_TOKEN);

  if (seeders.length === 0) {
    return logger.warn(
      'Warning: No seeders found. Ensure you have provided seeders if you are expecting database seeding to occur.',
    );
  }

  if (ds instanceof DataSource) {
    await runSeeders(ds, {
      seeds: seeders,
      factories,
    });
  } else {
    logger.warn(
      'Seems like run seeds is enabled, but there is no data source provided, this seems like a mistake. Please review or disable seed run',
    );
  }
}

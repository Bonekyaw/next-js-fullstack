#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/93d2cfdc76098202f00800409bfd2cacb811019124601be5ef90b47a3fd68fa8/contract';
import endContract from '../../snapshots/93d2cfdc76098202f00800409bfd2cacb811019124601be5ef90b47a3fd68fa8/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/f9f2eaa408de6f237c77465916b38cd991f37933114a4ec040a773a9524bc456/contract';
import startContract from '../../snapshots/f9f2eaa408de6f237c77465916b38cd991f37933114a4ec040a773a9524bc456/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('sku', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

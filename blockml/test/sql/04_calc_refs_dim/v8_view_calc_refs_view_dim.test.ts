import { AmError } from '../../../src/barrels/am-error';
import { ApStruct } from '../../../src/barrels/ap-struct';
import { api } from '../../../src/barrels/api';
import { interfaces } from '../../../src/barrels/interfaces';

//

// yarn jest test/sql/04_calc_refs_dim/v8_view_calc_refs_view_dim.test.ts
jest.setTimeout(30000);
test('testName', () => {
  let query = [
    '#standardSQL',
    'WITH',
    '  model_main AS (',
    '    SELECT',
    '      a.dim3 as a_dim3,',
    '      a.dim4 as a_dim4',
    '    FROM (',
    '      SELECT',
    '        ((111) + 222) + 333 as dim3,',
    '        444 as dim4',
    '      FROM `1`',
    '      ) as a',
    '    ',
    '    GROUP BY 1, 2',
    '  )',
    '',
    'SELECT',
    '  a_dim3 + a_dim4 as a_calc1,',
    '  a_dim3,',
    '  a_dim4',
    'FROM model_main',
    '',
    'LIMIT 500'
  ];

  expect.assertions(query.length);

  return ApStruct.rebuildStruct({
    dir: 'test/sql/04_calc_refs_dim/v8',
    weekStart: api.ProjectWeekStartEnum.Monday,
    connection: api.ProjectConnectionEnum.BigQuery,
    bqProject: 'flow-1202',
    projectId: 'unkProjectId',
    structId: 'unkStructId'
  }).then((struct: interfaces.Struct) => {
    struct.dashboards[0].reports[0].bq_views[0].sql.forEach((element, i, a) => {
      expect(element).toEqual(query[i]);
    });
  });
});

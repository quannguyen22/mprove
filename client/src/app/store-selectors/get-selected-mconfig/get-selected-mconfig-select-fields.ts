import { createSelector } from '@ngrx/store';
import { getSelectedMconfigSelect } from '@app/store-selectors/get-selected-mconfig/get-selected-mconfig-select';
import { getSelectedProjectModeRepoModelFields } from '@app/store-selectors/get-selected-project-mode-repo-model/get-selected-project-mode-repo-model-fields';
import * as api from '@app/api/_index';

export const getSelectedMconfigSelectFields = createSelector(
  getSelectedMconfigSelect,
  getSelectedProjectModeRepoModelFields,
  (select: string[], fields: api.ModelField[]) => {
    let selectFields: api.ModelField[] = [];

    if (select && fields) {
      let selectDimensions: api.ModelField[] = [];
      let selectMeasures: api.ModelField[] = [];
      let selectCalculations: api.ModelField[] = [];

      select.forEach((fieldId: string) => {
        let field = fields.find(f => f.id === fieldId);

        if (field.field_class === api.ModelFieldFieldClassEnum.Dimension) {
          selectDimensions.push(field);
        } else if (field.field_class === api.ModelFieldFieldClassEnum.Measure) {
          selectMeasures.push(field);
        } else if (
          field.field_class === api.ModelFieldFieldClassEnum.Calculation
        ) {
          selectCalculations.push(field);
        }

        selectFields = [
          ...selectDimensions,
          ...selectMeasures,
          ...selectCalculations
        ];
      });

      return selectFields;
    }
  }
);

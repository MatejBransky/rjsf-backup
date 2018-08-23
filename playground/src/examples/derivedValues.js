import React from 'react';
import { fields } from '@react-schema-form/core';
import memoize from 'memoize-one';

const NumberField = props => {
  if (props.schema.derived) {
    return <span>{props.formData}</span>;
  }
  return <fields.NumberField {...props} />;
};

const sum = memoize((a, b) => {
  const result = a + b;
  /*eslint-disable-next-line*/
  console.log('sum evaluated!');
  return result;
});

export default {
  schema: {
    type: 'object',
    properties: {
      user: { type: 'string' },
      income: { type: 'number' },
      outcome: { type: 'number' },
      result: { type: 'number', derived: true }
    }
  },
  reducer: ({ income = 0, outcome = 0, ...values }) => {
    /*eslint-disable-next-line*/
    console.log('reducer called!');
    return { ...values, income, outcome, result: sum(income, outcome) };
  },
  fields: { NumberField }
};

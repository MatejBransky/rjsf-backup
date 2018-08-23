import React from 'react';
import memoize from 'memoize-one';

const mask = number =>
  typeof number === 'number' ? String(number).replace('.', ',') : '';
const unmask = string => {
  if (string === undefined) return string;
  const number = Number(string.replace(',', '.'));
  return isNaN(number) ? string : number;
};

class NumberField extends React.Component {
  state = {
    number: this.props.formData,
    string: mask(this.props.formData)
  };

  static getDerivedStateFromProps(props, state) {
    if (props.formData !== state.number) {
      return {
        number: props.formData,
        string: mask(props.formData)
      };
    }
    return null;
  }

  handleChange = string => {
    const number = unmask(string);
    this.setState({ number, string });
    this.props.onChange(number);
  };

  render() {
    const { StringField } = this.props.registry.fields;

    if (this.props.schema.derived) {
      return <span>{mask(this.props.formData)}</span>;
    }

    return (
      <StringField
        {...this.props}
        formData={this.state.string}
        onChange={this.handleChange}
      />
    );
  }
}

const sum = memoize((a, b) => {
  const result = a + b;
  /*eslint-disable-next-line*/
  console.log('sum evaluated!');
  return result;
});

export default {
  schema: {
    type: 'object',
    description: 'It supports numbers with comma as decimal symbol.',
    properties: {
      user: { type: 'string' },
      income: { type: 'number' },
      outcome: { type: 'number' },
      result: {
        type: 'number',
        derived: true,
        description:
          'The result is reevaluated only if income or outcome was changed'
      }
    }
  },
  reducer: ({ income, outcome, ...values }) => {
    /*eslint-disable-next-line*/
    console.log('reducer called!');
    return {
      ...values,
      income,
      outcome,
      result: sum(income || 0, outcome || 0)
    };
  },
  fields: { NumberField }
};

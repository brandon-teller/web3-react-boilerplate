import { ChangeEvent, forwardRef, HTMLProps, useCallback, useEffect, useState } from 'react';
import { Input } from './Input';

const NumericInput = forwardRef<HTMLInputElement, EnforcedNumericInputProps>(function NumericInput(
  { value, onChange, className, enforcer, pattern, ...props }: EnforcedNumericInputProps,
  ref,
) {
  // Allow value/onChange to use number by preventing a trailing decimal separator from triggering onChange
  const [state, setState] = useState(value ?? '');
  useEffect(() => {
    if (state !== value) {
      setState(value ?? '');
    }
  }, [value, state, setState]);

  const validateChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextInput = enforcer(event.target.value.replace(/,/g, '.'));
      if (nextInput !== null) {
        setState(nextInput ?? '');
        if (nextInput === undefined || nextInput !== value) {
          onChange?.(nextInput === undefined ? undefined : nextInput);
        }
      }
    },
    [value, onChange, enforcer],
  );

  return (
    <Input
      type='text'
      placeholder={props.placeholder || ''}
      required
      value={state}
      onChange={validateChange}
      inputProps={{
        pattern,
        minLength: 1,
        inputMode: 'decimal',
        autoComplete: 'off',
        autoCorrect: 'off',
        spellCheck: 'false',
        ...props,
      }}
      ref={ref as any}
    />
  );
});

interface NumericInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'as' | 'value'> {
  value?: string | undefined;
  onChange?: (input: string | undefined) => void;
  className?: string;
}

interface EnforcedNumericInputProps extends NumericInputProps {
  // Validates nextUserInput; returns stringified value or undefined if valid, or null if invalid
  enforcer: (nextUserInput: string) => string | undefined | null;
}

const decimalRegexp = /^\d*(?:[.])?\d*$/;
const decimalEnforcer = (nextUserInput: string) => {
  if (nextUserInput === '') {
    return undefined;
  } else if (nextUserInput === '.') {
    return '0.';
  } else if (decimalRegexp.test(nextUserInput)) {
    return nextUserInput;
  }
  return null;
};

export const DecimalInput = forwardRef(function DecimalInput(props: NumericInputProps, ref) {
  return <NumericInput pattern='^[0-9]*[.,]?[0-9]*$' enforcer={decimalEnforcer} ref={ref as any} {...props} />;
});

const integerRegexp = /^\d*$/;
const integerEnforcer = (nextUserInput: string) => {
  if (nextUserInput === '' || integerRegexp.test(nextUserInput)) {
    const nextInput = parseInt(nextUserInput);
    return isNaN(nextInput) ? undefined : nextInput.toString();
  }
  return null;
};
export const IntegerInput = forwardRef(function IntegerInput(props: NumericInputProps, ref) {
  return <NumericInput pattern='^[0-9]*$' enforcer={integerEnforcer} ref={ref as any} {...props} />;
});

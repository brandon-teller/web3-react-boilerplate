import { InputBase, InputBaseProps, styled } from '@mui/material';
import { useCustomTheme } from '@/hooks/useTheme';

export const Input = (props: InputBaseProps) => {
  return <SOutlinedInput {...props}></SOutlinedInput>;
};

const SOutlinedInput = styled(InputBase)((props: InputBaseProps) => {
  const { currentTheme } = useCustomTheme();
  return {
    fontSize: '1rem',
    borderRadius: currentTheme.secondaryBorderRadius,
    padding: '0.5rem',
    border: props.error ? currentTheme.inputErrorBorder : currentTheme.inputBorder,
    flex: 1,
  };
});

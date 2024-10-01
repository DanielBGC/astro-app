import { Button } from 'react-native';

export const MyButton = () => {
  return (
    <Button
      title="Press me"
      onPress={() => {
        throw new Error('Hello, Sentry!');
      }}
    />
  );
};

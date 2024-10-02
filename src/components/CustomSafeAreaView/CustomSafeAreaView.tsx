import { SafeAreaView } from 'react-native-safe-area-context';

export const CustomSafeAreaView = (props: any) => {
  return (
    <SafeAreaView style={props.style} edges={['left', 'right', 'bottom']}>
      {props.children}
    </SafeAreaView>
  );
};

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useContext } from 'react';
import { Button, View } from 'react-native';
import DialogContext from 'utils/DialogContext';
import Dialog from './Dialog';

const ExampleDialog = () => {
  const { openDialog } = useContext(DialogContext);
  return (
    <View>
      <Button
        title="다이얼로그 오픈"
        onPress={() =>
          openDialog('다이얼로그가 성공적으로 열렸습니다.', 'success')
        }
      />
      <Button
        title="다이얼로그 오류"
        onPress={() =>
          openDialog('다이얼로그에 오류가 발생했습니다.', 'validate')
        }
      />
    </View>
  );
};

export default {
  title: 'components/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const DialogTest: ComponentStory<typeof Dialog> = () => (
  <ExampleDialog />
);

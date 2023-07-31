import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PaperProvider, Portal } from 'react-native-paper';
import { Button, View } from 'react-native';
import useDialog from 'hooks/app/useDialog';
import Dialog from './Dialog';

const ExampleDialog = () => {
  const { dialog, closeDialog, openDialog } = useDialog();
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
      <PaperProvider>
        <Portal.Host>
          <Dialog dialog={dialog} closeDialog={() => closeDialog()} />
        </Portal.Host>
      </PaperProvider>
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

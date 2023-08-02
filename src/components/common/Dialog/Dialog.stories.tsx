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
          openDialog({
            text: '다이얼로그가 성공적으로 열렸습니다.',
            type: 'success',
          })
        }
      />
      <Button
        title="다이얼로그 오류"
        onPress={() =>
          openDialog({
            text: '다이얼로그에 오류가 발생했습니다.',
            type: 'validate',
          })
        }
      />
      <Button
        title="cofirm 다이얼로그"
        onPress={() =>
          openDialog({
            text: '동의하십니까?',
            type: 'confirm',
            apply: () => {
              console.log('동의');
            },
            applyText: '동의합니다.',
          })
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

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useContext } from 'react';
import { Button, View } from 'react-native';
import DialogContext from 'utils/DialogContext';

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
            callback: () => {
              console.log('닫기');
            },
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
      <Button
        title="다이얼로그 contents"
        onPress={() =>
          openDialog({
            text: '다이얼로그를 볼게요.',
            contents: '설명이고, 긴설명이고 긴설명입니다.',
            type: 'success',
          })
        }
      />
    </View>
  );
};

export default {
  title: 'components/Dialog',
  component: ExampleDialog,
} as ComponentMeta<typeof ExampleDialog>;

export const DialogTest: ComponentStory<typeof ExampleDialog> = () => (
  <ExampleDialog />
);

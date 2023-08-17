import React from 'react';
import { TextInput } from 'react-native';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { QnaTuple } from 'types/event/QnaTuple';
import questionInputStyles from './QuestionInput.style';

interface Props {
  qnaList: QnaTuple[];
  setQnaList: React.Dispatch<QnaTuple[]>;
}

const QuestionInput = ({ qnaList, setQnaList }: Props) => {
  const handleChangeText = (value: string, questionId: number) => {
    const updatedQnaList: QnaTuple[] = qnaList.map(([questionInfo, answer]) => {
      if (questionInfo.eventExtraQuestionId === questionId) {
        return [questionInfo, value];
      }
      return [questionInfo, answer];
    });

    setQnaList(updatedQnaList);
  };

  return (
    <SpaceLayout size={8}>
      {qnaList.map((question) => (
        <SpaceLayout size={7}>
          <Text style={questionInputStyles.label}>{question[0].question}</Text>

          <TextInput
            style={[
              questionInputStyles.textWrapper,
              questionInputStyles.inputContainer,
              questionInputStyles.text,
            ]}
            value={question[1]}
            onChangeText={(value) =>
              handleChangeText(value, question[0].eventExtraQuestionId)
            }
          />
        </SpaceLayout>
      ))}
    </SpaceLayout>
  );
};

export default QuestionInput;

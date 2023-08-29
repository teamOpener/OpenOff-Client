import { View } from 'react-native';
import { colors } from 'styles/theme';
import Text from 'components/common/Text/Text';
import DonutChart from './DonutChart';
import donutChartInfoStyles from './DonutChartInfo.style';

interface Props {
  numerator: number;
  denominator: number;
  label: string;
  color: keyof typeof colors;
}

const DonutChartInfo = ({ numerator, denominator, label, color }: Props) => {
  return (
    <View style={donutChartInfoStyles.container}>
      <View style={donutChartInfoStyles.donutContainer}>
        <DonutChart
          size={150}
          innerStrokeWidth={3}
          strokeWidth={5}
          progress={(numerator / denominator) * 100}
          circleRadius={7}
          color={color}
        />

        <View style={donutChartInfoStyles.donutInnerTextWrapper}>
          <View style={donutChartInfoStyles.donutTextWrapper}>
            <Text color={color} style={donutChartInfoStyles.numeratorText}>
              {numerator}
            </Text>
            <Text
              color="grey"
              style={donutChartInfoStyles.denominatorText}
            >{`/${denominator}`}</Text>
          </View>
        </View>
      </View>

      <Text color={color} style={donutChartInfoStyles.labelText}>
        {label}
      </Text>
    </View>
  );
};

export default DonutChartInfo;

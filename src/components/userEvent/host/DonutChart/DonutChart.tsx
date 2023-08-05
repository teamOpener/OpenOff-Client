import { View } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';
import { colors } from 'styles/theme';

interface Props {
  size: number;
  innerStrokeWidth: number;
  strokeWidth: number;
  progress: number;
  circleRadius: number;
  color: keyof typeof colors;
}

const DonutChart = ({
  size,
  innerStrokeWidth,
  strokeWidth,
  progress,
  circleRadius,
  color,
}: Props) => {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressValue = progress >= 100 ? 100 : progress;

  const angle = (360 * progressValue) / 100;
  const offset = circleRadius * -0.5 + strokeWidth / 2; // To ensure the circle is outside the stroke
  const endCircleX =
    size / 2 + (radius - offset) * Math.cos(((angle - 90) * Math.PI) / 180);
  const endCircleY =
    size / 2 -
    (radius - offset) * Math.sin(((angle - 90) * Math.PI) / 180) * -1;

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Svg width={size + circleRadius * 2} height={size + circleRadius * 2}>
        {/* Donut Chart */}
        <Circle
          cx={size / 2 + circleRadius}
          cy={size / 2 + circleRadius}
          r={radius}
          fill="transparent"
          stroke={colors.darkGrey}
          strokeWidth={innerStrokeWidth}
        />
        <Path
          d={`
          M ${size / 2 + circleRadius},${size / 2 - radius + circleRadius}
          a ${radius},${radius} 0 1,1 0,${2 * radius}
          a ${radius},${radius} 0 1,1 0,-${2 * radius}
        `}
          fill="transparent"
          stroke={colors[color]}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={(1 - progressValue / 100) * circumference}
        />

        {/* Circle at the end */}
        <Circle
          cx={endCircleX + circleRadius}
          cy={endCircleY + circleRadius}
          r={circleRadius}
          fill={colors[color]}
        />
      </Svg>
    </View>
  );
};

export default DonutChart;

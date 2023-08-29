import { Image as RNImage, ImageProps } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ImageProps {
  //
}

/**
 * 이미지도 추후에 default options를 설정해야할 수도 있을 것 같아 제작해놨습니다.
 * component들을 react-native에서 바로 꺼내쓰는 것이 아니라 이런식으로 한 번 감싼 후 사용하는 게 좋을 것 같다고 생각합니다..!
 * 새로 Image 컴포넌트들 추가할 때 이걸 사용하는 게 좋을 것 같아용
 *
 */
const Image = ({ ...props }: Props) => {
  return <RNImage {...props} />;
};

export default Image;

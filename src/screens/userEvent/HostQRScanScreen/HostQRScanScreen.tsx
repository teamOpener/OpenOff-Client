import { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { openSettings } from 'react-native-permissions';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import Text from 'components/common/Text/Text';
import MENT_HOST from 'constants/userEvent/host/hostMessage';
import useRouteParams from 'hooks/navigator/useRouteParams';
import { StackMenu } from 'constants/menu';
import hostQRScanScreenStyles from './HostQRScanScreen.style';

// TODO

const HostQRScanScreen = () => {
  const params = useRouteParams<StackMenu.HostQRScan>();

  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const handleSetting = () => {
    openSettings();
  };

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/images/QRBackground.png')}
      style={[hostQRScanScreenStyles.container, StyleSheet.absoluteFill]}
    >
      <Text style={hostQRScanScreenStyles.mainText}>
        {MENT_HOST.MAIN.QR_SCAN_MAIN_INFO}
      </Text>

      {device != null && hasPermission ? (
        <Camera
          style={hostQRScanScreenStyles.cameraWrapper}
          device={device}
          isActive
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={hostQRScanScreenStyles.cameraWrapper}
          onPress={handleSetting}
        >
          <Text style={hostQRScanScreenStyles.requestCameraPermission}>
            카메라 권한을 허용해주세요.
          </Text>
        </TouchableOpacity>
      )}

      <Text style={hostQRScanScreenStyles.subText}>
        {MENT_HOST.MAIN.QR_SCAN_SUB_INFO}
      </Text>

      {barcodes.map((barcode, idx) => (
        <View key={idx} style={hostQRScanScreenStyles.resultWrapper}>
          <Text color="main" style={hostQRScanScreenStyles.resultText}>
            {barcode.displayValue}
          </Text>
        </View>
      ))}
    </ImageBackground>
  );
};

export default HostQRScanScreen;

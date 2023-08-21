import { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { openSettings } from 'react-native-permissions';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import Text from 'components/common/Text/Text';
import Icon from 'components/common/Icon/Icon';
import MENT_HOST from 'constants/userEvent/host/hostMessage';
import API_ERROR_MESSAGE from 'constants/errorMessage';
import { useCheckQR } from 'hooks/queries/ledger';
import queryKeys from 'constants/queryKeys';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import { QRCheckResponseDto } from 'models/ledger/response/QRCheckResponseDto';
import { colors } from 'styles/theme';
import { ApiErrorResponse, ApiResponse } from 'types/ApiResponse';
import { QRCheckType } from 'types/hostQr/QRCheck';
import hostQRScanScreenStyles from './HostQRScanScreen.style';

const HostQRScanScreen = () => {
  const queryClient = useQueryClient();

  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const [text, setText] = useState<string>('');
  const [qrCheckType, setQRCheckType] = useState<QRCheckType>('default');
  const [isPausing, setIsPausing] = useState<boolean>(false);

  const handleSetting = () => {
    openSettings();
  };

  const showQRCheckType = () => {
    setIsPausing(true);
    setTimeout(() => {
      setIsPausing(false);
      setText('');
      setQRCheckType('default');
    }, 3000);
    queryClient.invalidateQueries(queryKeys.participantKeys.all);
    queryClient.invalidateQueries(queryKeys.hostKeys.all);
  };

  const handleSuccessQRCheck = (data: ApiResponse<QRCheckResponseDto>) => {
    setText(data.message);
    setQRCheckType('success');
    showQRCheckType();
  };

  const handleErrorQRCheck = (error: ApiErrorResponse) => {
    setText(error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT);
    setQRCheckType('error');
    showQRCheckType();
  };

  const { mutateAsync: checkQR, isLoading } = useCheckQR(
    handleSuccessQRCheck,
    handleErrorQRCheck,
  );

  useEffect(() => {
    if (
      !barcodes ||
      !barcodes[0] ||
      !barcodes[0].displayValue ||
      isLoading ||
      isPausing
    ) {
      return;
    }

    checkQR({ content: barcodes[0].displayValue });
  }, [barcodes]);

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
      {isLoading && (
        <WithIconLoading isActive backgroundColor={colors.background} />
      )}
      <Text style={hostQRScanScreenStyles.mainText}>
        {MENT_HOST.MAIN.QR_SCAN_MAIN_INFO}
      </Text>

      <View>
        <View style={hostQRScanScreenStyles.absoluteContainer}>
          {qrCheckType === 'success' && (
            <Icon name="IconCheckCircle" size={127} fill="lightGreen" />
          )}
          {qrCheckType === 'error' && (
            <Icon name="IconExitCircle" size={127} fill="error" />
          )}
        </View>
        {device != null && hasPermission ? (
          <Camera
            style={[
              hostQRScanScreenStyles.cameraWrapper,
              qrCheckType === 'success' &&
                hostQRScanScreenStyles.successCameraWrapper,
              qrCheckType === 'error' &&
                hostQRScanScreenStyles.errorCameraWrapper,
            ]}
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
      </View>

      <Text style={hostQRScanScreenStyles.subText}>
        {MENT_HOST.MAIN.QR_SCAN_SUB_INFO}
      </Text>

      {qrCheckType !== 'default' && text !== '' && (
        <View
          style={[
            hostQRScanScreenStyles.resultWrapper,
            {
              borderColor:
                qrCheckType === 'success' ? colors.lightGreen : colors.error,
            },
          ]}
        >
          <Text
            color={qrCheckType === 'success' ? 'lightGreen' : 'error'}
            style={hostQRScanScreenStyles.resultText}
          >
            {text}
          </Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default HostQRScanScreen;

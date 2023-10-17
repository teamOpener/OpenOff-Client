import i18n from 'locales';
import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import QRResultView from 'components/userEvent/host/QRResultView/QRResultView';
import { StackMenu } from 'constants/app/menu';
import queryKeys from 'constants/queries/queryKeys';
import useStackRoute from 'hooks/navigator/useStackRoute';
import { useCheckQR } from 'hooks/queries/ledger';
import { QRCheckResponseDto } from 'models/ledger/response/QRCheckResponseDto';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { colors } from 'styles/theme';
import { ApiErrorResponse, ApiResponse } from 'types/ApiResponse';
import { QRCheckType } from 'types/hostQr/QRCheck';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import hostQRScanScreenStyles from './HostQRScanScreen.style';

const HostQRScanScreen = () => {
  const queryClient = useQueryClient();
  const { params } = useStackRoute<StackMenu.HostQRScan>();

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
    setText(error.response?.data.message ?? i18n.t('default_error_message'));
    setQRCheckType('error');
    showQRCheckType();
  };

  const { mutateAsync: checkQR, isLoading } = useCheckQR(
    handleSuccessQRCheck,
    handleErrorQRCheck,
  );

  const cameraWrapperStyles = [
    hostQRScanScreenStyles.cameraWrapper,
    qrCheckType === 'success' && hostQRScanScreenStyles.successCameraWrapper,
    qrCheckType === 'error' && hostQRScanScreenStyles.errorCameraWrapper,
  ];

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

    checkQR({
      eventIndexId: params.eventIndex,
      content: barcodes[0].displayValue,
    });
  }, [barcodes]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return device != null && hasPermission ? (
    <>
      <Camera
        style={hostQRScanScreenStyles.container}
        device={device}
        isActive
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      <View style={hostQRScanScreenStyles.container}>
        {isLoading && (
          <WithIconLoading isActive backgroundColor={colors.background} />
        )}
        <Text style={hostQRScanScreenStyles.mainText}>
          {i18n.t('qr_scan_main_info')}
        </Text>

        <View style={cameraWrapperStyles}>
          <View style={hostQRScanScreenStyles.absoluteContainer}>
            {qrCheckType === 'success' && (
              <Icon name="IconCheckCircle" size={127} fill="lightGreen" />
            )}
            {qrCheckType === 'error' && (
              <Icon name="IconExitCircle" size={127} fill="error" />
            )}
          </View>
        </View>

        <Text style={hostQRScanScreenStyles.subText}>
          {i18n.t('qr_scan_sub_info')}
        </Text>

        <QRResultView qrCheckType={qrCheckType} text={text} />
      </View>
    </>
  ) : (
    <View style={StyleSheet.absoluteFill}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={hostQRScanScreenStyles.noPermissionContainer}
        onPress={handleSetting}
      >
        <Text variant="body2">{i18n.t('no_camera_permission')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HostQRScanScreen;

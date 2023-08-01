interface Dialog {
  type: string;
  text: string;
  isShow: boolean;
  callback: () => void;
}

export default Dialog;

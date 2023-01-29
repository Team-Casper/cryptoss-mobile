import {Dimensions} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';

export const colors = {
  focusedTextColor: '#4CB6C4',
  blurredTextColor: '#828282',
  focusedBorderColor: '#4CB6C4',
  blurredBorderColor: '#D9D9D9',
  chosenOptionBackgroundColor: '#D9D9D9',
  consentColor: '#2ED8A7',
  homeScreenBackgroundColor: '#F2F2F2',
  gray_1: '#333333',
  gray_2: '#4F4F4F',
  gray_6: '#F2F2F2',
  pointColor_light: '#2ED8A7',
};

export class CryptossDimensions {
  private static instance: CryptossDimensions;
  public height!: number;
  public width!: number;
  public scale!: number;
  private screenWidth = Dimensions.get('screen').width;
  private screenHeight = Dimensions.get('screen').height;
  private screenScale = Math.sqrt(
    Dimensions.get('screen').height * Dimensions.get('screen').height +
      Dimensions.get('screen').width * Dimensions.get('screen').width,
  );

  public static getInstance(insets?: EdgeInsets): CryptossDimensions {
    return insets
      ? (this.instance = new CryptossDimensions(insets))
      : this.instance;
  }
  private constructor(insets: EdgeInsets) {
    const h = 734 + insets.bottom + insets.top;
    const w = 375 + insets.left + insets.right;
    this.height = this.screenHeight / (734 + insets.bottom + insets.top);
    this.width = this.screenWidth / (375 + insets.left + insets.right);
    this.scale = this.screenScale / Math.sqrt(h * h + w * w);
  }
}
export const basicDimensions = {
  // figma 상에서 사용하는 가로세로
  height: 812,
  width: 375,
  scale: Math.sqrt(812 * 812 + 375 * 375),
};

export const safeDimensions = {
  height: 734,
  width: 375,
  scale: Math.sqrt(734 * 734 + 375 * 375),
};

export const height: number =
  Dimensions.get('screen').height / basicDimensions.height; // 높이 변환 작업

export const width: number =
  Dimensions.get('screen').width / basicDimensions.width; // 가로 변환 작업

export const scale: number =
  Math.sqrt(
    Dimensions.get('screen').height * Dimensions.get('screen').height +
      Dimensions.get('screen').width * Dimensions.get('screen').width,
  ) / basicDimensions.scale;

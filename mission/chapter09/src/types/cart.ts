// 하나의 lp 정보
export type Lp = {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
};

//cartItems에는 여러 Lp가 있다
export type CartItems = Lp[];

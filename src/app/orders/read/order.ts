export class OrderService {
  // Static property
  static readonly ORDER_STARTED: string = '0';
  static readonly ORDER_COMPLETED: string = '1';
  static readonly ORDER_CENCELED: string = '2';
  static readonly ORDER_VIEWED: string = '3';
  static readonly ORDER_ASSIGNED_DELIVERY_MAN: string = '20';
  static readonly ORDER_PREPARING: string = '25';
  static readonly ORDER_IN_ROAD: string = '30';

  orderStatus = {
    [OrderService.ORDER_STARTED]: 'جديدة',
    [OrderService.ORDER_VIEWED]: 'تم الاطلاع عليها',
    [OrderService.ORDER_ASSIGNED_DELIVERY_MAN]: 'مع الموصل',
    [OrderService.ORDER_PREPARING]: 'قيد التجهيز',
    [OrderService.ORDER_IN_ROAD]: 'في الطريق إليك',
    '1000': 'أخرى',
  };
}

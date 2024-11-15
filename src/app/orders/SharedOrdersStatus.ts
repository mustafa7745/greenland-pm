// order.model.ts

// Enum لحالة الدفع مع القيم الرقمية
export enum SharedOrderPaid {
    ELECTEONIC_PAID = "2",     // دفع الكتروني
    PAID_FROM_WALLET = "3",    // دفع من المحفظة
    PAID_IN_STORE = "4",       // دفع نقدي في المطعم
    PAID_ON_DELIVERY = "1"     // دفع عند التسليم
}

// Enum لطريقة التسليم مع القيم الرقمية
export enum SharedOrderINRest {
    CAR = "4",      // الى السيارة
    SAFARY = "1",   // سفري
    MAHALY = "2",   // محلي
    FAMILY = "3"    // محلي عوائل
}

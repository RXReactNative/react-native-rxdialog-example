/**
 * @this 优惠券 数据模型 内容归类
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * -------------------------------
 * 
 * 
 */

 
export const CouponDiscountTypeFixedRatio    = 800; // 抵扣优惠券（固定比例）
export const CouponDiscountTypeFixedAmount   = 801; // 抵扣优惠券（固定金额）
export const CouponDiscountTypePromotionRate = 802; // 加息优惠券
export const CouponDiscountTypePrivilege     = 803; // 特权本金
// const CouponDiscountTypePromotionRate = 805; // 加息优惠券-加息 (等于802)

export const CouponPickerCouponTypeJX = 0;
export const CouponPickerCouponTypeJL = 1;

export function RXCouponObj() {
  var fsData={availArr: [], unAvailArr: []};
  return fsData;
}

/**
 * 判断选中id 是否需要展开更多
 * @param {*} availArr 可用数组-优惠券列表
 * @param {*} clear    是否[不再使用]-优惠券列表
 */
export function RXCouponLookforID(availArr=[], clear=true) {
  if(clear) return false;

  if (!Array.isArray(availArr) || availArr.length < 2) {
    return false;
  }

  for(var i = 0; i < availArr.length; i++) {
    let viewModel = availArr[i].viewModel || null;
    if(!viewModel) continue;

    let isPicked = viewModel.isPicked;
    if(isPicked) {
      return i>1;
    }
  }
  return false;
}

export function RXCouponSchedule(models?: Array, inputMoney?:number, selectedId ?: Number) : Object {
  var cpObj = RXCouponObj();
  // console.log('models='+models+'___');

  if(!models) return cpObj;
  // console.log('couponType='+couponType+'___');

  if (!Array.isArray(models) || models.length < 1) {
    return cpObj;
  }

  cpObj = couponArray(models, inputMoney, (i)=>{
    // if(couponType === CouponTypeNull) {}
    return couponDCBInvest(i, selectedId);
  })
  return cpObj;

//服务器已经排好序了，不用客户端处理
  //1 奖励券在上、抵扣券在下
  //排序
  //--------------------------
  //2
  // cpObj.availArr = couponSort(cpObj.availArr);
  // cpObj.unAvailArr = couponSort(cpObj.unAvailArr);
  // return cpObj;
}


/**
 * 优惠券-根据输入金额 判断哪些是 可用的优惠券、不可用优惠券
 * 
 * @param {*} models      优惠券-列表数据
 * @param {*} inputMoney  输入金额
 * @param {*} mapFun      方法-方便自定义内部数据
 */
function couponArray(models={}, inputMoney? : Number, mapFun?: Function ) : Object {
  inputMoney = inputMoney || 0;
  var cpObj = RXCouponObj();
  let length = models.length;
  for(var i = 0; i < length; i++) {
    let item = models[i];
    if(!item) continue;

    let discount = item.discount;
    if(!discount) continue;

    let newItem = mapFun && mapFun(item) ;
    if(!newItem) continue;

    let effectiveAmount = discount.effectiveAmount || 0;
    if(inputMoney<effectiveAmount) {
      cpObj.unAvailArr.push(newItem);
    }else {
      cpObj.availArr.push(newItem);
    }
  }

  //排序

  return cpObj;

}



/**
 * 定存宝-出借  针对某个优惠券，封装自己的显示数据 
 * 
 * @param {*} couponModel 优惠券
 * @param {*} selectedId  选中的id(方便告诉下次展示 某个优惠券的状态/样式 )
 */
function couponDCBInvest(couponModel={}, selectedId=0) : Object {
  let discount = couponModel.discount;
  let amount = couponModel.amount;
  if(!discount || !amount) return nil;

  let model = {};
  if(discount.type === CouponDiscountTypePromotionRate) {
    model.couponType = CouponPickerCouponTypeJX;
    model.prefix = '+ ';
    model.promotionRate = discount.promotionalAnnualInterestRate +'%';
  } else {
    model.couponType = CouponPickerCouponTypeJL;
    model.prefix = '￥ ';
    model.promotionRate = amount.left;
  }
  model.id = couponModel.id;
  model.couponDesc = discount.couponDesc; 
  model.dateDesc   = discount.couponLimitTime; 
  model.couponName = discount.couponName;
  model.isPicked = false;
  if(selectedId > 0) {
    if(model.id === selectedId) {
      model.isPicked = true;
    }
  }
  couponModel.viewModel = model;
  return couponModel;
}

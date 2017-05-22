/**
 * Created by hx on 2017/5/21.
 */

//  存
export function savaToLocal(id,key,value) {
  let seller = window.localStorage.__seller__;
  if(!seller){
    seller = {};
    seller[id] = {};
  }else {
    seller = JSON.parse(seller);
    if(!seller[id]){
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
}

// 取

export function loadFromlLocal(id,key,def) {
    let seller = window.localStorage.__seller__;
    if(!seller) {
      return def;
    }
    seller = JSON.parse(seller)[id];
    if(!seller){
      return def;
    }
    let ret = seller[key];
    return ret || def;
}
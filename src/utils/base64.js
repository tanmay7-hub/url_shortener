const chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYX";
function encode(num){
     let str="";
     while( num > 0){
          let rem= num%62;
          num=Math.floor(num/62);
          str = chars[rem]+str;
     } 
     return str;
}
export default encode;